import { useEffect } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPCaretProps } from './input-otp.type'

/** Half a second each way — the platform caret's own rhythm, near enough to not notice. */
const BLINK_DURATION = 530

/**
 * The bar in the box the next character lands in.
 *
 * It is ours rather than the platform's: the real caret belongs to the hidden input,
 * which is stretched across the whole row, so it would sit wherever the invisible text
 * happens to end rather than in the box the reader is looking at. `caretHidden` on that
 * input is the other half of the same decision.
 *
 * It renders only while its box is active **and** empty — a bar over a character would
 * cross it out.
 */
export function InputOTPCaret({
  style,
  animation = true,
  ...props
}: InputOTPCaretProps) {
  const { caretStyle } = useInputOTP()
  const { slot } = useInputOTPBox()
  const [styleProps] = useStyleProps(props)

  const barStyle = [caretStyle, styleProps, style]

  if (!slot?.isCaretVisible) return null

  // Two components rather than a branch inside one: hooks cannot be conditional, and
  // "no animation" is only true if the Reanimated hooks are never reached.
  if (!animation) return <View style={barStyle} />

  return <BlinkingCaret style={barStyle} />
}

InputOTPCaret.displayName = 'XAUI.InputOTP.Caret'

function BlinkingCaret({ style }: { style: StyleProp<ViewStyle> }) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: BLINK_DURATION, easing: Easing.ease }),
      -1,
      true
    )
    // A repeat with no end runs until something stops it, and unmounting the box is not
    // by itself that something.
    return () => cancelAnimation(opacity)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return <Animated.View style={[style, animatedStyle]} />
}
