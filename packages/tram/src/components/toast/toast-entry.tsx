import { useCallback, useEffect, useMemo, useRef } from 'react'
import { I18nManager, StyleSheet, useWindowDimensions } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
// An **optional** peer of this package, reached only through `@xaui/tram/toast`.
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { toastSwipe } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { shouldDismiss, swipeAxis, swipeTravel } from '../../system/swipe'
import type { SwipeAxis } from '../../system/swipe'
import type { StackPlace } from '../../system/toast-stack'
import { ToastEntryContext } from './toast.context'
import type { ToastPlacement, ToastRecord } from './toast.type'

/** What the host decided once for the whole pile. */
export type ToastPile = {
  placement: ToastPlacement
  /** From the screen's edge to the first toast: the caller's offset. */
  edge: number
  isSwipeable: boolean
  /** `true` under an ancestor's `disable-all`: everything is set, nothing animates. */
  isStill: boolean
  dismissLabel: string
}

/** What an entry tells the host, each by the toast's id. */
export type ToastEntryEvents = {
  /** A finger is on it: its countdown stops. */
  onHold: (id: string) => void
  /** Let go and staying: its countdown picks up. */
  onRelease: (id: string) => void
  /** Sent away, by a swipe or a `Close`: the pile closes up behind it. */
  onDismiss: (id: string) => void
  /** Its way out has ended: it can be dropped. */
  onGone: (id: string) => void
  onHeight: (id: string, height: number) => void
}

type ToastEntryProps = {
  record: ToastRecord & { isLeaving: boolean }
  place: StackPlace
  /** Past `maxVisible`: still in the pile, not seen. */
  isHidden: boolean
  /** Already shown once: it is being moved between the host and an outlet, not sent. */
  isSettled: boolean
  pile: ToastPile
  events: ToastEntryEvents
}

/**
 * One toast in the pile: where it sits, how it came, how it follows a finger and how it
 * goes. A component rather than a branch in the host's map, because all of that is hooks.
 *
 * **Every movement is a value of its own, and the transform is their sum** — the rank the
 * pile gave it, what is left of its way in, where the finger has it, and its way out. That
 * is what makes each of them interruptible: a toast touched on its way in stops there and
 * follows, and one sent away sets off from wherever it is.
 *
 * | Movement  | On                                                       |
 * | --------- | -------------------------------------------------------- |
 * | Way in    | the `press` spring, from past the edge                    |
 * | Rank      | the `navigation` spring                                   |
 * | Hidden    | `ease.exit` out, `ease.metro` back                        |
 * | Way out   | `ease.exit`, past the edge or along the swipe, fading     |
 * | Let go    | the `press` spring, back to its place                     |
 *
 * With motion reduced nothing slides, bounces or follows: it fades in and out, and the
 * ranks are set. A swipe still closes. Under an ancestor's `disable-all` everything is set.
 */
export function ToastEntry({
  record,
  place,
  isHidden,
  isSettled,
  pile,
  events,
}: ToastEntryProps) {
  const { id, isLeaving } = record
  const { placement, edge, isSwipeable, isStill, dismissLabel } = pile
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const screen = useWindowDimensions()

  // Away from the edge the pile sits against: a top toast leaves upward.
  const away = placement === 'top' ? -1 : 1
  // A transform does not mirror under RTL, and neither does a drag.
  const towardEnd = I18nManager.isRTL ? -1 : 1
  /** No slide, no bounce, no following. */
  const isFlat = isReduced || isStill
  // The pile grows away from its edge, so a rank is the other way from `away`.
  const rest = place.offset * -away
  /** How far past the edge the toast has to go to be out of the screen. */
  const reach = edge + place.offset

  const rankY = useSharedValue(rest)
  const enterY = useSharedValue(0)
  const dragX = useSharedValue(0)
  const dragY = useSharedValue(0)
  // The way out, 0 to 1, over `exitX` and `exitY` — set when it starts, so it sets off
  // from wherever the finger left the toast.
  const leave = useSharedValue(0)
  const exitX = useSharedValue(0)
  const exitY = useSharedValue(0)
  // 0 until it is measured: its way in cannot start from a height nobody knows.
  const appear = useSharedValue(isSettled ? 1 : 0)
  const shown = useSharedValue(isHidden ? 0 : 1)
  const tall = useSharedValue(0)
  const axis = useSharedValue<SwipeAxis | null>(null)
  const pickedUpX = useSharedValue(0)
  const pickedUpY = useSharedValue(0)

  const hasArrived = useRef(isSettled)
  // As it was when this entry mounted: measured later, it is still the same arrival.
  const isMoved = useRef(isSettled).current
  const isGoing = useRef(false)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    tall.value = height
    events.onHeight(id, height)

    if (hasArrived.current) return
    hasArrived.current = true

    if (isFlat) {
      appear.value = isStill ? 1 : glide(1)
      return
    }

    // From past the edge to its place: one firm bounce, then at rest.
    enterY.value = away * (reach + height)
    appear.value = 1
    enterY.value = animate(0, 'press')
  }

  useEffect(() => {
    rankY.value = isFlat ? rest : animate(rest, 'navigation')
  }, [rest, isFlat, animate, rankY])

  useEffect(() => {
    const to = isHidden ? 0 : 1
    shown.value = isStill ? to : glide(to, isHidden ? 'exit' : 'metro')
  }, [isHidden, isStill, glide, shown])

  // Sent away by something other than a swipe — its time, a `Close`, the queue.
  useEffect(() => {
    if (!isLeaving || isGoing.current) return
    isGoing.current = true

    if (isStill) {
      events.onGone(id)
      return
    }

    if (!isReduced) exitY.value = away * (reach + tall.value)
    leave.value = glide(1, 'exit')
  }, [
    isLeaving,
    isStill,
    isReduced,
    away,
    reach,
    id,
    events,
    glide,
    exitY,
    leave,
    tall,
  ])

  // Declared before the gesture: a worklet captures what it names when it is built.
  const hold = useCallback(() => events.onHold(id), [events, id])
  const release = useCallback(() => events.onRelease(id), [events, id])
  const gone = useCallback(() => events.onGone(id), [events, id])
  const dismiss = useCallback(() => events.onDismiss(id), [events, id])
  // The swipe has already started the way out; the host only has to close up behind it.
  const sendAway = useCallback(() => {
    isGoing.current = true
    events.onDismiss(id)
  }, [events, id])

  useAnimatedReaction(
    () => {
      'worklet'
      return leave.value >= 1
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && !wasGone) scheduleOnRN(gone)
    },
    [leave]
  )

  const pan = Gesture.Pan()
    .enabled(isSwipeable && !isLeaving && !isHidden)
    .minDistance(toastSwipe.slop)
    .onBegin(() => {
      'worklet'
      // Touched on its way in, or on its way back: it stops where it is.
      cancelAnimation(enterY)
      cancelAnimation(dragX)
      cancelAnimation(dragY)
      pickedUpX.value = dragX.value
      pickedUpY.value = dragY.value
      axis.value = null
      scheduleOnRN(hold)
    })
    .onUpdate(event => {
      'worklet'
      if (axis.value === null) {
        axis.value = swipeAxis(
          { x: event.translationX, y: event.translationY },
          toastSwipe.slop
        )
      }
      if (isFlat) return

      // One axis, the one the gesture took, and one way along it: toward the end, or
      // away from the pile's edge. The other way it does not move.
      if (axis.value === 'x') {
        const travel = swipeTravel(event.translationX * towardEnd)
        dragX.value = pickedUpX.value + travel * towardEnd
      } else if (axis.value === 'y') {
        const travel = swipeTravel(event.translationY * away)
        dragY.value = pickedUpY.value + travel * away
      }
    })
    .onFinalize((event, didSucceed) => {
      'worklet'
      const taken = axis.value
      const isAcross = taken === 'x'
      const sign = isAcross ? towardEnd : away
      const distance = (isAcross ? event.translationX : event.translationY) * sign
      const velocity = (isAcross ? event.velocityX : event.velocityY) * sign

      if (
        didSucceed &&
        taken !== null &&
        shouldDismiss({ distance, velocity }, toastSwipe)
      ) {
        // It finishes the way it was going, from where it is.
        if (!isFlat && isAcross) exitX.value = towardEnd * screen.width
        if (!isFlat && !isAcross) exitY.value = away * (reach + tall.value)
        leave.value = isStill ? 1 : glide(1, 'exit')
        scheduleOnRN(sendAway)
        return
      }

      // Let go before the threshold: back to its place, and its countdown picks up.
      dragX.value = isStill ? 0 : animate(0)
      dragY.value = isStill ? 0 : animate(0)
      enterY.value = isStill ? 0 : animate(0)
      scheduleOnRN(release)
    })

  const placed = useAnimatedStyle(() => {
    'worklet'
    const out = Math.min(Math.max(leave.value, 0), 1)

    return {
      opacity: appear.value * shown.value * (1 - out),
      transform: [
        { translateX: dragX.value + exitX.value * out },
        {
          translateY: rankY.value + enterY.value + dragY.value + exitY.value * out,
        },
      ],
    }
  }, [appear, shown, leave, dragX, dragY, exitX, exitY, rankY, enterY])

  // The newest takes the band between the pile and the screen's edge in its colour.
  const bleed = place.rank === 0 ? edge : 0

  const context = useMemo(
    () => ({ dismiss, dismissLabel, isStill, isMoved, bleed, bleedSide: placement }),
    [dismiss, dismissLabel, isStill, isMoved, bleed, placement]
  )

  const isOut = isHidden || isLeaving

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        // A toast nobody can see is still a target: it takes no touch, and a screen
        // reader is not led to it.
        accessibilityElementsHidden={isOut}
        importantForAccessibility={isOut ? 'no-hide-descendants' : 'auto'}
        onLayout={handleLayout}
        style={[
          sheet.entry,
          isOut ? sheet.out : undefined,
          FULL_WIDTH,
          placement === 'top' ? { top: edge } : { bottom: edge },
          placed,
        ]}
      >
        <ToastEntryContext.Provider value={context}>
          {record.render({ dismiss })}
        </ToastEntryContext.Provider>
      </Animated.View>
    </GestureDetector>
  )
}

/** Edge to edge: a toast is a band across the screen. */
const FULL_WIDTH = { start: 0, end: 0 } as const

const sheet = StyleSheet.create({
  entry: { position: 'absolute' },
  out: { pointerEvents: 'none' },
})

ToastEntry.displayName = 'XAUI.Tram.Toast.Entry'
