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
  resolveSlotAnimation,
  rippleRadius,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackRippleProps = {
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
}

/**
 * A circle growing from where the finger landed until it covers the root.
 *
 * It needs the root to clip — `PressableFeedback` sets `overflow: 'hidden'` when it
 * mounts one — and it renders nothing on the static branch: a ripple that cannot expand
 * is a coloured disc sitting on the control, which reads as a defect rather than as
 * reduced motion.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
}: PressableFeedbackRippleProps) {
  const { animation, progress, origin, size } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(
    override,
    animation.ripple,
    RIPPLE_OPACITY,
    RIPPLE_DURATION
  )

  if (!progress || !origin || !size || !settings.enabled) return null

  return (
    <AnimatedRipple
      color={theme.colors.foreground}
      duration={settings.duration}
      opacity={settings.opacity}
      style={style}
    />
  )
}

PressableFeedbackRipple.displayName = 'XAUI.PressableFeedback.Ripple'

function AnimatedRipple({
  color,
  duration,
  opacity,
  style,
}: {
  color: string
  duration: number
  opacity: number
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
    grown.value = withTiming(1, { duration })
  }, [isPressed, grown, duration])

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
      opacity: (1 - grown.value) * opacity,
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
