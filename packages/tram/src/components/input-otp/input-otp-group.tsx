import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useInputOTP } from './input-otp.context'
import type { InputOTPGroupProps } from './input-otp.type'

/**
 * A row of boxes. One group for a plain code, two with an `InputOTP.Separator` between
 * them for the `123 – 456` shape. It takes a render function, since the number of boxes is
 * `maxLength` — data, not markup:
 *
 * ```tsx
 * <InputOTP.Group>
 *   {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
 * </InputOTP.Group>
 * ```
 */
export const InputOTPGroup = forwardRef<View, InputOTPGroupProps>(
  function InputOTPGroup({ children, style, ...props }, ref) {
    const { groupStyle, slots, value, maxLength, isFocused, isDisabled, isInvalid } =
      useInputOTP()
    const [styleProps, rest] = useStyleProps(props)

    const content =
      typeof children === 'function'
        ? children({ slots, value, maxLength, isFocused, isDisabled, isInvalid })
        : children

    return (
      <View ref={ref} style={[groupStyle, styleProps, style]} {...rest}>
        {content}
      </View>
    )
  }
)

InputOTPGroup.displayName = 'XAUI.Tram.InputOTP.Group'
