import { forwardRef, useCallback } from 'react'
import { TextInput } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInput } from './input.context'
import type { FieldBlurEvent, FieldFocusEvent, InputFieldProps } from './input.type'

/**
 * The `TextInput` itself — the one node of this component that the user types into.
 *
 * ```tsx
 * <Input.Field value={email} onChangeText={setEmail} placeholder="nom@exemple.fr" />
 * ```
 *
 * It takes everything `TextInput` takes, which is why `value`, `defaultValue`, `onChange`,
 * `keyboardType`, `secureTextEntry`, `autoComplete` and `multiline` are written here and
 * not on the root. There is no `type`: that is an HTML prop, and React Native splits it
 * into `inputMode`, `keyboardType`, `secureTextEntry` and `autoComplete`.
 *
 * What it does *not* take is `editable`: that is `disabled` under another name, and R8
 * keeps it off the public surface — `isDisabled` on the root is what stops the field.
 *
 * It reports focus up rather than styling it (R5): the root's recipe resolves on the
 * focus state, so the root owns it and this composes the caller's handlers into the two
 * the context published.
 */
export const InputField = forwardRef<TextInput, InputFieldProps>(function InputField(
  { style, onFocus, onBlur, placeholderTextColor, ...props },
  ref
) {
  const {
    fieldStyle,
    placeholderTextColor: resolvedPlaceholder,
    onFieldFocus,
    onFieldBlur,
    labelId,
    descriptionId,
    isDisabled,
    isInvalid,
  } = useInput()
  const [styleProps, rest] = useStyleProps(props)

  // Composed, never replaced: a caller's `onFocus` runs, and the focus state its own
  // border depends on still happens.
  const handleFocus = useCallback(
    (event: FieldFocusEvent) => {
      onFieldFocus(event)
      onFocus?.(event)
    },
    [onFieldFocus, onFocus]
  )

  const handleBlur = useCallback(
    (event: FieldBlurEvent) => {
      onFieldBlur(event)
      onBlur?.(event)
    },
    [onFieldBlur, onBlur]
  )

  return (
    <TextInput
      ref={ref}
      // The label names the field and the description explains it, so a screen reader
      // reads both instead of falling back to whatever the placeholder happens to say.
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      aria-invalid={isInvalid}
      editable={!isDisabled}
      accessibilityState={{ disabled: isDisabled }}
      placeholderTextColor={placeholderTextColor ?? resolvedPlaceholder}
      {...rest}
      style={[fieldStyle, styleProps, style]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
})

InputField.displayName = 'XAUI.Input.Field'
