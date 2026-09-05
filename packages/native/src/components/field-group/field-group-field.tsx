import { forwardRef, useMemo } from 'react'
import { TextInput } from 'react-native'
import { TextFieldField } from '../text-field'
import { useFieldGroup } from './field-group.context'
import { decoratorPadding } from './field-group.utils'
import type { FieldGroupFieldProps } from './field-group.type'

/**
 * The `TextInput` itself — `TextField.Field` with the room the two decorators need.
 *
 * ```tsx
 * <FieldGroup.Field value={query} onChangeText={setQuery} placeholder="Rechercher…" />
 * ```
 *
 * It renders the `TextField`'s field rather than a second `TextInput`, so the focus plumbing,
 * the placeholder colour, the label association, `isInvalid` and `isDisabled` are the ones
 * already written, and every `TextInput` prop is written here for the same reason it is
 * there.
 *
 * The padding is arithmetic rather than a token, the way `TextArea`'s height is: a
 * decorator's width is not knowable before layout, so it measures itself and this turns
 * the two numbers into `paddingStart` and `paddingEnd`. They land **after** the recipe's
 * own `paddingHorizontal`, which is what makes them win, and before the caller's `style`,
 * which still has the last word.
 */
export const FieldGroupField = forwardRef<TextInput, FieldGroupFieldProps>(
  function FieldGroupField({ style, ...props }, ref) {
    const { prefixWidth, suffixWidth } = useFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(prefixWidth, suffixWidth),
      [prefixWidth, suffixWidth]
    )

    return <TextFieldField ref={ref} {...props} style={[padding, style]} />
  }
)

FieldGroupField.displayName = 'XAUI.FieldGroup.Field'
