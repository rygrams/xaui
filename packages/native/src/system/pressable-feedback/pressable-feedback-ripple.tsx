import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_COVERAGE,
  RIPPLE_OPACITY,
  resolveSlotAnimation,
  rippleDurationFor,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackRippleProps = {
  /**
   * Styles the **wave**, not the container — `backgroundColor` here is how a component
   * gives the ripple the ink its surface needs. A filled button wants its own contrasted
   * foreground, not the app's: black ink at 10% over a saturated fill is close to
   * invisible, which is the one thing a press indicator cannot be.
   */
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
}

/**
 * A circle washing outwards from where the finger landed.
 *
 * **It carries its own touch handlers, and that is the whole reason it works.** `Pressable`
 * runs the responder system: it decides whether a touch becomes a press, and raw
 * `onTouchStart` handed to it never arrives — which is why a ripple driven from the root
 * draws nothing at all. The handlers belong on this overlay's own `View`, where a raw touch
 * is still a raw touch. It does not claim the responder, so the press underneath is
 * unaffected.
 *
 * Everything else follows from owning the touch: this measures itself, keeps its own two
 * waves, and needs nothing from the root but the blanket `animation` setting.
 *
 * One wave runs `0 → 1` while the finger is down and `1 → 2` once it lifts, so its life is
 * the press's plus a tail — not a one-shot that vanishes under a finger still resting on
 * the control. Two of them, used in turn, so a rapid double tap opens a fresh wave under
 * the one still finishing instead of cutting it.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
}: PressableFeedbackRippleProps) {
  const { animation } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(override, animation.ripple, RIPPLE_OPACITY)

  const [size, setSize] = useState({ width: 0, height: 0 })
  const waveA = useSharedValue(0)
  const waveB = useSharedValue(0)
  const centerA = useSharedValue({ x: 0, y: 0 })
  const centerB = useSharedValue({ x: 0, y: 0 })
  const onA = useRef(true)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setSize(current =>
      current.width === width && current.height === height
        ? current
        : { width, height }
    )
  }

  const handleTouchStart = (event: GestureResponderEvent) => {
    const duration = rippleDurationFor(size.width, size.height)
    const wave = onA.current ? waveA : waveB
    const other = onA.current ? waveB : waveA
    const center = onA.current ? centerA : centerB
    onA.current = !onA.current

    // Send the wave still in flight to its end rather than abandoning it mid-open.
    if (other.value > 0 && other.value < 2) {
      other.value = withTiming(2, { duration })
    }

    const { locationX, locationY } = event.nativeEvent
    center.value = { x: locationX, y: locationY }
    wave.value = 0
    wave.value = withTiming(1, { duration })
  }

  const handleTouchEnd = () => {
    const duration = rippleDurationFor(size.width, size.height)
    const wave = onA.current ? waveB : waveA
    wave.value = withTiming(2, { duration })
  }

  if (!settings.enabled) return null

  // The diagonal covers the control from any point on it, so where the finger landed never
  // has to enter the radius — one number, and no corner left unwashed.
  const radius =
    Math.sqrt(size.width * size.width + size.height * size.height) * RIPPLE_COVERAGE

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.clip]}
      onLayout={handleLayout}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <RippleWave
        wave={waveA}
        center={centerA}
        radius={radius}
        color={theme.colors.foreground}
        opacity={settings.opacity}
        style={style}
      />
      <RippleWave
        wave={waveB}
        center={centerB}
        radius={radius}
        color={theme.colors.foreground}
        opacity={settings.opacity}
        style={style}
      />
    </View>
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
        styles.wave,
        {
          backgroundColor: color,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        },
        style,
        animatedStyle,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  wave: { position: 'absolute', top: 0, start: 0 },
})
