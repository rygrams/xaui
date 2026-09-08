import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldFieldProps } from './phone-number-field.type'

export const PhoneNumberFieldField = forwardRef<
  TextInput,
  PhoneNumberFieldFieldProps
>(function PhoneNumberFieldField({ style, onBlur, ...props }, ref) {
  const { value, setNumber, formatNumber } = usePhoneNumberField()
  const group = useOptionalFieldGroup()
  const padding = useMemo(
    () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
    [group?.prefixWidth, group?.suffixWidth]
  )
  return (
    <TextFieldField
      ref={ref}
      keyboardType="phone-pad"
      autoComplete="tel-national"
      {...props}
      value={value.nationalNumber}
      onChangeText={setNumber}
      onBlur={event => {
        formatNumber()
        onBlur?.(event)
      }}
      style={[padding, style]}
    />
  )
})
PhoneNumberFieldField.displayName = 'XAUI.PhoneNumberField.Field'
