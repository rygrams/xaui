import { useEffect, useState } from 'react'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated'
import { useAnimationDisabled } from '@xaui/native/system'
import { cascade } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { cascadeDelay } from '../../system/list-picker'
import { useList, useListItem } from './list.context'

/**
 * How one row arrives. The rows the list first shows rise into place one after the other
 * — `cascade.stagger` apart, and past `cascade.most` together, so nobody waits for the
 * bottom of the screen. With motion reduced they fade in together, briefly. A row drawn
 * later — scrolled to, or added — is simply there.
 */
export function useRowArrival() {
  const { hasEntrance, hasEntered } = useList()
  const { index } = useListItem()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()
  // Decided once, as the row first renders: a row's turn does not change under it.
  const [isArriving] = useState(() => hasEntrance && !isStill && !hasEntered())
  const arrived = useSharedValue(isArriving ? 0 : 1)
  const rise = isReduced ? 0 : cascade.rise

  useEffect(() => {
    if (!isArriving) return
    const turn = isReduced ? 0 : Math.min(index, cascade.most)
    // Run again — the row re-rendered as it arrives — it heads on to the same place.
    arrived.value = withDelay(cascadeDelay(turn), glide(1))
  }, [isArriving, isReduced, index, glide, arrived])

  return useAnimatedStyle(() => {
    'worklet'
    return {
      opacity: arrived.value,
      transform: [{ translateY: (1 - arrived.value) * rise }],
    }
  }, [arrived, rise])
}
