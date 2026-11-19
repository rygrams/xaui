import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPValueProps } from './input-otp.type'

/**
 * The character in a box, on the Tram scale and in tabular figures — or nothing while the
 * box is empty. `maxFontSizeMultiplier` is capped: the box has a fixed size, and a code
 * scaled to 200% would be a character cut in half.
 */
export const InputOTPValue = forwardRef<Text, InputOTPValueProps>(
  function InputOTPValue(
    { children, style, maxFontSizeMultiplier = 1.4, ...props },
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

InputOTPValue.displayName = 'XAUI.Tram.InputOTP.Value'
