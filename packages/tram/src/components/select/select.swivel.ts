import { useEffect, useState } from 'react'
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { duration, swivel } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'

/** The page turns on its top edge. */
const PIVOT = { transformOrigin: 'top' } as const

/**
 * The swivel: a page turns in on its top edge, from edge-on to flat, on the Metro curve,
 * and out the same way on the exit curve. `isMounted` outlives `isOpen` by the way out,
 * so the page is still there to turn. With motion reduced it fades instead; under an
 * ancestor's `disable-all` it is there or it is not.
 *
 * Kept in this folder until a second component — the `MessageBox` — enters this way.
 */
export function useSwivel(isOpen: boolean, isStill: boolean) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const [isMounted, setMounted] = useState(isOpen)
  // 0 edge-on, 1 flat.
  const turn = useSharedValue(0)

  // Mounted in the render that opens it, so the way in starts on its first frame.
  if (isOpen && !isMounted) setMounted(true)

  useEffect(() => {
    if (isStill) {
      turn.value = isOpen ? 1 : 0
      if (!isOpen) setMounted(false)
      return
    }

    if (isOpen) {
      turn.value = glide(1, 'metro', duration.swivel)
      return
    }

    // Closed before the way in drew its first frame: the page is still edge-on, there is
    // no way out to play, and nothing below would ever see it reach the end of one.
    if (turn.value === 0) {
      setMounted(false)
      return
    }

    turn.value = glide(0, 'exit')
  }, [isOpen, isStill, glide, turn])

  // Gone once the way out has ended — not when it starts, and not before the way in.
  useAnimatedReaction(
    () => {
      'worklet'
      return turn.value === 0
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(setMounted, false)
    },
    [turn]
  )

  const turned = useAnimatedStyle(() => {
    'worklet'
    if (isReduced) return { opacity: turn.value }

    return {
      transform: [
        { perspective: swivel.perspective },
        { rotateX: `${(1 - turn.value) * swivel.degrees}deg` },
      ],
    }
  }, [isReduced, turn])

  return { isMounted, style: [PIVOT, turned] }
}
