import { forwardRef } from 'react'
import type { TextInput } from 'react-native'
import { TextFieldField } from '../text-field'
import { useFieldInGroup } from './field-group.hook'
import type { FieldGroupFieldProps } from './field-group.type'

/**
 * The `TextInput` itself — `TextField.Field`, standing in the box between the two cells.
 *
 * ```tsx
 * <FieldGroup.Field value={query} onChangeText={setQuery} placeholder="rechercher" />
 * ```
 *
 * It renders the `TextField`'s field rather than a second `TextInput`, so the focus
 * plumbing, the placeholder, the label association, `isInvalid` and `isDisabled` are the
 * ones already written. In the box it gives up its own line and hands the focus to the box,
 * whose line moves instead. The caller's `style` still has the last word.
 */
export const FieldGroupField = forwardRef<TextInput, FieldGroupFieldProps>(
  function FieldGroupField({ style, onFocus, onBlur, ...props }, ref) {
    const grouped = useFieldInGroup({ onFocus, onBlur })

    return (
      <TextFieldField
        ref={ref}
        {...props}
        onFocus={grouped.onFocus}
        onBlur={grouped.onBlur}
        style={[grouped.style, style]}
      />
    )
  }
)

FieldGroupField.displayName = 'XAUI.Tram.FieldGroup.Field'
