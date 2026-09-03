import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useFeedback } from './pressable-feedback-context'
import { markOverlay } from './pressable-feedback.overlay'
import {
  HIGHLIGHT_DURATION,
  HIGHLIGHT_OPACITY,
  resolveSlotAnimation,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackHighlightProps = {
  style?: StyleProp<ViewStyle>
  animation?: SlotAnimation
  /**
   * The content the wash sits under. Optional: `<Highlight />` on its own is an overlay
   * among the root's other children, and the root hoists it so order does not matter.
   */
  children?: ReactNode
}

/**
 * The press wash: one flat overlay fading in under the finger.
 *
 * It is a **neutral** wash, not the variant's pressed colour. A component picks one or
 * the other — this overlay, or a `pressed` state in its recipe swapping `bg` for
 * `bgPressed` — never both, or a pressed button darkens twice.
 *
 * **Wrapping is the readable form**, and it costs nothing:
 *
 * ```tsx
 * <PressableFeedback style={{ flexDirection: 'row', gap: 8 }}>
 *   <PressableFeedback.Highlight>
 *     <Icon />
 *     <Label />
 *   </PressableFeedback.Highlight>
 * </PressableFeedback>
 * ```
 *
 * The children are **not** put inside a box. They are returned as siblings of the wash in
 * a fragment, which has no presence in the host tree — so the root's `flexDirection`,
 * `gap` and `alignItems` still reach the icon and the label directly, and the rendered
 * tree is identical to writing the wash as a bare sibling. A real wrapping `View` would
 * have made the root's layout apply to the wrapper instead, and would have added the depth
 * §8 removed.
 */
export function PressableFeedbackHighlight({
  style,
  animation: override,
  children,
}: PressableFeedbackHighlightProps) {
  const { isPressed, animation, progress, ink, corners } = useFeedback()

  const settings = resolveSlotAnimation(
    override,
    animation.highlight,
    HIGHLIGHT_OPACITY,
    HIGHLIGHT_DURATION
  )

  // The root's corners, not the caller's problem: an absolute fill is square, and a square
  // wash on a rounded control paints outside it at every corner.
  //
  // `pointerEvents` in the style rather than as a prop: the prop form is deprecated, and it
  // is not decoration — an overlay that ate touches would claim every press meant for the
  // control underneath it.
  const base: StyleProp<ViewStyle> = [
    StyleSheet.absoluteFillObject,
    { backgroundColor: ink, pointerEvents: 'none' },
    corners,
    style,
  ]

  // No shared value means the static branch, which mounts no worklet. The wash still
  // appears — it simply does not fade.
  //
  // `children` is re-emitted on *every* branch, including the disabled one. Dropping it
  // where the wash is switched off would delete the control's own label, which is the
  // failure `animation={false}` would otherwise cause on a wrapping overlay.
  if (!progress || !settings.enabled) {
    return (
      <>
        <View style={[base, { opacity: isPressed ? settings.opacity : 0 }]} />
        {children}
      </>
    )
  }

  return (
    <>
      <AnimatedHighlight
        base={base}
        duration={settings.duration}
        opacity={settings.opacity}
      />
      {children}
    </>
  )
}

PressableFeedbackHighlight.displayName = 'XAUI.PressableFeedback.Highlight'
markOverlay(PressableFeedbackHighlight)

function AnimatedHighlight({
  base,
  duration,
  opacity,
}: {
  base: StyleProp<ViewStyle>
  duration: number
  opacity: number
}) {
  const { isPressed } = useFeedback()

  // Its own fade rather than the root's press progress, so a `duration` on this slot
  // means something instead of being quietly ignored — the root's timing drives the
  // scale, which is a different animation.
  const shown = useSharedValue(0)

  useEffect(() => {
    shown.value = withTiming(isPressed ? 1 : 0, { duration })
  }, [isPressed, shown, duration])

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: shown.value * opacity }
  }, [shown, opacity])

  return <Animated.View style={[base, animatedStyle]} />
}
