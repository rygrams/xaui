import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_CONFIRM_DURATION,
  RIPPLE_EXPAND_DURATION,
  RIPPLE_FADE_IN,
  RIPPLE_FADE_OUT,
  RIPPLE_FADE_OUT_DELAY,
  RIPPLE_OPACITY,
  RIPPLE_START_SCALE,
  resolveSlotAnimation,
  rippleRadiusFor,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackRippleProps = {
  /**
   * Styles the **wave**, not the container — `backgroundColor` here is how a component
   * gives the ripple the ink its surface needs. The default is the theme's `foreground`,
   * which reads on a neutral surface; a component knows what it is sitting on and this
   * primitive does not.
   */
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
}

/**
 * A circle washing outwards from where the finger landed.
 *
 * **It carries its own touch handlers, and that is why it works at all.** `Pressable` owns
 * the responder system — it decides whether a touch becomes a press — and swallows the raw
 * touch props handed to it, so a ripple driven from the root draws nothing. The handlers
 * belong on this overlay's own `View`, which does not claim the responder, so the press
 * underneath is untouched.
 *
 * The motion is Material's `InkRipple`, and the parts that matter are the ones that are not
 * obvious: the ink is **independent of the expansion**, the circle **starts at 30%** of its
 * target rather than at a point, the target is **half the diagonal**, and the centre
 * **travels** from the finger to the middle of the control. See the constants for why each
 * one is load-bearing.
 *
 * Two waves, used in turn, so a rapid double tap opens a fresh one under the one still
 * finishing instead of cutting it.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
}: PressableFeedbackRippleProps) {
  const { animation } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(override, animation.ripple, RIPPLE_OPACITY)

  const [size, setSize] = useState({ width: 0, height: 0 })
  const waves = [useWave(), useWave()] as const
  const onFirst = useRef(true)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setSize(current =>
      current.width === width && current.height === height
        ? current
        : { width, height }
    )
  }

  const handleTouchStart = (event: GestureResponderEvent) => {
    const wave = onFirst.current ? waves[0] : waves[1]
    onFirst.current = !onFirst.current

    const { locationX, locationY } = event.nativeEvent
    wave.origin.value = { x: locationX, y: locationY }
    wave.expand.value = 0
    wave.expand.value = withTiming(1, {
      duration: RIPPLE_EXPAND_DURATION,
      easing: Easing.ease,
    })
    wave.alpha.value = withTiming(1, { duration: RIPPLE_FADE_IN })
  }

  const handleTouchEnd = () => {
    // The wave catches up rather than being cut: the expansion finishes fast, and the ink
    // only starts leaving once it has arrived.
    const wave = onFirst.current ? waves[1] : waves[0]
    wave.expand.value = withTiming(1, {
      duration: RIPPLE_CONFIRM_DURATION,
      easing: Easing.ease,
    })
    wave.alpha.value = withDelay(
      RIPPLE_FADE_OUT_DELAY,
      withTiming(0, { duration: RIPPLE_FADE_OUT })
    )
  }

  if (!settings.enabled) return null

  const radius = rippleRadiusFor(size.width, size.height)

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.clip]}
      onLayout={handleLayout}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {waves.map((wave, index) => (
        <RippleWave
          key={index}
          wave={wave}
          radius={radius}
          center={{ x: size.width / 2, y: size.height / 2 }}
          color={theme.colors.foreground}
          opacity={settings.opacity}
          style={style}
        />
      ))}
    </View>
  )
}

PressableFeedbackRipple.displayName = 'XAUI.PressableFeedback.Ripple'

type Wave = {
  expand: SharedValue<number>
  alpha: SharedValue<number>
  origin: SharedValue<{ x: number; y: number }>
}

function useWave(): Wave {
  return {
    expand: useSharedValue(0),
    alpha: useSharedValue(0),
    origin: useSharedValue({ x: 0, y: 0 }),
  }
}

function RippleWave({
  wave,
  radius,
  center,
  color,
  opacity,
  style,
}: {
  wave: Wave
  radius: number
  center: { x: number; y: number }
  color: string
  opacity: number
  style?: StyleProp<ViewStyle>
}) {
  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    const t = wave.expand.value
    const from = wave.origin.value

    // The circle is laid out at its target size and scaled down, so nothing re-lays out
    // mid-wave. It never starts smaller than 30% — a wave from a dot is invisible for the
    // part of its life where it would read as a wave.
    const scale = RIPPLE_START_SCALE + (1 - RIPPLE_START_SCALE) * t

    // Travels from the finger to the middle of the control as it opens, which is what
    // makes it settle in rather than flood out of a corner.
    const x = from.x + (center.x - from.x) * t
    const y = from.y + (center.y - from.y) * t

    return {
      // Its own curve, not the expansion's: full ink in 75ms, held while the circle grows.
      opacity: wave.alpha.value * opacity,
      transform: [{ translateX: x - radius }, { translateY: y - radius }, { scale }],
    }
  }, [wave, radius, center, opacity])

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
