import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  RIPPLE_OPACITY,
  RIPPLE_START_SCALE,
  resolveSlotAnimation,
  rippleRadiusFor,
} from './pressable-feedback.animation'
import type { RippleWave as Wave, SlotAnimation } from './pressable-feedback.type'

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
 * **The root drives it, this only draws it.** The root is the touch surface: touches on a
 * component's own children — a button's label — bubble up to the `Pressable`, and never to
 * this overlay, which is their sibling rather than their parent. An overlay owning the
 * handlers works on the padding and does nothing on the text, which is the kind of bug that
 * looks like a rendering problem.
 *
 * The motion is Material's `InkRipple`, and the parts that matter are the ones that are not
 * obvious: the ink is **independent of the expansion**, the circle **starts at 30%** of its
 * target rather than at a point, the target is **half the diagonal**, and the centre
 * **travels** from the finger to the middle of the control. The constants carry the why.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
}: PressableFeedbackRippleProps) {
  const { animation, waves } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(override, animation.ripple, RIPPLE_OPACITY)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setSize(current =>
      current.width === width && current.height === height
        ? current
        : { width, height }
    )
  }

  if (!waves || !settings.enabled) return null

  const radius = rippleRadiusFor(size.width, size.height)

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.clip]}
      onLayout={handleLayout}
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

    // Laid out at its target size and scaled down, so nothing re-lays out mid-wave. It
    // never starts smaller than 30% — a wave from a dot is invisible for the part of its
    // life where it would read as a wave.
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
