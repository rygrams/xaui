import { forwardRef } from 'react'
import { ScrollView } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { ColorPickerGroup } from './color-picker-group'
import { ColorPickerSwatch } from './color-picker-swatch'
import { useColorPicker } from './color-picker.context'
import { swatchName } from './color-picker.utils'
import type { ColorPickerGridProps } from './color-picker.type'

/**
 * The palette.
 *
 * ```tsx
 * <ColorPicker.Grid />                      // on the page
 * <ColorPicker.Grid scrollEnabled={false} /> // on a screen, inside your own scroller
 * ```
 *
 * It draws the root's `colors` — the twenty Tram accents by default — as the root's
 * `layout` says: the WP7 list, a row per colour with its name, or the WP8 grid of squares
 * five to a row. `children` replace them outright: compose `ColorPicker.Group` and
 * `ColorPicker.Swatch` for a palette of your own.
 *
 * **It is a `ScrollView`**, because its ordinary home is the page and twenty rows are
 * taller than one screen. Inside a scroller of your own, pass `scrollEnabled={false}`.
 * **The whole grid is the radio group**: a reader chooses one colour out of the palette.
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
        showsVerticalScrollIndicator={false}
        {...rest}
        // The gap between two groups is the content's — a `gap` on a `ScrollView` itself
        // lays out nothing.
        contentContainerStyle={[gridStyle, contentContainerStyle]}
        style={[styleProps, style]}
      >
        {children ??
          colors.map((group, index) => (
            // A mosaic has no names, the groups' no more than the swatches'.
            <ColorPickerGroup
              key={group.name ?? index}
              name={layout === 'mosaic' ? undefined : group.name}
            >
              {group.swatches.map(swatch => (
                <ColorPickerSwatch
                  key={swatch.value}
                  color={swatch.value}
                  name={swatchName(group, swatch)}
                />
              ))}
            </ColorPickerGroup>
          ))}
      </ScrollView>
    )
  }
)

ColorPickerGrid.displayName = 'XAUI.Tram.ColorPicker.Grid'
