import { forwardRef } from 'react'
import { ScrollView } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { ColorPickerGroup } from './color-picker-group'
import { ColorPickerSwatch } from './color-picker-swatch'
import { useColorPicker } from './color-picker.context'
import { colorPickerSheet } from './color-picker.style'
import type { ColorPickerGridProps } from './color-picker.type'

/**
 * The palette: one row per hue, eight steps each.
 *
 * ```tsx
 * <ColorPicker.Grid />                      // inside a dialog
 * <ColorPicker.Grid scrollEnabled={false} /> // on a page, inside your own scroller
 * ```
 *
 * It draws the root's `colors`, which default to `TAILWIND_PALETTE`. `children` replace
 * them outright — compose `ColorPicker.Group` and `ColorPicker.Swatch` for a palette of
 * your own, or put a row of recent colours above the rest.
 *
 * **It is a `ScrollView`**, because its ordinary home is a dialog and eighteen ramps are
 * taller than one. Inside a scroller of your own that is one too many: pass
 * `scrollEnabled={false}` and it lays out as a plain column.
 *
 * **The whole grid is the radio group**, not each row: a reader chooses one colour out of
 * the palette, and rows are how it is arranged rather than what is being asked.
 *
 * Under `layout="mosaic"` it draws the same ramps with their names withheld, which is what
 * lets the rows close up into one block of colour.
 */
export const ColorPickerGrid = forwardRef<ScrollView, ColorPickerGridProps>(
  function ColorPickerGrid(
    {
      children,
      accessibilityRole = 'radiogroup',
      contentContainerStyle,
      style,
      ...props
    },
    ref
  ) {
    const { colors, layout, gridStyle } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <ScrollView
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        // The gap between two ramps is the content's, not the scroller's — a `gap` on a
        // `ScrollView` itself lays out nothing.
        contentContainerStyle={[gridStyle, contentContainerStyle]}
        // The grid gives before the screen does, so a palette taller than the dialog
        // scrolls inside it rather than running off both ends.
        style={[colorPickerSheet.grid, styleProps, style]}
      >
        {children ??
          colors.map(group => (
            // A mosaic has no names — that is what lets its rows close up — and the group
            // renders no label when it is given none.
            <ColorPickerGroup
              key={group.name}
              name={layout === 'mosaic' ? undefined : group.name}
            >
              {group.swatches.map(swatch => (
                <ColorPickerSwatch
                  key={swatch.value}
                  color={swatch.value}
                  accessibilityLabel={`${group.name} ${swatch.shade}`}
                />
              ))}
            </ColorPickerGroup>
          ))}
      </ScrollView>
    )
  }
)

ColorPickerGrid.displayName = 'XAUI.ColorPicker.Grid'
