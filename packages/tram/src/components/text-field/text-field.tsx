import { forwardRef, useId, useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextInput, TextStyle } from 'react-native'
import { Slot, useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { lineInk } from '../../system/line-ink'
import { touchReach } from '../../system/touch-reach'
import { TextFieldProvider } from './text-field.context'
import { DEFAULT_SIZE, textFieldRecipe } from './text-field.recipe'
import type { TextFieldProps } from './text-field.type'

/** `ColorValue` also covers the platform's opaque colours, which cannot be mixed. */
function colorOf(
  style: TextStyle,
  key: 'color' | 'borderColor'
): string | undefined {
  const value = style[key]

  return typeof value === 'string' ? value : undefined
}

/**
 * A text field with its label, its hint and its error — the Native `TextField`'s API,
 * drawn in Metro: the ground inside a line of ink, and the line in the accent once the
 * field has the focus.
 *
 * ```tsx
 * <TextField>
 *   <TextField.Label>courriel</TextField.Label>
 *   <TextField.Field value={email} onChangeText={setEmail} keyboardType="email-address" />
 *   <TextField.Description>on ne le partage jamais.</TextField.Description>
 * </TextField>
 *
 * <TextField isInvalid={Boolean(error)} accent="lime">
 *   <TextField.Label>mot de passe</TextField.Label>
 *   <TextField.Field secureTextEntry />
 *   {error ? <TextField.Error>{error}</TextField.Error> : null}
 * </TextField>
 * ```
 *
 * The root is the column, not the field: `TextField.Field` is the `TextInput`, and takes
 * its props. A touch on the label gives the field the focus.
 */
export const TextFieldRoot = forwardRef<View, TextFieldProps>(function TextField(
  {
    children,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isInvalid = false,
    isDisabled = false,
    isRequired = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const isStill = useAnimationDisabled()
  const fieldRef = useRef<TextInput>(null)

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const selection = {
    size,
    radius,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }
  const states = { disabled: isDisabled }

  const styles = textFieldRecipe.resolve({ theme, selection, states })
  // A border in the accent is a line, so a named accent is its ink on the ground. Dropped
  // while invalid or disabled: neither state has an accent left to show.
  const ink =
    isInvalid || isDisabled
      ? undefined
      : lineInk({ accent, color }, theme.colors.background)

  const reach = touchReach(theme.controlHeights[size])

  const context = useMemo(() => {
    const field = StyleSheet.flatten<TextStyle>(styles.field)
    const focus = StyleSheet.flatten<TextStyle>(styles.focus)
    const placeholder = StyleSheet.flatten<TextStyle>(styles.placeholder)
    const atRest = colorOf(field, 'borderColor') ?? theme.colors.fieldBorder

    return {
      labelStyle: styles.label,
      fieldStyle: styles.field,
      descriptionStyle: styles.description,
      errorStyle: styles.error,
      placeholderTextColor: colorOf(placeholder, 'color'),
      border: {
        rest: atRest,
        focus: ink ?? colorOf(focus, 'borderColor') ?? atRest,
      },
      reach,
      fieldRef,
      labelId,
      descriptionId,
      errorId,
      isDisabled,
      isInvalid,
      isRequired,
      isStill,
    }
  }, [
    styles,
    theme,
    ink,
    reach,
    labelId,
    descriptionId,
    errorId,
    isDisabled,
    isInvalid,
    isRequired,
    isStill,
  ])

  // Under `asChild` the caller's element is the column: `Slot` merges these into it. No
  // role on it either way — the control is the field inside.
  const Root = asChild ? Slot : View

  return (
    <TextFieldProvider value={context}>
      {/* Most general to most specific: the cached recipe, the style props, `style`. */}
      <Root ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </Root>
    </TextFieldProvider>
  )
})

TextFieldRoot.displayName = 'XAUI.Tram.TextField.Root'
