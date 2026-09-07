import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import type { ViewStyle } from 'react-native'

/** A measured child's place in its parent's row. */
export type IndicatorRect = { x: number; width: number }

/**
 * How the indicator travels.
 *
 * A spring rather than a curve, and a soft one: the indicator is following a finger, so it
 * should arrive with a little weight rather than snapping. Lighter than the chevron's —
 * that one turns 180 degrees and must not overshoot, this one slides a few dozen points
 * and a touch of overshoot is what makes it feel attached to the press.
 */
export const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.6 } as const

/**
 * One node sliding between measured rectangles, on the UI thread — so it keeps travelling
 * while whatever the new choice shows is mounting.
 *
 * Shared by the `Tabs`'s pill and the `Segment`'s: both are a filled shape that follows the
 * chosen child along a row, and the two behaviours worth getting right are the same for
 * either. §2 bis — promotion at the second use.
 *
 * **Nothing is drawn until a rectangle exists.** On the first frame nothing has been laid
 * out, and an indicator at zero width would flash at the start of the row before jumping.
 *
 * **The first placement jumps and every one after it springs.** Animating the first would
 * slide the indicator in from the start of the row on mount, which reads as the control
 * arranging itself rather than as one at rest.
 */
export function useSlidingIndicator(rect: IndicatorRect | undefined): ViewStyle {
  const x = useSharedValue(rect?.x ?? 0)
  const width = useSharedValue(rect?.width ?? 0)
  // Not animated: it is what tells the first frame apart from every frame after it.
  const hasArrived = useSharedValue(rect !== undefined)

  useEffect(() => {
    if (rect === undefined) return

    if (hasArrived.get()) {
      x.set(withSpring(rect.x, INDICATOR_SPRING))
      width.set(withSpring(rect.width, INDICATOR_SPRING))
    } else {
      x.set(rect.x)
      width.set(rect.width)
      hasArrived.set(true)
    }
  }, [rect, hasArrived, width, x])

  return useAnimatedStyle(() => ({
    transform: [{ translateX: x.get() }],
    width: width.get(),
    opacity: hasArrived.get() ? 1 : 0,
  }))
}
