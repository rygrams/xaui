import { forwardRef, useId, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StyleProp, TextStyle, TextStyle as RNTextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TextFieldProvider } from '../text-field/text-field.context'
import type { TextFieldContextValue } from '../text-field/text-field.type'
import { DummyFieldProvider } from './dummy-field.context'
import { dummyFieldRecipe } from './dummy-field.recipe'
import type { DummyFieldProps } from './dummy-field.type'

// Stable identity: published in the bridged `TextField` context, where a focus report has
// nothing to report to.
const noop = () => {}

/**
 * A dummy text field, styled identically to a text input but non-editable and pressable.
 * Designed as a trigger for sheets, modals, dialogs and custom pickers, or for displaying
 * read-only values in form rows.
 *
 * ```tsx
 * <DummyField onPress={openCountryPicker}>
 *   <DummyField.Label>Pays</DummyField.Label>
 *   <DummyField.Field placeholder="Choisir un pays">
 *     {selectedCountry}
 *   </DummyField.Field>
 *   <DummyField.Description>Votre pays de résidence fiscale.</DummyField.Description>
 * </DummyField>
 *
 * <DummyField variant="primary" size="lg" onPress={openCalendar}>
 *   <DummyField.Label>Date de rendez-vous</DummyField.Label>
 *   <DummyField.Field>
 *     <DummyField.Value placeholder="Sélectionner une date">
 *       {formattedDate}
 *     </DummyField.Value>
 *     <DummyField.Indicator />
 *   </DummyField.Field>
 * </DummyField>
 * ```
 *
 * **The root is the column, not the field.** `DummyField.Field` is the pressable box,
 * which is what keeps the label, the box, and the hint as slots of one component rather
 * than separate items a form must keep in sync.
 */
export const DummyFieldRoot = forwardRef<View, DummyFieldProps>(function DummyField(
  {
    children,
    variant = 'secondary',
    size = 'md',
    radius,
    labelPlacement = 'outside',
    color,
    isInvalid = false,
    isDisabled = false,
    onPress,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

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

  const styles = dummyFieldRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })

  const pressed = dummyFieldRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })

  const tint = color
    ? dummyFieldRecipe.tint({
        theme,
        color,
        selection,
        states: { disabled: isDisabled },
      })
    : undefined

  const context = useMemo(() => {
    const indicator = StyleSheet.flatten<TextStyle>(styles.indicator)
    const glyph = {
      size: indicator.fontSize,
      color: typeof indicator.color === 'string' ? indicator.color : undefined,
    }

    return {
      fieldStyle: tint ? [styles.field, tint.field] : styles.field,
      fieldPressedStyle: pressed.field,
      valueStyle: tint ? [styles.value, tint.value] : styles.value,
      placeholderStyle: styles.placeholder,
      indicatorStyle: styles.indicator,
      glyph,
      labelStyle: styles.label,
      descriptionStyle: styles.description,
      errorStyle: styles.error,
      labelId,
      descriptionId,
      isDisabled,
      isInvalid,
      onPress,
    }
  }, [styles, pressed, tint, labelId, descriptionId, isDisabled, isInvalid, onPress])

  // A `FieldGroup` resolves its decorators against the `TextField`'s context, and a dummy
  // field is a field all the same — so the root publishes that context too, carrying the
  // entries a group reads (`prefixStyle`, `suffixStyle`, `icon`, `isDisabled`) plus the
  // dummy field's own label and help styles. The input-facing entries are inert: the field
  // node under this root is `DummyField.Field`, never `TextField.Field`, so nothing can
  // reach them. Cast confined to `fieldStyle` — the same box, typed for an input the dummy
  // field does not have.
  const textFieldContext = useMemo<TextFieldContextValue>(() => {
    const icon = StyleSheet.flatten<RNTextStyle>(styles.icon)
    const placeholder = StyleSheet.flatten<RNTextStyle>(styles.placeholder)

    return {
      labelStyle: styles.label,
      fieldStyle: styles.field as StyleProp<TextStyle>,
      textAreaStyle: [],
      textArea: { lineHeight: 0, paddingVertical: 0 },
      descriptionStyle: styles.description,
      errorStyle: styles.error,
      prefixStyle: styles.prefix,
      suffixStyle: styles.suffix,
      icon: {
        size: icon.fontSize,
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      placeholderTextColor:
        typeof placeholder.color === 'string' ? placeholder.color : undefined,
      onFieldFocus: noop,
      onFieldBlur: noop,
      labelId,
      descriptionId,
      isDisabled,
      isInvalid,
    }
  }, [styles, labelId, descriptionId, isDisabled, isInvalid])

  const rootStyle = [styles.root, tint?.root, styleProps, style]

  const surface = asChild ? (
    <Slot ref={ref} {...rest} style={rootStyle}>
      {children}
    </Slot>
  ) : (
    <View ref={ref} {...rest} style={rootStyle}>
      {children}
    </View>
  )

  return (
    <TextFieldProvider value={textFieldContext}>
      <DummyFieldProvider value={context}>{surface}</DummyFieldProvider>
    </TextFieldProvider>
  )
})

DummyFieldRoot.displayName = 'XAUI.DummyField.Root'
