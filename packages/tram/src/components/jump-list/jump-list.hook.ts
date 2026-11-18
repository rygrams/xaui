import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { I18nManager } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { cascade, duration, turnstile } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { cascadeDelay } from '../../system/list-picker'
import { hingeAt, hingeFor, turnstileAngle } from '../../system/turnstile'
import { arrivalRank, leavingRank, leavingTime } from './jump-list.sections'
import type { Leaving } from './jump-list.sections'
import type { JumpListLanding, JumpListPhase } from './jump-list.type'

type JumpGrid = {
  isOpen: boolean
  isStill: boolean
  leaving: Leaving
  /** Run once the grid has gone, and only then: the list lands after it. */
  onGone: () => void
}

/**
 * The grid's ground and its life: mounted in the render that opens it, it comes up on
 * the Metro curve while its keys arrive; asked to close, it waits for the last key to
 * turn away, then goes on the exit curve and unmounts — and `onGone` runs.
 *
 * With motion reduced the keys stay where they are and the ground fades at once; under
 * an ancestor's `disable-all` it is there or it is not.
 */
export function useJumpGrid({ isOpen, isStill, leaving, onGone }: JumpGrid) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const [isMounted, setMounted] = useState(isOpen)
  // How many ways out have ended: `onGone` runs in the effect that follows each one.
  const [ended, setEnded] = useState(0)
  const veil = useSharedValue(0)
  const wantsOpen = useRef(isOpen)
  wantsOpen.current = isOpen
  const wasOpen = useRef(isOpen)
  const isLeaving = useRef(false)
  const whenGone = useRef(onGone)
  whenGone.current = onGone

  // Once per way out: set off by the effect when nothing is left to play, or by the
  // ground reaching 0 — whichever comes first, and never both.
  const gone = useCallback(() => {
    if (wantsOpen.current || !isLeaving.current) return

    isLeaving.current = false
    setMounted(false)
    setEnded(count => count + 1)
  }, [])

  // After the commit that took the grid away, not in it: on the web the `Modal` hands
  // the focus back to the header that opened it as it unmounts, and the browser scrolls
  // to that header. What lands after it is not undone by it.
  useEffect(() => {
    if (ended > 0) whenGone.current()
  }, [ended])

  if (isOpen && !isMounted) setMounted(true)

  const { columns, count, picked } = leaving

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true
      isLeaving.current = false
      veil.value = isStill ? 1 : glide(1, 'metro', duration.base)
      return
    }

    // Never opened, or already on its way out: the effect ran again for another reason.
    if (!wasOpen.current) return

    wasOpen.current = false
    isLeaving.current = true

    // Under `disable-all`, or closed before the way in drew a frame: nothing to play.
    if (isStill || veil.value === 0) {
      cancelAnimation(veil)
      veil.value = 0
      gone()
      return
    }

    const wait = isReduced
      ? 0
      : leavingTime({ columns, count, picked }) - duration.fast
    veil.value = withDelay(wait, glide(0, 'exit', duration.fast))
  }, [isOpen, isStill, isReduced, columns, count, picked, glide, veil, gone])

  useAnimatedReaction(
    () => {
      'worklet'
      return veil.value === 0
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(gone)
    },
    [veil, gone]
  )

  return { isMounted, veil }
}

type KeyMotion = {
  index: number
  phase: JumpListPhase
  leaving: Leaving
  /** The grid's padding and the space between two keys. */
  inset: number
  gap: number
  isStill: boolean
}

/**
 * One key's way in and out. In, it rises a few points as it fades, a row at a time — the
 * content cascade. Out, it turns away on the screen's start edge — the turnstile, every
 * key around the same line — row after row, the key pressed last.
 *
 * With motion reduced, or under `disable-all`, a key does not move: the ground fades it.
 */
export function useKeyMotion({
  index,
  phase,
  leaving,
  inset,
  gap,
  isStill,
}: KeyMotion) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isSet = isStill || isReduced
  const isRtl = I18nManager.isRTL
  const arrived = useSharedValue(isSet ? 1 : 0)
  const away = useSharedValue(0)
  const [width, setWidth] = useState(0)

  const { columns, count, picked } = leaving

  useEffect(() => {
    if (phase === 'arriving') {
      cancelAnimation(away)
      away.value = 0
      const rank = arrivalRank(index, columns)
      arrived.value = isSet
        ? 1
        : withDelay(cascadeDelay(rank), glide(1, 'metro', duration.slow))
      return
    }

    if (phase !== 'leaving' || isSet) return

    const rank = leavingRank(index, { columns, count, picked })
    away.value = withDelay(cascadeDelay(rank), glide(1, 'exit', duration.turnstile))
  }, [phase, index, columns, count, picked, isSet, glide, arrived, away])

  // How far the key's start edge is from the screen's: the grid's padding, and the
  // columns before it.
  const column = index % Math.max(1, columns)
  const hinge = hingeAt(inset + column * (width + gap), width, isRtl)

  const moving = useAnimatedStyle(() => {
    'worklet'
    if (isSet) return { opacity: 1, transform: [] }

    return {
      opacity: arrived.value * (1 - away.value),
      // The perspective first: a rotation applied before it is a flat squash.
      transform: [
        { perspective: turnstile.perspective },
        { translateY: (1 - arrived.value) * cascade.rise },
        { rotateY: `${turnstileAngle(away.value, isRtl)}deg` },
      ],
    }
  }, [isSet, isRtl, arrived, away])

  const measure = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  return { style: [{ transformOrigin: hinge }, moving], measure }
}

/** A landing older than this is not played: a header scrolled back into view stays still. */
const FRESH = duration.slow

/**
 * Whether a landing is the one just made. The list keeps the last one, and a header the
 * list unmounted and mounts again — scrolled back into view — must not play it again.
 */
export function isFreshLanding(landing: JumpListLanding | null): boolean {
  return landing !== null && Date.now() - landing.at <= FRESH
}

/**
 * The header the list lands on, coming in: it turns in on its start edge from where a
 * page arrives, on the Metro curve — the turnstile played the other way, as the grid's
 * keys left by it. `landing` is the root's, and plays for the header of its key only
 * while it is fresh (`isFreshLanding`).
 *
 * With motion reduced it fades in; under `disable-all` it is there.
 */
export function useLanding(
  landing: JumpListLanding | null,
  key: string,
  isStill: boolean
) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isRtl = I18nManager.isRTL
  const turn = useSharedValue(0)

  const count = landing?.key === key ? landing.count : 0
  const isFresh = isFreshLanding(landing)

  // Before the first frame, so the header is never seen in place, then turned away.
  useLayoutEffect(() => {
    if (count === 0 || isStill || !isFresh) return

    turn.value = withSequence(
      withTiming(-1, { duration: 0 }),
      glide(0, 'metro', duration.slow)
    )
  }, [count, isFresh, isStill, glide, turn])

  const turned = useAnimatedStyle(() => {
    'worklet'
    const opacity = 1 - Math.min(1, Math.abs(turn.value))
    if (isReduced) return { opacity }

    return {
      opacity,
      transform: [
        { perspective: turnstile.perspective },
        { rotateY: `${turnstileAngle(turn.value, isRtl)}deg` },
      ],
    }
  }, [isReduced, isRtl, turn])

  return [{ transformOrigin: hingeFor(isRtl) }, turned]
}
