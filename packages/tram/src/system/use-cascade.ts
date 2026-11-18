import { useEffect } from 'react'
import {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated'
import { cascade, duration } from '../motion/motion-tokens'
import { useTramEase } from '../motion/use-tram-ease'
import { cascadeDelay } from './list-picker'

type Arrival = {
  isOpen: boolean
  /** The row's turn — `cascadeRank`. */
  rank: number
  /** The current choice: it is there before the others and stays after them. */
  isKept: boolean
  /** Milliseconds to wait for what opens the list. */
  after: number
  isStill: boolean
  /** Closing leaves the row as it is: it goes with what holds it — a banner's content. */
  isStaying?: boolean
}

/**
 * The content cascade, for one row: it slides up a few points as it fades in, a stagger
 * behind the row before it. Closing has no cascade — the rows not chosen fade together,
 * and the chosen one stays, since it is the value the field goes back to.
 *
 * With motion reduced, or under an ancestor's `disable-all`, a row is there at once: the
 * list it belongs to does the fading.
 *
 * The `Select`'s choices arrive this way, and the content of the `Dialog`'s banner.
 */
export function useCascade({
  isOpen,
  rank,
  isKept,
  after,
  isStill,
  isStaying = false,
}: Arrival) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isSet = isStill || isReduced
  const arrived = useSharedValue(isKept ? 1 : 0)

  useEffect(() => {
    if (isOpen) {
      arrived.value = isSet ? 1 : withDelay(cascadeDelay(rank, after), glide(1))
      return
    }

    // It stays as it is — a row still waiting for its turn no longer arrives.
    if (isStaying) {
      cancelAnimation(arrived)
      return
    }

    if (isKept) arrived.value = 1
    else arrived.value = isSet ? 0 : glide(0, 'exit', duration.fast)
  }, [isOpen, rank, isKept, after, isSet, isStaying, glide, arrived])

  return useAnimatedStyle(() => {
    'worklet'
    return {
      opacity: arrived.value,
      transform: [{ translateY: (1 - arrived.value) * cascade.rise }],
    }
  }, [arrived])
}
