import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInputOTP, useInputOTPBox } from './input-otp.context'
import type { InputOTPPlaceholderProps } from './input-otp.type'

/**
 * What a box shows before anything is typed in it — a dot, a dash, a zero.
 *
 * It renders only where there is neither a character nor the caret, which is decided in
 * `buildSlots` rather than here: three components each guessing at the same three-way
 * choice is how two of them end up on screen at once.
 */
export const InputOTPPlaceholder = forwardRef<Text, InputOTPPlaceholderProps>(
  function InputOTPPlaceholder(
    { children, style, maxFontSizeMultiplier = 1.6, ...props },
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

InputOTPPlaceholder.displayName = 'XAUI.InputOTP.Placeholder'
