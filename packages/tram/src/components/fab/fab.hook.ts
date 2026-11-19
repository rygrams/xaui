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

/** The two colours of the circle: its fill and its line. */
type Paint = { fill: string; line: string }

/**
 * The fill and the line, fading to the next ones together on the Metro curve, from
 * wherever they were: a second change sets off from the colours on screen, not from the
 * ones they were heading to. From `contained` to `outline` the fill fades to transparent
 * as the line takes the ink.
 */
export function usePaintFade({ fill, line }: Paint, isStill: boolean) {
  const glide = useTramEase()
  const from = useSharedValue<Paint>({ fill, line })
  const to = useSharedValue<Paint>({ fill, line })
  const mix = useSharedValue(1)

  useEffect(() => {
    if (to.value.fill === fill && to.value.line === line) return

    const at = mix.value
    const was = from.value
    const next = to.value

    from.value = isStill
      ? { fill, line }
      : {
          fill: interpolateColor(at, [0, 1], [was.fill, next.fill]),
          line: interpolateColor(at, [0, 1], [was.line, next.line]),
        }
    to.value = { fill, line }
    if (isStill) {
      mix.value = 1
    } else {
      mix.value = 0
      mix.value = glide(1)
    }
  }, [fill, line, isStill, glide, from, to, mix])

  return useAnimatedStyle(() => {
    'worklet'
    return {
      backgroundColor: interpolateColor(
        mix.value,
        [0, 1],
        [from.value.fill, to.value.fill]
      ),
      borderColor: interpolateColor(
        mix.value,
        [0, 1],
        [from.value.line, to.value.line]
      ),
    }
  }, [mix, from, to])
}

/** 0 or 1, reached on the Metro curve: the grey of a disabled label, a busy circle. */
export function useLevel(
  isOn: boolean,
  isStill: boolean,
  ms: number = duration.base
) {
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
