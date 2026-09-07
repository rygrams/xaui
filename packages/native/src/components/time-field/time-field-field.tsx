import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { useTimeField } from './time-field.context'
import type { TimeFieldFieldProps } from './time-field.type'

/**
 * The box, masked.
 *
 * It **is** `TextField.Field` — the same node, the same resolved styles, the same focus
 * plumbing, the same `isInvalid` — with the value and the keystroke taken over by the mask.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, which is what lets
 * `TimeField.Period` sit on the trailing edge without the digits running under it.
 */
export const TimeFieldField = forwardRef<TextInput, TimeFieldFieldProps>(
  function TimeFieldField({ placeholder, style, ...props }, ref) {
    const { text, onType, placeholder: shape, length } = useTimeField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    return (
      <TextFieldField
        ref={ref}
        // A time is digits and a colon, and a full keyboard offers neither of them first.
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={length}
        placeholder={placeholder ?? shape}
        {...props}
        // After the caller's, and deliberately: these two are the mask. The prop type
        // already says so — this is what makes it true.
        value={text}
        onChangeText={onType}
        style={[padding, style]}
      />
    )
  }
)

TimeFieldField.displayName = 'XAUI.TimeField.Field'
