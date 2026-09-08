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
    // The whole value, not a rest of it: the provider below re-publishes it across the
    // portal, and a fresh object every render would re-render every slot under it.
    const context = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <DialogContent
        ref={ref}
        {...rest}
        // The `Dialog`'s five steps of padding, then this component's: a panel of colour
        // wants less chrome than a panel of prose. Then the ceiling, and the shrink that
        // lets the grid inside scroll once the panel has reached it.
        style={[context.contentStyle, colorPickerSheet.panel, styleProps, style]}
      >
        <ColorPickerProvider value={context}>
          {children ?? <ColorPickerGrid />}
        </ColorPickerProvider>
      </DialogContent>
    )
  }
)

ColorPickerContent.displayName = 'XAUI.ColorPicker.Content'
