import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { useDateRangeField } from './date-range-field.context'
import type { DateRangeFieldFieldProps } from './date-range-field.type'

/**
 * The box, masked.
 *
 * It **is** `TextField.Field`, with the value and the keystroke taken over by the mask —
 * `DateField.Field` exactly, over the mask that is that one twice.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, so a calendar or a clear button
 * on the trailing edge does not have the digits running under it.
 */
export const DateRangeFieldField = forwardRef<TextInput, DateRangeFieldFieldProps>(
  function DateRangeFieldField({ placeholder, style, ...props }, ref) {
    const { text, onType, placeholder: shape, length } = useDateRangeField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    return (
      <TextFieldField
        ref={ref}
        // Digits and two marks, and a full keyboard offers neither of them first.
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={length}
        placeholder={placeholder ?? shape}
        {...props}
        // After the caller's, and deliberately: these two are the mask.
        value={text}
        onChangeText={onType}
        style={[padding, style]}
      />
    )
  }
)

DateRangeFieldField.displayName = 'XAUI.DateRangeField.Field'
