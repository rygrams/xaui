import { forwardRef } from 'react'
import type { View } from 'react-native'
import { DummyFieldField } from '../dummy-field'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerFieldProps } from './color-picker.type'

/**
 * The box that opens the dialog.
 *
 * It **is** `DummyField.Field` — the same node, the same press feedback, the same
 * `isInvalid`, the same `FieldGroup` decorators — with one default filled in: the value it
 * reads is the chosen colour, in upper case, because a hex is a code rather than a word and
 * `#EF4444` is the form every design tool writes.
 *
 * `value` overrides it, which is the case for a field that would rather name the colour
 * than spell it.
 */
export const ColorPickerField = forwardRef<View, ColorPickerFieldProps>(
  function ColorPickerField({ value, ...props }, ref) {
    const { value: chosen } = useColorPicker()

    return (
      <DummyFieldField ref={ref} value={value ?? chosen?.toUpperCase()} {...props} />
    )
  }
)

ColorPickerField.displayName = 'XAUI.ColorPicker.Field'
