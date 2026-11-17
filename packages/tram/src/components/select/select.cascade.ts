import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated'
import { cascade, duration } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { cascadeDelay } from '../../system/list-picker'

type Arrival = {
  isOpen: boolean
  /** The row's turn — `cascadeRank`. */
  rank: number
  /** The current choice: it is there before the others and stays after them. */
  isKept: boolean
  /** Milliseconds to wait for what opens the list. */
  after: number
  isStill: boolean
}

/**
 * The content cascade, for one row: it slides up a few points as it fades in, a stagger
 * behind the row before it. Closing has no cascade — the rows not chosen fade together,
 * and the chosen one stays, since it is the value the field goes back to.
 *
 * With motion reduced, or under an ancestor's `disable-all`, a row is there at once: the
 * list it belongs to does the fading.
 *
 * Kept in this folder until a second component lists its content this way.
 */
export function useCascade({ isOpen, rank, isKept, after, isStill }: Arrival) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isSet = isStill || isReduced
  const arrived = useSharedValue(isKept ? 1 : 0)

  useEffect(() => {
    if (isOpen) {
      arrived.value = isSet ? 1 : withDelay(cascadeDelay(rank, after), glide(1))
      return
    }

    if (isKept) arrived.value = 1
    else arrived.value = isSet ? 0 : glide(0, 'exit', duration.fast)
  }, [isOpen, rank, isKept, after, isSet, glide, arrived])

  return useAnimatedStyle(() => {
    'worklet'
    return {
      opacity: arrived.value,
      transform: [{ translateY: (1 - arrived.value) * cascade.rise }],
    }
  }, [arrived])
}
