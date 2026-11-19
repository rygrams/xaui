import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPPlaceholderProps } from './input-otp.type'

/**
 * What a box shows before anything is typed in it — a dot, a dash, a zero — in `muted`.
 * Only where there is neither a character nor the caret, which `buildSlots` decides.
 */
export const InputOTPPlaceholder = forwardRef<Text, InputOTPPlaceholderProps>(
  function InputOTPPlaceholder(
    { children, style, maxFontSizeMultiplier = 1.4, ...props },
    ref
  ) {
    const { placeholderStyle } = useInputOTP()
    const { slot } = useInputOTPBox()
    const [styleProps, rest] = useStyleProps(props)

    const char = children ?? slot?.placeholderChar
    if (!char) return null

    return (
      <Text
        ref={ref}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        style={[placeholderStyle, styleProps, style]}
        {...rest}
      >
        {char}
      </Text>
    )
  }
)

InputOTPPlaceholder.displayName = 'XAUI.Tram.InputOTP.Placeholder'
