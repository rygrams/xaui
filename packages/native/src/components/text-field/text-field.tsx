import { forwardRef, useCallback, useId, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TextFieldProvider } from './text-field.context'
import { textFieldRecipe } from './text-field.recipe'
import type { TextFieldProps } from './text-field.type'

/**
 * A text field, with the label, the hint and the error that make it usable.
 *
 * ```tsx
 * <TextField>
 *   <TextField.Label>Courriel</TextField.Label>
 *   <TextField.Field
 *     value={email}
 *     onChangeText={setEmail}
 *     placeholder="nom@exemple.fr"
 *     keyboardType="email-address"
 *   />
 *   <TextField.Description>On ne le partage jamais.</TextField.Description>
 * </TextField>
 *
 * <TextField isInvalid={Boolean(error)}>
 *   <TextField.Label>Mot de passe</TextField.Label>
 *   <TextField.Field secureTextEntry value={password} onChangeText={setPassword} />
 *   {error ? <TextField.Error>{error}</TextField.Error> : null}
 * </TextField>
 * ```
 *
 * **The root is the column, not the field.** `TextField.Field` is the `TextInput`, which is
 * what makes the label, the hint and the error slots of one component rather than three
 * components a form has to keep in step — and it is why `TextInputProps` are on the field
 * rather than on the root.
 *
 * There is no auto-wrap here (R3): a string child of an input is not a label, a value or
 * a placeholder in any way the component could guess.
 */
export const TextFieldRoot = forwardRef<View, TextFieldProps>(function TextField(
  {
    children,
    variant,
    size,
    radius,
    labelPlacement,
    color,
    isInvalid = false,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14 — what is left is `View`'s own props plus whatever style keys the caller wrote.
  const [styleProps, rest] = useStyleProps(props)

  // The focus state is the root's because the recipe resolves on it (R5), even though the
  // node that hears the event is `TextField.Field`. The two handlers below are what the field
  // reports back through; they never change identity, so publishing them in the context
  // costs nothing.
  const [isFocused, setIsFocused] = useState(false)
  const onFieldFocus = useCallback(() => setIsFocused(true), [])
  const onFieldBlur = useCallback(() => setIsFocused(false), [])

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const selection = {
    variant,
    size,
    radius,
    labelPlacement,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }
  // Focus is suppressed while the field is invalid rather than ordered against it: states
  // apply after every axis, so a focused invalid field would otherwise lose its red
  // border to the focus colour. An error outranks focus — the field should read as wrong,
  // not as busy.
  const states = { focused: isFocused && !isInvalid, disabled: isDisabled }

  const styles = textFieldRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? textFieldRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(() => {
    const placeholder = StyleSheet.flatten<TextStyle>(styles.placeholder)
    // `size` and `color` are props an icon component takes, not styles it accepts, so the
    // slot is flattened here rather than in every decorator on the screen.
    const icon = StyleSheet.flatten<TextStyle>(styles.icon)
    // `rows` is a raw value, so the height it implies is arithmetic `TextField.TextArea` does.
    // Flattened once here rather than in every text area on the screen.
    const textArea = StyleSheet.flatten<TextStyle>(styles.textArea)

    return {
      labelStyle: tint ? [styles.label, tint.label] : styles.label,
      fieldStyle: tint ? [styles.field, tint.field] : styles.field,
      textAreaStyle: styles.textArea,
      textArea: {
        lineHeight: textArea.lineHeight ?? 0,
        // `DimensionValue` also covers a percentage and `auto`, neither of which can be
        // multiplied by a number of rows. The recipe only ever writes points here.
        paddingVertical:
          typeof textArea.paddingBottom === 'number' ? textArea.paddingBottom : 0,
      },
      descriptionStyle: styles.description,
      errorStyle: styles.error,
      prefixStyle: styles.prefix,
      suffixStyle: styles.suffix,
      icon: {
        size: icon.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which an icon component
        // takes as a `string` and nothing else.
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      // `ColorValue` also covers the platform's opaque colours, which `TextInput` cannot
      // take for a placeholder.
      placeholderTextColor:
        typeof placeholder.color === 'string' ? placeholder.color : undefined,
      onFieldFocus,
      onFieldBlur,
      labelId,
      descriptionId,
      isDisabled,
      isInvalid,
    }
  }, [
    styles,
    tint,
    onFieldFocus,
    onFieldBlur,
    labelId,
    descriptionId,
    isDisabled,
    isInvalid,
  ])

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // No `accessibilityRole` on the wrapper: the control is the field inside it, and a role
  // here would give a screen reader a second element to stop on before reaching it.
  const surface = asChild ? (
    // R12 — the caller's element *is* the column.
    <Slot ref={ref} {...rest} style={rootStyle}>
      {children}
    </Slot>
  ) : (
    <View ref={ref} {...rest} style={rootStyle}>
      {children}
    </View>
  )

  return <TextFieldProvider value={context}>{surface}</TextFieldProvider>
})

TextFieldRoot.displayName = 'XAUI.TextField.Root'
