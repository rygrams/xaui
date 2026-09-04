import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPValueProps } from './input-otp.type'

/**
 * The character in a box, or nothing while the box is empty.
 *
 * `maxFontSizeMultiplier` is capped: a box has a fixed width, and a code scaled to a
 * 200% accessibility font would be a character cut in half rather than a larger one. The
 * cap is generous enough to still grow with the reader's setting.
 */
export const InputOTPValue = forwardRef<Text, InputOTPValueProps>(
  function InputOTPValue(
    { children, style, maxFontSizeMultiplier = 1.6, ...props },
    ref
  ) {
    const { valueStyle } = useInputOTP()
    const { slot } = useInputOTPBox()
    const [styleProps, rest] = useStyleProps(props)

    const char = children ?? slot?.char
    if (!char) return null

    return (
      <Text
        ref={ref}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        style={[valueStyle, styleProps, style]}
        {...rest}
      >
        {char}
      </Text>
    )
  }
)

InputOTPValue.displayName = 'XAUI.InputOTP.Value'
