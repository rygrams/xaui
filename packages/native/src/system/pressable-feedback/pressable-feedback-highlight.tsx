import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useFeedback } from './pressable-feedback-context'
import {
  HIGHLIGHT_OPACITY,
  resolveSlotAnimation,
} from './pressable-feedback.animation'
import type { SlotAnimation } from './pressable-feedback.type'

export type PressableFeedbackHighlightProps = {
  style?: StyleProp<ViewStyle>
  /** Overrides the blanket `animation` on the root, for this overlay only. */
  animation?: SlotAnimation
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
  animation: override,
}: PressableFeedbackHighlightProps) {
  const { isPressed, animation, progress } = useFeedback()
  const theme = useXAUITheme()

  const settings = resolveSlotAnimation(
    override,
    animation.highlight,
    HIGHLIGHT_OPACITY
  )

  const base: StyleProp<ViewStyle> = [
    StyleSheet.absoluteFillObject,
    { backgroundColor: theme.colors.foreground },
    style,
  ]

  // No shared value means the static branch, which mounts no worklet. The wash still
  // appears — it simply does not fade.
  if (!progress || !settings.enabled) {
    return (
      <View
        pointerEvents="none"
        style={[base, { opacity: isPressed ? settings.opacity : 0 }]}
      />
    )
  }

  return (
    <AnimatedHighlight
      base={base}
      duration={settings.duration}
      opacity={settings.opacity}
    />
  )
}

PressableFeedbackHighlight.displayName = 'XAUI.PressableFeedback.Highlight'

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

  return <Animated.View pointerEvents="none" style={[base, animatedStyle]} />
}
