import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerPreviewProps } from './color-picker.type'

/**
 * The chip that shows the answer: a flat square of the chosen colour at the start of the
 * field, the box's height less 20. `ColorPicker.Field` draws one when left empty.
 *
 * It is a `View`, not a control — the field around it is what opens the page.
 *
 * **Empty, it is a line of 2 in the grey** rather than an absent node: a chip that
 * appeared only once a colour was chosen would push the name sideways the first time.
 */
export const ColorPickerPreview = forwardRef<View, ColorPickerPreviewProps>(
  function ColorPickerPreview({ color, style, ...props }, ref) {
    const { value, previewStyle, previewEmptyStyle } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    const shown = color ?? value

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[
          previewStyle,
          // After the context's, which already carries the chosen colour: a `color`
          // written here is the caller's and wins.
          color ? { backgroundColor: color } : undefined,
          shown ? undefined : previewEmptyStyle,
          styleProps,
          style,
        ]}
      />
    )
  }
)

ColorPickerPreview.displayName = 'XAUI.Tram.ColorPicker.Preview'
