import { forwardRef, useCallback } from 'react'
import type { TextInput } from 'react-native'
import { useTramMotion } from '../../motion/use-tram-motion'
import { TextFieldField, useTextField } from '../text-field'
import type { FieldBlurEvent, FieldFocusEvent } from '../text-field'
import { useNumberField, useOptionalNumberFieldGroup } from './number-field.context'
import type { NumberFieldFieldProps } from './number-field.type'

/**
 * The box, read as a number. It **is** `TextField.Field` — the same node, the same focus
 * plumbing, the same `isInvalid` — with the value and the keystroke taken over by the
 * parse. `keyboardType` stays the caller's: the pad below is a guess.
 *
 * Inside `NumberField.Group` it gives up its own line, centres the value in tabular
 * figures, and hands the focus to the box, whose line moves instead. On its own it is a
 * plain Tram field.
 */
export const NumberFieldField = forwardRef<TextInput, NumberFieldFieldProps>(
  function NumberFieldField(
    { keyboardType, onFocus, onBlur, style, ...props },
    ref
  ) {
    const { text, onType, onEditStart, onEditEnd, keyboard, groupFieldStyle } =
      useNumberField()
    const { isStill } = useTextField()
    const group = useOptionalNumberFieldGroup()
    const animate = useTramMotion()

    const moveFocus = useCallback(
      (to: number) => {
        if (!group) return
        group.focus.value = isStill ? to : animate(to, 'navigation')
      },
      [group, isStill, animate]
    )

    // Composed, never replaced: a caller's `onFocus` runs, and the swap between the two
    // representations still happens.
    const handleFocus = useCallback(
      (event: FieldFocusEvent) => {
        onEditStart()
        moveFocus(1)
        onFocus?.(event)
      },
      [onEditStart, moveFocus, onFocus]
    )

    const handleBlur = useCallback(
      (event: FieldBlurEvent) => {
        onEditEnd()
        moveFocus(0)
        onBlur?.(event)
      },
      [onEditEnd, moveFocus, onBlur]
    )

    return (
      <TextFieldField
        ref={ref}
        keyboardType={keyboardType ?? keyboard}
        {...props}
        // After the caller's, deliberately: these two are the parse.
        value={text}
        onChangeText={onType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[group ? groupFieldStyle : undefined, style]}
      />
    )
  }
)

NumberFieldField.displayName = 'XAUI.Tram.NumberField.Field'
