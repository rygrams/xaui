import { useEffect } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_DURATION,
  RIPPLE_OPACITY,
  rippleRadius,
} from './pressable-feedback.animation'

export type PressableFeedbackRippleProps = {
  style?: StyleProp<ViewStyle>
}

/**
 * A circle growing from where the finger landed until it covers the root.
 *
 * It needs the root to clip — `PressableFeedback` sets `overflow: 'hidden'` when it
 * mounts one — and it renders nothing on the static branch: a ripple that cannot expand
 * is a coloured disc sitting on the control, which reads as a defect rather than as
 * reduced motion.
 */
export function PressableFeedbackRipple({ style }: PressableFeedbackRippleProps) {
  const { animation, progress, origin, size } = useFeedback()
  const theme = useXAUITheme()

  if (!progress || !origin || !size || !animation.ripple) return null

  return <AnimatedRipple color={theme.colors.foreground} style={style} />
}

PressableFeedbackRipple.displayName = 'XAUI.PressableFeedback.Ripple'

function AnimatedRipple({
  color,
  style,
}: {
  color: string
  style?: StyleProp<ViewStyle>
}) {
  const { isPressed, origin, size } = useFeedback()

  // Its own progress, not the root's: the root's reverses on release, and a ripple that
  // ran backwards would shrink into the finger instead of washing outwards. This one
  // restarts from zero on each press and only ever grows.
  const grown = useSharedValue(0)

  useEffect(() => {
    if (!isPressed) return
    grown.value = 0
    grown.value = withTiming(1, { duration: RIPPLE_DURATION })
  }, [isPressed, grown])

  const animatedStyle = useAnimatedStyle(() => {
    const at = origin?.value ?? { x: 0, y: 0 }
    const within = size?.value ?? { width: 0, height: 0 }
    const radius = rippleRadius(at, within)

    return {
      top: at.y - radius,
      start: at.x - radius,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      opacity: (1 - grown.value) * RIPPLE_OPACITY,
      transform: [{ scale: grown.value }],
    }
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: 'absolute', backgroundColor: color },
        animatedStyle,
        style,
      ]}
    />
  )
}
