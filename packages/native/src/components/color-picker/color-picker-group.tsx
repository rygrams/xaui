import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerGroupProps } from './color-picker.type'

/**
 * One hue's row, with its name above it.
 *
 * ```tsx
 * <ColorPicker.Group name="Brand">
 *   <ColorPicker.Swatch color="#7c3aed" />
 *   <ColorPicker.Swatch color="#0ea5e9" />
 * </ColorPicker.Group>
 * ```
 *
 * `ColorPicker.Grid` builds one of these per group in the palette; written by hand it is
 * how a picker offers a set of its own — a brand row, the last colours used — with or
 * without the grid under it.
 *
 * The row **wraps** rather than scrolling sideways: a ramp that ran off the edge would hide
 * its dark end behind a gesture, and a swatch nobody scrolls to is a swatch nobody picks.
 */
export const ColorPickerGroup = forwardRef<View, ColorPickerGroupProps>(
  function ColorPickerGroup({ name, children, style, ...props }, ref) {
    const { groupStyle, groupLabelStyle, swatchesStyle } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    // R3 — a string name is the label's text; an element is the label itself.
    const text = childrenToString(name)

    return (
      <View ref={ref} {...rest} style={[groupStyle, styleProps, style]}>
        {text !== null ? <Text style={groupLabelStyle}>{text}</Text> : name}
        <View style={swatchesStyle}>{children}</View>
      </View>
    )
  }
)

ColorPickerGroup.displayName = 'XAUI.ColorPicker.Group'
