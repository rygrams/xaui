import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useInputOTP } from './input-otp.context'
import type { InputOTPSeparatorProps } from './input-otp.type'

/**
 * The dash between two groups, in `muted` — 2 thick, no corner. Decoration: a screen
 * reader reads the code off the hidden input, which has no gap in it.
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

InputOTPSeparator.displayName = 'XAUI.Tram.InputOTP.Separator'
