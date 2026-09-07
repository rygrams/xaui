import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import { useMaskField } from './mask-field.context'
import type { MaskFieldFieldProps } from './mask-field.type'

/**
 * The box, masked.
 *
 * It **is** `TextField.Field` — the same node, the same resolved styles, the same focus
 * plumbing, the same `isInvalid` — with the value and the keystroke taken over by the mask.
 * Everything else a `TextInput` accepts is still the caller's.
 *
 * `keyboardType` and `maxLength` follow the shape: a digit shape gets the number pad, a
 * shape with letters gets the default keyboard, and the limit is the shape's own rendered
 * length — what stops the caret travelling past the end of a finished value on a keyboard
 * that would otherwise let it.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, exactly as `FieldGroup.Field`
 * does. Outside one there is nothing to clear and it adds nothing.
 */
export const MaskFieldField = forwardRef<TextInput, MaskFieldFieldProps>(
  function MaskFieldField({ placeholder, style, ...props }, ref) {
    const { text, onType, placeholder: shape, keyboard, length } = useMaskField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    return (
      <TextFieldField
        ref={ref}
        keyboardType={keyboard}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={length}
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

MaskFieldField.displayName = 'XAUI.MaskField.Field'
