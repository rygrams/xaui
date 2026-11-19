import { useEffect } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { duration } from '../../motion/motion-tokens'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPCaretProps } from './input-otp.type'

/**
 * The bar in the box the next character lands in — 2 wide, in the accent as ink, no
 * corner. Ours rather than the platform's: the real caret belongs to the hidden input,
 * stretched across the row. Only while its box is active **and** empty.
 *
 * It blinks; it stands still when the user reduced motion, when an ancestor turned
 * animation off, or when `animation={false}`.
 */
export function InputOTPCaret({
  style,
  animation = true,
  ...props
}: InputOTPCaretProps) {
  const { caretStyle, isStill } = useInputOTP()
  const { slot } = useInputOTPBox()
  const isReduced = useReducedMotion()
  const [styleProps] = useStyleProps(props)

  const barStyle = [caretStyle, styleProps, style]

  if (!slot?.isCaretVisible) return null

  // Two components rather than a branch inside one: the Reanimated hooks are only reached
  // when the bar blinks.
  if (!animation || isStill || isReduced) return <View style={barStyle} />

  return <BlinkingCaret style={barStyle} />
}

InputOTPCaret.displayName = 'XAUI.Tram.InputOTP.Caret'

function BlinkingCaret({ style }: { style: StyleProp<ViewStyle> }) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    // On and off at the `slow` step, near the platform caret's own half second.
    opacity.value = withRepeat(withTiming(0, { duration: duration.slow }), -1, true)
    // A repeat with no end runs until something stops it; unmounting is not enough.
    return () => cancelAnimation(opacity)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: opacity.value }
  }, [opacity])

  return <Animated.View style={[style, animatedStyle]} />
}
