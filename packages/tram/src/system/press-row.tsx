import { forwardRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import type { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { PressableFeedback } from '@xaui/native/system'
import type { PressableFeedbackProps } from '@xaui/native/system'
import { scale } from '../motion/motion-tokens'
import { useTramMotion } from '../motion/use-tram-motion'

const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

/**
 * The press of a row: the mark's frame and its label shrink together, a little, and
 * spring back. No tilt — that is a box leaning under the finger, and a row has no box.
 * With motion reduced it stays as it is.
 *
 * It is Native's `PressableFeedback` with its own animations off; only the movement is
 * Tram's. The checkbox and the radio press this way.
 */
export const PressRow = forwardRef<View, PressableFeedbackProps>(function PressRow(
  { isPressed = false, style, ...props },
  ref
) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const size = useSharedValue(1)

  // It follows the state, so a press that ends without a lift still comes back.
  useEffect(() => {
    size.value = animate(isPressed && !isReduced ? scale.row : 1)
  }, [isPressed, isReduced, animate, size])

  // Appended to the caller's own transform rather than replacing it: `style` is the
  // last word, and a row moved with `translateY` must stay where it was put.
  const placed = StyleSheet.flatten(style)?.transform
  const own = Array.isArray(placed) ? placed : NO_TRANSFORM

  const pressed = useAnimatedStyle(() => {
    'worklet'
    return { transform: [...own, { scale: size.value }] }
  }, [own, size])

  return (
    <AnimatedFeedback
      // The animated wrapper types its ref as itself; at runtime it is the host view.
      ref={ref as never}
      isPressed={isPressed}
      style={[style, pressed]}
      {...props}
    />
  )
})

const NO_TRANSFORM: never[] = []

PressRow.displayName = 'XAUI.Tram.PressRow'
