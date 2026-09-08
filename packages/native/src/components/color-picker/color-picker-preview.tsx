import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerPreviewProps } from './color-picker.type'

/**
 * The chip that shows the answer:
 *
 * ```tsx
 * <FieldGroup.Prefix isDecorative>
 *   <ColorPicker.Preview />
 * </FieldGroup.Prefix>
 * ```
 *
 * It is a `View` and not a control — the field around it is what opens the dialog, and a
 * second target inside that field would be a press that does the same thing from half a
 * centimetre away. Mark the decorator `isDecorative` so the chip hands its touches down.
 *
 * **Empty, it is a dashed outline** rather than an absent node: a field whose chip appears
 * only once a colour is chosen shifts its text sideways the first time it is used, and the
 * dash is what says the slot is waiting for an answer.
 */
export const ColorPickerPreview = forwardRef<View, ColorPickerPreviewProps>(
  function ColorPickerPreview({ color, style, ...props }, ref) {
    const { value, previewStyle, previewEmptyStyle } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    const shown = color ?? value

    return (
      <View
        ref={ref}
        {...rest}
        style={[
          previewStyle,
          // After the context's, because that one already carries the chosen colour: a
          // `color` written here is the caller's and has to win over it.
          color ? { backgroundColor: color } : undefined,
          shown ? undefined : previewEmptyStyle,
          styleProps,
          style,
        ]}
      />
    )
  }
)

ColorPickerPreview.displayName = 'XAUI.ColorPicker.Preview'
