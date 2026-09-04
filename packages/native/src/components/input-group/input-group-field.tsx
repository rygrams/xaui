import { forwardRef, useMemo } from 'react'
import { TextInput } from 'react-native'
import { InputField } from '../input'
import { useInputGroup } from './input-group.context'
import { decoratorPadding } from './input-group.utils'
import type { InputGroupFieldProps } from './input-group.type'

/**
 * The `TextInput` itself — `Input.Field` with the room the two decorators need.
 *
 * ```tsx
 * <InputGroup.Field value={query} onChangeText={setQuery} placeholder="Rechercher…" />
 * ```
 *
 * It renders the `Input`'s field rather than a second `TextInput`, so the focus plumbing,
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
export const InputGroupField = forwardRef<TextInput, InputGroupFieldProps>(
  function InputGroupField({ style, ...props }, ref) {
    const { prefixWidth, suffixWidth } = useInputGroup()

    const padding = useMemo(
      () => decoratorPadding(prefixWidth, suffixWidth),
      [prefixWidth, suffixWidth]
    )

    return <InputField ref={ref} {...props} style={[padding, style]} />
  }
)

InputGroupField.displayName = 'XAUI.InputGroup.Field'
