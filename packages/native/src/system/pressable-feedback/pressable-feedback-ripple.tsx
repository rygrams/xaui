import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_COVERAGE,
  RIPPLE_DURATION,
  RIPPLE_OPACITY,
  resolveSlotAnimation,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackRippleProps = {
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
}

type Point = { x: number; y: number }

/**
 * A circle washing outwards from where the finger landed.
 *
 * **Two animations, not one, and that is the whole shape of it.** The circle *expands*
 * once per touch, from the point of contact to past the far corner. Its *opacity* follows
 * the finger — up on press, held while the press lasts, out on release. Driving both from
 * one curve is what makes a ripple read wrong: tie opacity to the expansion and the wave
 * is invisible under the finger and brightest once it covers everything, which is a flash
 * of the whole control rather than a wave leaving the touch point.
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
  const { animation, progress, pressCount, origin, size } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(
    override,
    animation.ripple,
    RIPPLE_OPACITY,
    RIPPLE_DURATION
  )

  if (!progress || !pressCount || !origin || !size || !settings.enabled) return null

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
  const { pressCount, origin, size } = useFeedback()

  // Two layers, used in turn. A single one restarted on each press cuts the wave in
  // flight, which reads as a blink under a rapid double tap; alternating lets the older
  // wave finish underneath the new one.
  const waveA = useSharedValue(0)
  const waveB = useSharedValue(0)
  const fromA = useSharedValue({ x: 0, y: 0 })
  const fromB = useSharedValue({ x: 0, y: 0 })
  const useA = useSharedValue(true)

  useAnimatedReaction(
    () => {
      'worklet'
      return pressCount?.value ?? 0
    },
    (count, previous) => {
      'worklet'
      if (previous === null || count === previous) return

      const wave = useA.value ? waveA : waveB
      const from = useA.value ? fromA : fromB

      from.value = origin?.value ?? { x: 0, y: 0 }
      wave.value = 0
      // The expansion only. Once open the circle stays open; what ends the ripple is the
      // finger lifting, which drains the opacity below.
      wave.value = withTiming(1, { duration })

      useA.value = !useA.value
    },
    [pressCount, origin, duration, waveA, waveB, fromA, fromB, useA]
  )

  return (
    <>
      <RippleWave
        wave={waveA}
        from={fromA}
        size={size}
        color={color}
        opacity={opacity}
        style={style}
      />
      <RippleWave
        wave={waveB}
        from={fromB}
        size={size}
        color={color}
        opacity={opacity}
        style={style}
      />
    </>
  )
}

function RippleWave({
  wave,
  from,
  size,
  color,
  opacity,
  style,
}: {
  wave: SharedValue<number>
  from: SharedValue<Point>
  size?: SharedValue<{ width: number; height: number }>
  color: string
  opacity: number
  style?: StyleProp<ViewStyle>
}) {
  // The root's own press curve, which already rises on press-in and falls on release.
  const { progress } = useFeedback()

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    const within = size?.value ?? { width: 0, height: 0 }
    // The diagonal covers the control from any point on it, so where the finger landed
    // never has to enter the radius — one number, and no corner left unwashed.
    const radius =
      Math.sqrt(within.width * within.width + within.height * within.height) *
      RIPPLE_COVERAGE
    const at = from.value

    return {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      // The press, not the expansion. The wave is at full strength the instant it is
      // touched, stays while the finger stays, and drains when it lifts.
      opacity: (progress?.value ?? 0) * opacity,
      transform: [
        { translateX: at.x - radius },
        { translateY: at.y - radius },
        { scale: wave.value },
      ],
    }
  }, [wave, from, size, opacity, progress])

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
