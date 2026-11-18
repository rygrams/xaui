import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated'
import { cascade, duration } from '../motion/motion-tokens'
import { useTramEase } from '../motion/use-tram-ease'
import { cascadeDelay } from './list-picker'

export type CascadeArrival = {
  isOpen: boolean
  /** The row's turn — `cascadeRank`, or its index in what arrives. */
  rank: number
  /** The current choice: it is there before the others and stays after them. */
  isKept?: boolean
  /** Milliseconds to wait for what opens the list. */
  after?: number
  isStill?: boolean
  /**
   * The side the rows come from, as a sign along the x axis: 1 from the right, -1 from
   * the left. Left out, or 0, they rise — the cascade of a list that opens.
   */
  side?: number
}

/**
 * The content cascade, for one row: it slides a few points as it fades in, a stagger
 * behind the row before it — up, for a list that opens; in from a side, for what follows
 * a change of tab. Closing has no cascade — the rows not chosen fade together, and the
 * chosen one stays, since it is the value the field goes back to.
 *
 * With motion reduced, or under an ancestor's `disable-all`, a row is there at once: the
 * list it belongs to does the fading.
 *
 * In `system/` since its second use: the `Select`'s choices, and the content of a tab.
 */
export function useCascade({
  isOpen,
  rank,
  isKept = false,
  after = 0,
  isStill = false,
  side = 0,
}: CascadeArrival) {
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
    const remaining = 1 - arrived.value

    return {
      opacity: arrived.value,
      transform:
        side === 0
          ? [{ translateY: remaining * cascade.rise }]
          : [{ translateX: remaining * side * cascade.slide }],
    }
  }, [arrived, side])
}
