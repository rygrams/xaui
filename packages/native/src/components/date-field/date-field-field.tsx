import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { DATE_LENGTH } from '../../utils/date-mask'
import { useDateField } from './date-field.context'
import type { DateFieldFieldProps } from './date-field.type'

/**
 * The box, masked.
 *
 * It **is** `TextField.Field` — the same node, the same resolved styles, the same focus
 * plumbing, the same `isInvalid` — with the value and the keystroke taken over by the mask.
 * Everything else a `TextInput` accepts is still the caller's.
 *
 * `maxLength` is the shape's own length rather than a guess: the mask already refuses a
 * ninth digit, and the limit here is what stops the caret travelling past the end of a
 * finished date on a keyboard that would otherwise let it.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, exactly as `FieldGroup.Field`
 * does — which is what lets `DateField.Trigger` sit on the trailing edge without the text
 * running under it. Outside one there is nothing to clear and it adds nothing.
 */
export const DateFieldField = forwardRef<TextInput, DateFieldFieldProps>(
  function DateFieldField({ placeholder, style, ...props }, ref) {
    const { text, onType, placeholder: shape } = useDateField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    return (
      <TextFieldField
        ref={ref}
        // A date is digits and two marks, and a full keyboard offers neither of them first.
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={DATE_LENGTH}
        placeholder={placeholder ?? shape}
        {...props}
        // After the caller's, and deliberately: these two are the mask, and a `value` or an
        // `onChangeText` from outside would be writing into the middle of it. The prop type
        // already says so — this is what makes it true.
        value={text}
        onChangeText={onType}
        style={[padding, style]}
      />
    )
  }
)

DateFieldField.displayName = 'XAUI.DateField.Field'
