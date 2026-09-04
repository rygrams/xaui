import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInputOTP } from './input-otp.context'
import type { InputOTPGroupProps } from './input-otp.type'

/**
 * A row of boxes. One group for a plain code, two with an `InputOTP.Separator` between
 * them for the `123 · 456` shape.
 *
 * It takes a **render function** as well as elements, which is the one place in the
 * library where a slot does. The reason is that the number of children here is data —
 * `maxLength` — rather than markup, and writing six boxes out by hand is a list that
 * silently disagrees with the prop the moment either changes:
 *
 * ```tsx
 * <InputOTP.Group>
 *   {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
 * </InputOTP.Group>
 * ```
 *
 * Splitting into two groups is a matter of slicing what you are handed — `slots.slice(0, 3)`
 * and `slots.slice(3)` — which is why there is no `groupSize` prop.
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

InputOTPGroup.displayName = 'XAUI.InputOTP.Group'
