import { useEffect, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { duration } from '../motion/motion-tokens'
import { useTramEase } from '../motion/use-tram-ease'
import { useTramMotion } from '../motion/use-tram-motion'
import { dockEdge } from './float-place'
import type { DockPlacement } from './float-place'

type TravelAsk<Placement extends DockPlacement> = {
  isVisible: boolean
  placement: Placement
  isStill: boolean
}

/**
 * The way in and the way out of a bar docked on an edge of the screen. It comes in from
 * that edge to its place on the `navigation` spring, fading in fast; it leaves by the same
 * way on the exit curve. Both are targets, so one interrupts the other from where the bar
 * is.
 *
 * A change of `placement` is not a slide from one place to the other: the bar leaves,
 * `shown` — the placement it is laid at — changes once it is gone, and it comes in there,
 * from the edge of its new place.
 *
 * With motion reduced it does not travel, it fades; under `disable-all` it is set down.
 *
 * In `system/` since its second use: the `Fab`'s bar, and the `AppBar`.
 */
export function useDockTravel<Placement extends DockPlacement>({
  isVisible,
  placement,
  isStill,
}: TravelAsk<Placement>) {
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isFixed = isStill || isReduced
  const [shown, setShown] = useState(placement)
  const isHere = isVisible && shown === placement
  const fade = useSharedValue(isStill && isHere ? 1 : 0)
  const drop = useSharedValue(isFixed ? 0 : 1)
  const height = useSharedValue(0)
  // Down past the bottom edge, or up past the top one.
  const away = dockEdge(shown) === 'top' ? -1 : 1

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
    // The bar sits on its edge: its own height takes it just past it.
    return {
      opacity: fade.value,
      transform: [{ translateY: drop.value * away * height.value }],
    }
  }, [fade, drop, height, away])

  const measure = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
  }

  return { shown, isHere, travel, measure }
}
