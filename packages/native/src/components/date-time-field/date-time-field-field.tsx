import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { useDateTimeField } from './date-time-field.context'
import type { DateTimeFieldFieldProps } from './date-time-field.type'

/**
 * The box, masked.
 *
 * It **is** `TextField.Field`, with the value and the keystroke taken over by the mask —
 * `DateField.Field` and `TimeField.Field` exactly, over the mask that is both of theirs.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, which is what lets
 * `DateTimeField.Period` sit on the trailing edge without the digits running under it.
 */
export const DateTimeFieldField = forwardRef<TextInput, DateTimeFieldFieldProps>(
  function DateTimeFieldField({ placeholder, style, ...props }, ref) {
    const { text, onType, placeholder: shape, length } = useDateTimeField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    return (
      <TextFieldField
        ref={ref}
        // Digits, two marks and a colon, and a full keyboard offers none of them first.
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

DateTimeFieldField.displayName = 'XAUI.DateTimeField.Field'
