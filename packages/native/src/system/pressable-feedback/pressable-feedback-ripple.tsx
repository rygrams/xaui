import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
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
 * It is a **one-shot, independent of how long the press lasts**: the wave runs its course
 * and ends, the way a ripple in water does. Tying it to the press would leave a disc
 * parked on the control for as long as a finger rests there.
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
      // Past 1 the circle holds its size while the colour drains, so the wave finishes
      // on its own rather than vanishing the instant it is fully open.
      wave.value = withTiming(2, { duration: duration * 2 })

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
      // Rises as the circle opens and drains once it is open — so the wave is at its
      // strongest when it covers the control, not when it is a dot under the finger.
      opacity: interpolate(wave.value, [0, 1, 2], [0, opacity, 0]),
      transform: [
        { translateX: at.x - radius },
        { translateY: at.y - radius },
        { scale: interpolate(wave.value, [0, 1, 2], [0, 1, 1]) },
      ],
    }
  }, [wave, from, size, opacity])

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
