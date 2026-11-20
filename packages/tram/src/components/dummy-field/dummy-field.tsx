import { forwardRef, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { colorOf } from '../../system/style-values'
import { TextFieldRoot } from '../text-field'
import { DummyFieldProvider } from './dummy-field.context'
import { DEFAULT_SIZE, dummyFieldRecipe } from './dummy-field.recipe'
import type { DummyFieldProps } from './dummy-field.type'

/**
 * A field that is pressed rather than typed into — the Native `DummyField`'s API, in the
 * Tram `TextField`'s box. It opens what sets the value: a sheet, a picker, a page.
 *
 * ```tsx
 * <DummyField onPress={openSlots}>
 *   <DummyField.Label>livraison</DummyField.Label>
 *   <DummyField.Field placeholder="choisir un créneau">{slot}</DummyField.Field>
 *   <DummyField.Description>touchez pour changer de créneau.</DummyField.Description>
 * </DummyField>
 *
 * <DummyField onPress={openCalendar} isInvalid={!day}>
 *   <DummyField.Label>date</DummyField.Label>
 *   <DummyField.Field>
 *     <DummyField.Value placeholder="choisir une date">{day}</DummyField.Value>
 *     <DummyField.Indicator />
 *   </DummyField.Field>
 *   <DummyField.Error>une date, s'il vous plaît.</DummyField.Error>
 * </DummyField>
 * ```
 *
 * **It is a `TextField`.** The root below is the Tram `TextField`'s, unchanged, and
 * `DummyField.Description` and `.Error` **are** its slots; `Label` is its label, which
 * presses the field instead of focusing an input. Only the field differs: a box that shows
 * a value and takes a press.
 *
 * **Under the finger the line takes the accent**, as a `TextField`'s does with the focus
 * and a `Select`'s with its list open, and gives it back on release. The box does not move.
 */
export const DummyFieldRoot = forwardRef<View, DummyFieldProps>(function DummyField(
  { onPress, size = DEFAULT_SIZE, isDisabled = false, children, ...props },
  ref
) {
  const theme = useXAUITheme()

  const styles = dummyFieldRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const context = useMemo(() => {
    const indicator = StyleSheet.flatten<TextStyle>(styles.indicator)

    return {
      rowStyle: styles.field,
      valueStyle: styles.value,
      glyph: { size: indicator.fontSize, color: colorOf(indicator, 'color') },
      onPress,
    }
  }, [styles, onPress])

  return (
    <DummyFieldProvider value={context}>
      <TextFieldRoot ref={ref} size={size} isDisabled={isDisabled} {...props}>
        {children}
      </TextFieldRoot>
    </DummyFieldProvider>
  )
})

DummyFieldRoot.displayName = 'XAUI.Tram.DummyField.Root'
