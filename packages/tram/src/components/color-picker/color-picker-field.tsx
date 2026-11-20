import { forwardRef } from 'react'
import type { View } from 'react-native'
import {
  DummyFieldField,
  DummyFieldIndicator,
  DummyFieldValue,
} from '../dummy-field'
import { ColorPickerPreview } from './color-picker-preview'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerFieldProps } from './color-picker.type'

/**
 * The box that opens the page.
 *
 * It **is** `DummyField.Field` — the same box, its line of 2 that takes the accent under
 * the finger, the same `isInvalid` — with its row filled in when left empty: the chip of
 * the chosen colour, the colour's name, and the `Select`'s chevron.
 *
 * The name is the swatch's in the palette ("cobalt", "violet 600"), or the hex in upper
 * case for a colour the palette does not hold. `value` replaces it; children replace the
 * whole row — `ColorPicker.Preview`, `DummyField.Value` and `DummyField.Indicator` are
 * the pieces it is made of.
 *
 * **The chip is inside the box**, where Native's sits in a `FieldGroup.Prefix`: the Tram
 * `FieldGroup` decorates a field that is typed into, and this one is pressed.
 */
export const ColorPickerField = forwardRef<View, ColorPickerFieldProps>(
  function ColorPickerField(
    { value, placeholder, asChild = false, children, ...props },
    ref
  ) {
    const { value: chosen, nameOf } = useColorPicker()

    const shown = value ?? (chosen === undefined ? undefined : nameOf(chosen))

    return (
      <DummyFieldField
        ref={ref}
        asChild={asChild}
        placeholder={placeholder}
        value={shown}
        {...props}
      >
        {asChild || children !== undefined ? (
          children
        ) : (
          <>
            <ColorPickerPreview />
            <DummyFieldValue placeholder={placeholder}>{shown}</DummyFieldValue>
            <DummyFieldIndicator />
          </>
        )}
      </DummyFieldField>
    )
  }
)

ColorPickerField.displayName = 'XAUI.Tram.ColorPicker.Field'
