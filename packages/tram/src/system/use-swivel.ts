import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { duration, swivel } from '../motion/motion-tokens'
import { useTramEase } from '../motion/use-tram-ease'

/** The edge a page turns on: the one it is laid against. */
export type SwivelEdge = 'top' | 'bottom'

const PIVOT = {
  top: { transformOrigin: 'top' },
  bottom: { transformOrigin: 'bottom' },
} as const

/** Seen from the other edge the same turn is the other way round. */
const WAY = { top: 1, bottom: -1 } as const

/**
 * The swivel: a page turns in on its `edge` — the top one unless told otherwise — from
 * edge-on to flat, on the Metro curve,
 * and out the same way on the exit curve. `isMounted` outlives `isOpen` by the way out,
 * so the page is still there to turn. With motion reduced it fades instead; under an
 * ancestor's `disable-all` it is there or it is not.
 *
 * `turn` is handed back for what turns the page by hand — a banner following a finger.
 * Turned edge-on that way the page stays mounted: only closing takes it away.
 *
 * The `Select`'s page enters this way, and the `Dialog`'s banner.
 */
export function useSwivel(
  isOpen: boolean,
  isStill: boolean,
  edge: SwivelEdge = 'top'
) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const [isMounted, setMounted] = useState(isOpen)
  // 0 edge-on, 1 flat.
  const turn = useSharedValue(0)
  const wantsOpen = useRef(isOpen)
  wantsOpen.current = isOpen

  // Edge-on is only the end of the way out once the page was asked to close.
  const leave = useCallback(() => {
    if (!wantsOpen.current) setMounted(false)
  }, [])

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
      if (isGone && wasGone === false) scheduleOnRN(leave)
    },
    [turn, leave]
  )

  const way = WAY[edge]

  const turned = useAnimatedStyle(() => {
    'worklet'
    if (isReduced) return { opacity: turn.value }

    return {
      transform: [
        { perspective: swivel.perspective },
        { rotateX: `${(1 - turn.value) * swivel.degrees * way}deg` },
      ],
    }
  }, [isReduced, turn, way])

  const style = useMemo(() => [PIVOT[edge], turned], [edge, turned])

  return { isMounted, turn, style }
}
