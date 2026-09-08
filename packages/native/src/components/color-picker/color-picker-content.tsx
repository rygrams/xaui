import { forwardRef } from 'react'
import type { View } from 'react-native'
import { DialogContent } from '../dialog'
import { useStyleProps } from '../../system/style-props'
import { ColorPickerGrid } from './color-picker-grid'
import { ColorPickerProvider, useColorPicker } from './color-picker.context'
import { colorPickerSheet } from './color-picker.style'
import type { ColorPickerContentProps } from './color-picker.type'

/**
 * The dialog the field opens, and the grid inside it.
 *
 * With no children it is the grid alone — the title is the caller's, because only they know
 * what language to write it in. `ColorPicker.Title` and `ColorPicker.Close` are the two
 * pieces to build a header from.
 *
 * **Writing it is what mounts a dialog.** A picker composed as a bare grid never renders
 * this slot, and then there is no portal, no backdrop and nothing to open — which is the
 * whole of the difference between the two arrangements.
 */
export const ColorPickerContent = forwardRef<View, ColorPickerContentProps>(
  function ColorPickerContent({ children, style, ...props }, ref) {
    // Read above the portal and put back below it: `Dialog.Content` copies its children into
    // the host, and a React context does not travel with them. The dialog puts its own back
    // on the far side; the picker's has to be put back beside it, or the grid would throw
    // looking for it.
    const context = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <DialogContent
        ref={ref}
        {...rest}
        // The panel gives before the screen does: a palette taller than the dialog has to
        // shrink so the grid inside it can scroll, rather than running off both ends.
        style={[colorPickerSheet.panel, styleProps, style]}
      >
        <ColorPickerProvider value={context}>
          {children ?? <ColorPickerGrid />}
        </ColorPickerProvider>
      </DialogContent>
    )
  }
)

ColorPickerContent.displayName = 'XAUI.ColorPicker.Content'
