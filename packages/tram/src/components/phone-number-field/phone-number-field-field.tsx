import { forwardRef, useCallback } from 'react'
import type { TextInput } from 'react-native'
import { useFieldInGroup } from '../field-group/field-group.hook'
import { TextFieldField } from '../text-field'
import type { FieldBlurEvent } from '../text-field'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldFieldProps } from './phone-number-field.type'

/**
 * The national number: `TextField.Field`, its value and its keystroke the root's. A phone
 * pad and the `tel-national` autofill by default, digits in tabular figures.
 *
 * It formats on blur rather than as it is typed, so a deletion does not fight the spaces
 * the format puts in. In a `FieldGroup` it gives up its own line to the box, as
 * `FieldGroup.Field` does.
 */
export const PhoneNumberFieldField = forwardRef<
  TextInput,
  PhoneNumberFieldFieldProps
>(function PhoneNumberFieldField({ style, onFocus, onBlur, ...props }, ref) {
  const { value, setNumber, formatNumber } = usePhoneNumberField()

  const handleBlur = useCallback(
    (event: FieldBlurEvent) => {
      formatNumber()
      onBlur?.(event)
    },
    [formatNumber, onBlur]
  )
  const grouped = useFieldInGroup({ onFocus, onBlur: handleBlur })

  return (
    <TextFieldField
      ref={ref}
      keyboardType="phone-pad"
      autoComplete="tel-national"
      {...props}
      // After the caller's: these two are the number.
      value={value.nationalNumber}
      onChangeText={setNumber}
      onFocus={grouped.onFocus}
      onBlur={grouped.onBlur}
      style={[grouped.style, TABULAR, style]}
    />
  )
})

const TABULAR = { fontVariant: ['tabular-nums' as const] }

PhoneNumberFieldField.displayName = 'XAUI.Tram.PhoneNumberField.Field'
