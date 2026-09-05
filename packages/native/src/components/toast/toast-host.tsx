import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
// An **optional** peer of this package, reached only through `@xaui/native/toast`, so a
// project that never imports the toast never loads it — the same arrangement the
// `BottomSheet` has with its drag.
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import { Portal } from '../../system/portal'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  DRAG_RUBBER,
  PRESS_SCALE,
  STACK_TIMING,
  SWIPE_DECAY,
  SWIPE_DISTANCE,
  SWIPE_HIDE_MS,
  SWIPE_VELOCITY,
  toastEntering,
  toastExiting,
} from './toast.animation'
import { ToastDismissContext, ToastQueueContext } from './toast.context'
import type { ToastOptions, ToastPlacement, ToastRecord } from './toast.type'
import { toastStackStyle } from './toast.utils'

export type ToastHostProps = {
  children?: ReactNode
  /** Which edge the stack sits against. */
  placement?: ToastPlacement
  /**
   * How long a toast stays before it leaves, in milliseconds. `0` keeps it until it is
   * dismissed; one entry can override it.
   *
   * @default 4000
   */
  duration?: number
  /**
   * How many cards are visible at once. Past it a card is transparent rather than gone —
   * it is still queued, and dismissing the front one promotes it into view.
   *
   * @default 3
   */
  maxVisible?: number
  /**
   * Whether the front card can be thrown away with a swipe — up for a top stack, down for
   * a bottom one. The pile empties one card at a time, each swipe promoting the next.
   *
   * @default true
   */
  isSwipeable?: boolean
}

/**
 * Where toasts live. Mounted once, near the root of the app.
 *
 * It owns the three things one `Toast` deliberately does not know: the queue, the timers,
 * and what is stacked under it. That split is what lets a caller replace the card entirely
 * — `render` returns whatever they like — without the queue caring what it looks like.
 *
 * It renders into the nearest `PortalHost`, so the stack sits over navigation rather than
 * inside whatever screen happened to ask for it.
 */
export function ToastHost({
  children,
  placement = 'bottom',
  duration = 4000,
  maxVisible = 3,
  isSwipeable = true,
}: ToastHostProps) {
  const theme = useXAUITheme()
  const [records, setRecords] = useState<readonly ToastRecord[]>([])
  const seed = useId()
  const count = useRef(0)

  // Kept in a ref rather than in state: a timer is not something the stack renders, and
  // clearing one must not schedule another render on the way out.
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setRecords(current => current.filter(record => record.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    for (const timer of timers.current.values()) clearTimeout(timer)
    timers.current.clear()
    setRecords([])
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      count.current += 1
      const id = `${seed}-${count.current}`
      const life = options.duration ?? duration

      // Nothing is dropped. A card past `maxVisible` is transparent, not discarded, so a
      // burst of six shows all six as the ones in front expire — and every one of them
      // keeps the timer it was given rather than dying with the record.
      setRecords(current => [...current, { ...options, id }])

      if (life > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), life)
        )
      }

      return id
    },
    [dismiss, duration, seed]
  )

  const queue = useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  )

  // Every card is anchored to the same edge and pushed back by its transform alone — the
  // pile costs the height of one card however many are in it, which is the whole point of
  // stacking rather than listing. The strip fills the portal so the cards have something
  // to be absolute inside.
  const inset = theme.spacing(4)
  const entry = {
    ...sheet.entry,
    start: inset,
    end: inset,
    ...(placement === 'top' ? { top: inset } : { bottom: inset }),
  }

  return (
    <ToastQueueContext.Provider value={queue}>
      {children}
      {records.length > 0 ? (
        <Portal>
          {/* `box-none` so the strip over the screen's edge does not swallow presses meant
              for whatever is under it — only the cards themselves take touches. */}
          <View pointerEvents="box-none" style={sheet.stack}>
            {/* Oldest first, so the newest is painted last and lands on top without a
                zIndex — the one thing the reader is looking for is the one in front. */}
            {records.map((record, index) => (
              <ToastStackEntry
                key={record.id}
                depth={records.length - 1 - index}
                placement={placement}
                maxVisible={maxVisible}
                isSwipeable={isSwipeable}
                onSwipe={() => dismiss(record.id)}
                style={entry}
              >
                <ToastDismissContext.Provider value={() => dismiss(record.id)}>
                  {record.render({ dismiss: () => dismiss(record.id) })}
                </ToastDismissContext.Provider>
              </ToastStackEntry>
            ))}
          </View>
        </Portal>
      ) : null}
    </ToastQueueContext.Provider>
  )
}

/**
 * One card in the pile, at the depth the stack put it, and draggable if it is in front.
 *
 * A component rather than a branch in the map, because the animated style is a hook and a
 * hook cannot be called per iteration.
 *
 * **The stack and the drag are separate values that compose.** The stack's three numbers
 * are animated through `useDerivedValue`, not written straight into the style, because
 * `withTiming` produces a value a style may hold and not one arithmetic may touch — and
 * the transform is the sum of where the pile put the card and where the finger has it.
 */
function ToastStackEntry({
  children,
  depth,
  placement,
  maxVisible,
  isSwipeable,
  onSwipe,
  style,
}: {
  children: ReactNode
  depth: number
  placement: ToastPlacement
  maxVisible: number
  isSwipeable: boolean
  onSwipe: () => void
  style: StyleProp<ViewStyle>
}) {
  const { translateY, scale, opacity } = toastStackStyle(
    depth,
    placement,
    maxVisible
  )

  const stackY = useDerivedValue(
    () => withTiming(translateY, STACK_TIMING),
    [translateY]
  )
  const stackScale = useDerivedValue(() => withTiming(scale, STACK_TIMING), [scale])
  const fade = useDerivedValue(() => withTiming(opacity, STACK_TIMING), [opacity])

  const drag = useSharedValue(0)
  const press = useSharedValue(1)

  // Read here, not in the gesture: `Dimensions` is a JS module, and the callbacks below run
  // on the UI thread where it does not exist.
  const screenHeight = Dimensions.get('window').height

  // Away from the edge the stack sits against: a top card leaves upward, a bottom one down.
  const away = placement === 'top' ? -1 : 1

  const pan = Gesture.Pan()
    // Only the card in front. The ones behind show a seven-point shoulder — a target under
    // any reasonable minimum, and dragging the second card out from under the first reads
    // as a glitch rather than as a dismissal.
    .enabled(isSwipeable && depth === 0)
    .onBegin(() => {
      press.set(PRESS_SCALE)
    })
    .onChange(event => {
      const towardExit = event.translationY * away

      if (towardExit > 0) {
        drag.set(event.translationY)
        return
      }

      // The wrong way is not refused, it is resisted: the whole screen's travel maps onto
      // forty points, so the card answers the finger without pretending it can go there.
      const give = interpolate(
        Math.abs(event.translationY),
        [0, screenHeight],
        [0, DRAG_RUBBER],
        Extrapolation.CLAMP
      )
      drag.set(-give * away)
    })
    .onFinalize(event => {
      press.set(1)

      const towardExit = event.translationY * away > 0
      const farEnough = Math.abs(event.translationY) > SWIPE_DISTANCE
      const fastEnough = Math.abs(event.velocityY) > SWIPE_VELOCITY

      if (!towardExit || !(farEnough || fastEnough)) {
        drag.set(withSpring(0))
        return
      }

      // The throw carries on at the speed the finger left it, clamped so a decay cannot
      // curve the card back across the screen it was thrown off.
      drag.set(
        withDecay({
          velocity: event.velocityY * SWIPE_DECAY,
          clamp:
            away === 1
              ? [0, Number.POSITIVE_INFINITY]
              : [Number.NEGATIVE_INFINITY, 0],
        })
      )
      // After the decay has read as motion, not before: removing the record now would cut
      // the throw off at the frame the finger lifted.
      runOnJS(hideAfterThrow)(event.velocityY)
    })

  // A hard flick is gone sooner than a soft one, and neither before the throw has shown.
  const hideAfterThrow = useCallback(
    (velocity: number) => {
      setTimeout(onSwipe, Math.min(SWIPE_HIDE_MS, Math.abs(velocity)))
    },
    [onSwipe]
  )

  const stacking = useAnimatedStyle(() => ({
    opacity: fade.get(),
    transform: [
      { translateY: stackY.get() + drag.get() },
      { scale: stackScale.get() * press.get() },
    ],
  }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        // The wrapper is the card's own box, so `auto` swallows nothing the card would not
        // have swallowed — and a `GestureDetector` needs a child that takes touches at all,
        // which `box-none` is not. `none` past the last visible card: a transparent card is
        // still a target, and a press meant for the front one must not land on something
        // nobody can see.
        pointerEvents={opacity === 0 ? 'none' : 'auto'}
        entering={toastEntering(placement)}
        exiting={toastExiting(placement)}
        style={[style, stacking]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

const sheet = StyleSheet.create({
  stack: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
  entry: { position: 'absolute' },
})

ToastHost.displayName = 'XAUI.ToastHost'
