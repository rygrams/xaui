import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInputOTP } from './input-otp.context'
import type { InputOTPSeparatorProps } from './input-otp.type'

/**
 * The dash between two groups — the `123 · 456` shape a six-digit code is usually read in.
 *
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTP.Group>{({ slots }) => slots.slice(0, 3).map(box)}</InputOTP.Group>
 *   <InputOTP.Separator />
 *   <InputOTP.Group>{({ slots }) => slots.slice(3).map(box)}</InputOTP.Group>
 * </InputOTP>
 * ```
 *
 * It is decoration: a screen reader reads the value off the hidden input, which has no
 * gap in it, so the dash is hidden from the accessibility tree rather than announced as
 * a stray character in the middle of the code.
 */
export const InputOTPSeparator = forwardRef<View, InputOTPSeparatorProps>(
  function InputOTPSeparator({ children, style, ...props }, ref) {
    const { separatorStyle } = useInputOTP()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[separatorStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </View>
    )
  }
)

InputOTPSeparator.displayName = 'XAUI.InputOTP.Separator'
