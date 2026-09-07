import { forwardRef, useCallback, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { TextFieldField } from '../text-field'
import type { FieldBlurEvent, FieldFocusEvent } from '../text-field'
import { useNumberField } from './number-field.context'
import type { NumberFieldFieldProps } from './number-field.type'

/**
 * The box, read as a number.
 *
 * It **is** `TextField.Field` — the same node, the same resolved styles, the same focus
 * plumbing, the same `isInvalid` — with the value and the keystroke taken over by the
 * parse. Everything else a `TextInput` accepts is still the caller's, `keyboardType`
 * included: the pad below is a guess from the step and the format, and a field that has to
 * take a minus sign needs a keyboard with one on it.
 *
 * Focus is where the two representations swap. On the way in the value is rewritten
 * plainly, so the grouping and the currency mark are not in the reader's way; on the way
 * out it is parsed, clamped and written back out formatted.
 *
 * Inside a `FieldGroup` it leaves the decorators their room, exactly as `FieldGroup.Field`
 * does — which is how the two steppers get theirs. Outside one there is nothing to clear
 * and it adds nothing.
 */
export const NumberFieldField = forwardRef<TextInput, NumberFieldFieldProps>(
  function NumberFieldField(
    { keyboardType, onFocus, onBlur, style, ...props },
    ref
  ) {
    const { text, onType, onEditStart, onEditEnd, keyboard } = useNumberField()
    const group = useOptionalFieldGroup()

    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    // Composed, never replaced: a caller's `onFocus` runs, and the swap between the two
    // representations still happens.
    const handleFocus = useCallback(
      (event: FieldFocusEvent) => {
        onEditStart()
        onFocus?.(event)
      },
      [onEditStart, onFocus]
    )

    const handleBlur = useCallback(
      (event: FieldBlurEvent) => {
        onEditEnd()
        onBlur?.(event)
      },
      [onEditEnd, onBlur]
    )

    return (
      <TextFieldField
        ref={ref}
        keyboardType={keyboardType ?? keyboard}
        {...props}
        // After the caller's, and deliberately: these two are the parse, and a `value` or
        // an `onChangeText` from outside would be writing into the middle of it. The prop
        // type already says so — this is what makes it true.
        value={text}
        onChangeText={onType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[padding, style]}
      />
    )
  }
)

NumberFieldField.displayName = 'XAUI.NumberField.Field'
