import { useState } from 'react'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useFeedback } from './pressable-feedback-context'
import { markOverlay } from './pressable-feedback.overlay'
import {
  RIPPLE_OPACITY,
  RIPPLE_START_SCALE,
  resolveSlotAnimation,
  rippleRadiusFor,
} from './pressable-feedback.animation'
import type { RippleWave as Wave, SlotAnimation } from './pressable-feedback.type'
import { useStyleProps } from '../style-props'
import type { ViewStyleProps } from '../style-props'

export type PressableFeedbackRippleProps = ViewStyleProps & {
  /** Applies to the wave itself, not to the container that clips it. */
  style?: StyleProp<ViewStyle>
  animation?: SlotAnimation
  /**
   * The content the wave washes under. Optional: `<Ripple />` on its own is an overlay
   * among the root's other children, and the root hoists it so order does not matter.
   */
  children?: ReactNode
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
 * Its ink and its corners come from the root, which reads both off its own style — only
 * the root knows what the wave sits on, or what shape it has to stay inside.
 *
 * **Wrapping is the readable form**, and it costs nothing:
 *
 * ```tsx
 * <PressableFeedback style={{ flexDirection: 'row', gap: 8 }}>
 *   <PressableFeedback.Ripple>
 *     <Icon />
 *     <Label />
 *   </PressableFeedback.Ripple>
 * </PressableFeedback>
 * ```
 *
 * The children are **not** put inside a box. They come back as siblings of the wave's
 * container in a fragment, which has no presence in the host tree — so the root's
 * `flexDirection`, `gap` and `alignItems` still reach the icon and the label directly, and
 * the rendered tree is identical to writing the wave as a bare sibling. Written on its own,
 * `<Ripple />` is that bare sibling, and the root hoists it so order does not matter.
 *
 * The motion is Material's `InkRipple`, and the parts that matter are the ones that are not
 * obvious: the ink is **independent of the expansion**, the circle **starts at 30%** of its
 * target rather than at a point, the target is **half the diagonal**, and the centre
 * **travels** from the finger to the middle of the control. The constants carry the why.
 */
export function PressableFeedbackRipple({
  style,
  animation: override,
  children,
  ...props
}: PressableFeedbackRippleProps) {
  const { animation, waves, ink, corners } = useFeedback()
  const [styleProps] = useStyleProps(props)
  // Merged once here: the wave is what a caller sees, so a style prop reaches it the same
  // way `style` does rather than landing on the container that clips it.
  const waveStyle = [styleProps, style]

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

  // `children` survives the disabled branch. Returning `null` here would delete the
  // control's own label whenever the wave is switched off — the one way a wrapping overlay
  // can fail badly, and `animation={false}` would have triggered it.
  if (!waves || !settings.enabled) return <>{children}</>

  const radius = rippleRadiusFor(size.width, size.height)

  return (
    <>
      {/* The clip is the container's, and it carries the root's corners: a wave is a
          circle wider than the control, so without both it washes past the rounded edge. */}
      <View
        style={[StyleSheet.absoluteFill, styles.clip, corners]}
        onLayout={handleLayout}
      >
        {waves.map((wave, index) => (
          <RippleWave
            key={index}
            wave={wave}
            radius={radius}
            center={{ x: size.width / 2, y: size.height / 2 }}
            color={ink}
            opacity={settings.opacity}
            style={waveStyle}
          />
        ))}
      </View>
      {children}
    </>
  )
}

PressableFeedbackRipple.displayName = 'XAUI.PressableFeedback.Ripple'
markOverlay(PressableFeedbackRipple)

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
  // `pointerEvents` in the style rather than as a prop: the prop form is deprecated, and it
  // is not decoration — a container that ate touches would claim every press meant for the
  // control it covers.
  clip: { overflow: 'hidden', pointerEvents: 'none' },
  wave: { position: 'absolute', top: 0, start: 0 },
})
