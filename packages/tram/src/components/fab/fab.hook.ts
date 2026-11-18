import { useEffect, useLayoutEffect, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import {
  Easing,
  ReduceMotion,
  cancelAnimation,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { ROTATION_DURATION } from '@xaui/native'
import { cascade, duration } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { floatTravel } from '../../system/float-place'
import type { FabPlacement } from './fab.type'

/**
 * Whether something that fades out is still to be drawn: while it is asked for, and after
 * that until `level` is back at 0. What leaves is unmounted at the end of its way out, not
 * at the start of it.
 */
function useLinger(isAsked: boolean, level: SharedValue<number>): boolean {
  const [isKept, setIsKept] = useState(isAsked)

  // Asked for again: kept from this very render, not from the next one.
  if (isAsked && !isKept) setIsKept(true)

  useAnimatedReaction(
    () => {
      'worklet'
      return level.value <= 0
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(setIsKept, false)
    },
    [level]
  )

  return isAsked || isKept
}

type TravelAsk = {
  isVisible: boolean
  placement: FabPlacement | undefined
  offset: number
  isStill: boolean
}

/**
 * The way in and the way out. The `Fab` comes up from the bottom edge to its place on the
 * `navigation` spring, fading in fast; it leaves by the same way on the exit curve. Both
 * are targets, so one interrupts the other from where the `Fab` is.
 *
 * A change of `placement` is not a slide from one corner to the other: the `Fab` leaves,
 * `shown` — the placement it is laid at — changes once it is gone, and it comes in there.
 *
 * With motion reduced it does not travel, it fades; under `disable-all` it is set down.
 */
export function useFabTravel({ isVisible, placement, offset, isStill }: TravelAsk) {
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isFixed = isStill || isReduced
  const [shown, setShown] = useState(placement)
  const isHere = isVisible && shown === placement
  const fade = useSharedValue(isStill && isHere ? 1 : 0)
  const drop = useSharedValue(isFixed ? 0 : 1)
  const height = useSharedValue(0)

  useEffect(() => {
    if (isStill) fade.value = isHere ? 1 : 0
    else fade.value = isHere ? glide(1, 'metro', duration.fast) : glide(0, 'exit')

    if (isFixed) drop.value = 0
    else drop.value = isHere ? animate(0, 'navigation') : glide(1, 'exit')
  }, [isHere, isStill, isFixed, animate, glide, fade, drop])

  // Gone: it may be laid where it was asked to be. Also what moves a hidden one.
  useAnimatedReaction(
    () => {
      'worklet'
      return fade.value <= 0
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && !wasGone) scheduleOnRN(setShown, placement)
    },
    [fade, placement]
  )

  const travel = useAnimatedStyle(() => {
    'worklet'
    const way = floatTravel(shown, offset, height.value)

    return { opacity: fade.value, transform: [{ translateY: drop.value * way }] }
  }, [fade, drop, height, shown, offset])

  const measure = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
  }

  return { shown, isHere, travel, measure }
}

/**
 * The label under the circle. Extended, the shelf opens to the label's height on the
 * `navigation` spring — which is what moves the circle up, the pair being pinned by its
 * bottom — while the label comes down a few points and fades in on the Metro curve.
 * Folded, the label leaves on the exit curve and the shelf closes on the same spring: a
 * fold that interrupts the way out sets off from the height the circle is at.
 *
 * With motion reduced the shelf is set at once and the label fades in place.
 */
export function useFabShelf(isExtended: boolean, isStill: boolean) {
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isFixed = isStill || isReduced
  const open = useSharedValue(isExtended ? 1 : 0)
  const arrival = useSharedValue(isExtended ? 1 : 0)
  const height = useSharedValue(0)
  const hasLabel = useLinger(isExtended, arrival)

  useEffect(() => {
    const to = isExtended ? 1 : 0

    open.value = isFixed ? to : animate(to, 'navigation')
    if (isStill) arrival.value = to
    else arrival.value = isExtended ? glide(1) : glide(0, 'exit')
  }, [isExtended, isStill, isFixed, animate, glide, open, arrival])

  const shelf = useAnimatedStyle(() => {
    'worklet'
    return { height: open.value * height.value }
  }, [open, height])

  const arriving = useAnimatedStyle(() => {
    'worklet'
    const above = isFixed ? 0 : (arrival.value - 1) * cascade.rise

    return { opacity: arrival.value, transform: [{ translateY: above }] }
  }, [arrival, isFixed])

  const measure = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
  }

  return { hasLabel, shelf, arriving, measure }
}

/**
 * A flat colour that fades to the next one on the Metro curve, from wherever it was: a
 * second change sets off from the colour on screen, not from the one it was heading to.
 */
export function useFillFade(fill: string, isStill: boolean) {
  const glide = useTramEase()
  const from = useSharedValue(fill)
  const to = useSharedValue(fill)
  const mix = useSharedValue(1)

  useEffect(() => {
    if (to.value === fill) return

    from.value = isStill
      ? fill
      : interpolateColor(mix.value, [0, 1], [from.value, to.value])
    to.value = fill
    if (isStill) {
      mix.value = 1
    } else {
      mix.value = 0
      mix.value = glide(1)
    }
  }, [fill, isStill, glide, from, to, mix])

  return useAnimatedStyle(() => {
    'worklet'
    return {
      backgroundColor: interpolateColor(mix.value, [0, 1], [from.value, to.value]),
    }
  }, [mix, from, to])
}

/** 0 or 1, reached on the Metro curve: the grey of a disabled label, a busy circle. */
export function useLevel(isOn: boolean, isStill: boolean, ms: number = duration.base) {
  const glide = useTramEase()
  const level = useSharedValue(isOn ? 1 : 0)

  useEffect(() => {
    const to = isOn ? 1 : 0

    level.value = isStill ? to : glide(to, 'metro', ms)
  }, [isOn, isStill, ms, glide, level])

  return level
}

/**
 * The busy state of the circle: the glyph fades out as the ring fades in, crossing on the
 * Metro curve, fast. The ring is kept until it has faded back out.
 */
export function useBusy(isLoading: boolean, isStill: boolean) {
  const busy = useLevel(isLoading, isStill, duration.fast)
  const hasSpinner = useLinger(isLoading, busy)

  const glyphStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: 1 - busy.value }
  }, [busy])

  const spinnerStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: busy.value }
  }, [busy])

  return { hasSpinner, glyphStyle, spinnerStyle }
}

/**
 * The ink of the glyph, fading to the next one. A glyph is a third party's component and
 * takes its colour as a prop, so it cannot be tweened: the glyph in the ink it had —
 * `leaving` — fades out over the same glyph in the new one, fading in.
 */
export function useInkSwap(ink: string, isStill: boolean) {
  const glide = useTramEase()
  const [inks, setInks] = useState<{ now: string; leaving: string | null }>({
    now: ink,
    leaving: null,
  })
  const swap = useSharedValue(1)

  if (inks.now !== ink) setInks({ now: ink, leaving: isStill ? null : inks.now })

  // Before the frame is drawn: the new ink must not show whole and then fade in.
  useLayoutEffect(() => {
    if (inks.leaving === null) return
    swap.value = 0
    swap.value = glide(1)
  }, [inks, glide, swap])

  const settle = () => setInks(held => ({ now: held.now, leaving: null }))

  useAnimatedReaction(
    () => {
      'worklet'
      return swap.value >= 1
    },
    (isDone, wasDone) => {
      'worklet'
      if (isDone && wasDone === false) scheduleOnRN(settle)
    },
    [swap]
  )

  const incoming = useAnimatedStyle(() => {
    'worklet'
    return { opacity: swap.value }
  }, [swap])

  const outgoing = useAnimatedStyle(() => {
    'worklet'
    return { opacity: 1 - swap.value }
  }, [swap])

  return { leaving: inks.leaving, incoming, outgoing }
}

/**
 * The turn of the busy ring — the `Button`'s, at Native's pace — which does not stop when
 * the system reduces motion: a ring that turns says the `Fab` is working, and that is a
 * state. Reanimated's own handling of the setting is opted out of, as in `useTramMotion`.
 */
export function useTurn() {
  const angle = useSharedValue(0)

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, {
        duration: ROTATION_DURATION,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never
    )
    // A repeat with no end runs until something stops it; unmounting is not that.
    return () => cancelAnimation(angle)
  }, [angle])

  return useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ rotate: `${angle.value}deg` }] }
  }, [angle])
}
