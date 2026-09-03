import type { StyleProp, ViewStyle } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_COVERAGE,
  RIPPLE_OPACITY,
  resolveSlotAnimation,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackRippleProps = {
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
}

/**
 * A circle washing outwards from where the finger landed.
 *
 * **The root drives it, this only draws it.** The wave has to start on the raw touch, and
 * the touch handlers live on the pressable — so the root owns the two waves and publishes
 * them here. An overlay starting its own wave from a shared value it watched would depend
 * on React re-rendering between the two touch events, which is precisely what fails inside
 * a `ScrollView`: the press is never granted, and the wave never leaves the finger.
 *
 * One wave runs `0 → 1` while the finger is down and `1 → 2` once it lifts, so its life is
 * the press's plus a tail — not a fixed one-shot that vanishes under a finger still resting
 * on the control. The opacity peaks at `1`, the moment the circle covers the control.
 *
 * It needs the root to clip — `PressableFeedback` sets `overflow: 'hidden'` when it mounts
 * one — and it renders nothing on the static branch: a ripple that cannot expand is a
 * coloured disc sitting on the control, which reads as a defect rather than reduced motion.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
}: PressableFeedbackRippleProps) {
  const { animation, ripple } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(override, animation.ripple, RIPPLE_OPACITY)

  // Nothing to draw before the first layout: a zero-radius circle is not a ripple.
  if (!ripple || !settings.enabled) return null

  const { width, height } = ripple.measured
  if (width === 0 || height === 0) return null

  // The diagonal covers the control from any point on it, so where the finger landed
  // never has to enter the radius — one number, and no corner left unwashed.
  const radius = Math.sqrt(width * width + height * height) * RIPPLE_COVERAGE

  return (
    <>
      <RippleWave
        wave={ripple.wave[0]}
        center={ripple.center[0]}
        radius={radius}
        color={theme.colors.foreground}
        opacity={settings.opacity}
        style={style}
      />
      <RippleWave
        wave={ripple.wave[1]}
        center={ripple.center[1]}
        radius={radius}
        color={theme.colors.foreground}
        opacity={settings.opacity}
        style={style}
      />
    </>
  )
}

PressableFeedbackRipple.displayName = 'XAUI.PressableFeedback.Ripple'

function RippleWave({
  wave,
  center,
  radius,
  color,
  opacity,
  style,
}: {
  wave: SharedValue<number>
  center: SharedValue<{ x: number; y: number }>
  radius: number
  color: string
  opacity: number
  style?: StyleProp<ViewStyle>
}) {
  // Only what actually animates. The circle's size is a plain style, laid out once.
  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    const at = center.value

    return {
      opacity: interpolate(wave.value, [0, 1, 2], [0, opacity, 0]),
      transform: [
        { translateX: at.x - radius },
        { translateY: at.y - radius },
        // Open over the first half, then hold while the colour drains. A circle that
        // shrank back would read as the control undoing itself.
        { scale: interpolate(wave.value, [0, 1, 2], [0, 1, 1]) },
      ],
    }
  }, [wave, center, radius, opacity])

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          backgroundColor: color,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        },
        animatedStyle,
        style,
      ]}
    />
  )
}
