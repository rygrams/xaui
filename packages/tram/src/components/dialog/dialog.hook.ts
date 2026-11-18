import { useEffect, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { useReducedMotion, useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { swipeDim, swipeLeaves, swipeTurn } from '../../system/swipe-away'
import { useSwivel } from '../../system/use-swivel'
import type { DialogMotion } from './dialog.type'

/**
 * The banner's shared values, and what moves them when the dialog opens and closes. The
 * banner swivels on its top edge; the ground behind dims on the Metro curve and lightens
 * on the exit one, setting off in the same effect as the banner — not after it. A close
 * that interrupts the way in sets off from where both are.
 *
 * With motion reduced both fade; under an ancestor's `disable-all` both are set at once.
 */
export function useBanner(isOpen: boolean, isStill: boolean): DialogMotion {
  const glide = useTramEase()
  const { isMounted, turn, style: turned } = useSwivel(isOpen, isStill)
  const shade = useSharedValue(0)

  useEffect(() => {
    if (isStill) shade.value = isOpen ? 1 : 0
    else shade.value = isOpen ? glide(1) : glide(0, 'exit')
  }, [isOpen, isStill, glide, shade])

  return useMemo(
    () => ({ isMounted, turn, shade, turned }),
    [isMounted, turn, shade, turned]
  )
}

/** A drag has to be this much more vertical than not before it is the banner's. */
const SLOP = 8

type SwipeAway = {
  motion: DialogMotion
  isDismissable: boolean
  isStill: boolean
  close: () => void
}

/**
 * The swipe that sends the banner back up. It follows the finger upward, its angle in
 * proportion to the way travelled and the ground lightening at the same pace; downward
 * it does not move. Released past the threshold it closes, and the way out sets off from
 * the angle it was left at; short of it, it comes back flat on the `navigation` spring.
 *
 * A banner that may not be dismissed follows over a few degrees and comes back on the
 * `press` spring. With motion reduced, or under `disable-all`, the swipe still closes
 * and nothing follows the finger.
 *
 * `measure` is the banner's `onLayout` height: what the finger's way is counted against.
 */
export function useSwipeAway({ motion, isDismissable, isStill, close }: SwipeAway) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const isSet = isStill || isReduced
  const height = useSharedValue(0)
  const { turn, shade } = motion

  const gesture = useMemo(() => {
    const settle = () => {
      'worklet'
      if (isSet) return
      const kind = isDismissable ? 'navigation' : 'press'
      turn.value = animate(1, kind)
      shade.value = animate(1, kind)
    }

    return Gesture.Pan()
      .activeOffsetY([-SLOP, SLOP])
      .failOffsetX([-SLOP * 2, SLOP * 2])
      .onUpdate(event => {
        'worklet'
        if (isSet) return
        const next = swipeTurn(event.translationY, height.value, !isDismissable)
        turn.value = next
        shade.value = swipeDim(next)
      })
      .onEnd(event => {
        'worklet'
        const reached = swipeTurn(event.translationY, height.value)
        // Closing is asked of React, which glides out from this angle a frame later. The
        // banner sets off back meanwhile, so that a controlled dialog whose owner keeps
        // it open is not left leaning.
        if (isDismissable && swipeLeaves(reached, event.velocityY)) {
          scheduleOnRN(close)
        }
        settle()
      })
      .onFinalize((_event, didEnd) => {
        'worklet'
        if (!didEnd) settle()
      })
  }, [animate, isSet, isDismissable, close, turn, shade, height])

  const measure = (measured: number) => {
    height.value = measured
  }

  return { gesture, measure }
}
