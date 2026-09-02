import { StyleSheet, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import { HIGHLIGHT_OPACITY } from './pressable-feedback.animation'

export type PressableFeedbackHighlightProps = {
  style?: StyleProp<ViewStyle>
}

/**
 * The press wash: one flat overlay fading in under the finger.
 *
 * It is a **neutral** wash, not the variant's pressed colour. A component picks one or
 * the other — this overlay, or a `pressed` state in its recipe swapping `bg` for
 * `bgPressed` — never both, or a pressed button darkens twice.
 */
export function PressableFeedbackHighlight({
  style,
}: PressableFeedbackHighlightProps) {
  const { isPressed, animation, progress } = useFeedback()
  const theme = useXAUITheme()

  const base: StyleProp<ViewStyle> = [
    StyleSheet.absoluteFillObject,
    { backgroundColor: theme.colors.foreground },
    style,
  ]

  // No shared value means the static branch, which mounts no worklet. The wash still
  // appears — it simply does not fade.
  if (!progress || !animation.highlight) {
    return (
      <View
        pointerEvents="none"
        style={[base, { opacity: isPressed ? HIGHLIGHT_OPACITY : 0 }]}
      />
    )
  }

  return <AnimatedHighlight base={base} />
}

PressableFeedbackHighlight.displayName = 'XAUI.PressableFeedback.Highlight'

function AnimatedHighlight({ base }: { base: StyleProp<ViewStyle> }) {
  const { progress } = useFeedback()

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: (progress?.value ?? 0) * HIGHLIGHT_OPACITY,
  }))

  return <Animated.View pointerEvents="none" style={[base, animatedStyle]} />
}
