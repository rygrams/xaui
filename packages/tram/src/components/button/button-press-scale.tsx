import { forwardRef, useEffect } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PressableFeedback } from '@xaui/native/system'
import type { PressableFeedbackProps } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'

const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

/**
 * The Tram press: the pressable shrinks to 96% on the `press` spring and comes back on
 * it, so a second touch interrupts the first — or fades, with motion reduced.
 *
 * It is Native's `PressableFeedback` with its own animations off, because that primitive
 * owns `asChild`, the disabled state and the style props; only the movement is Tram's.
 * Kept in this folder until a second control presses the same way.
 */
export const PressScale = forwardRef<View, PressableFeedbackProps>(
  function PressScale({ isPressed = false, style, ...props }, ref) {
    const animate = useTramMotion()
    const progress = useSharedValue(1)

    useEffect(() => {
      progress.value = animate(isPressed ? scale.press : 1)
    }, [isPressed, animate, progress])

    const scaled = useAnimatedStyle(() => {
      'worklet'
      return { transform: [{ scale: progress.value }] }
    }, [progress])

    return (
      <AnimatedFeedback
        // The animated wrapper types its ref as itself; at runtime it is the host view.
        ref={ref as never}
        isPressed={isPressed}
        style={[style, scaled]}
        {...props}
      />
    )
  }
)

PressScale.displayName = 'XAUI.Tram.Button.PressScale'
