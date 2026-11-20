import { Children, forwardRef, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { cascadeRank } from '../../system/list-picker'
import { SwatchRankContext, useColorPicker } from './color-picker.context'
import { MOSAIC_COLUMNS, rowsOf, sameColor } from './color-picker.utils'
import type { ColorPickerGroupProps } from './color-picker.type'

/** The colour a child offers, when it is a swatch-like element. */
function colorOf(child: ReactNode): string | undefined {
  if (!isValidElement<{ color?: unknown }>(child)) return undefined
  const { color } = child.props

  return typeof color === 'string' ? color : undefined
}

/**
 * A set of swatches, under a heading of its own.
 *
 * ```tsx
 * <ColorPicker.Group name="récentes">
 *   <ColorPicker.Swatch color="#0050EF" name="cobalt" />
 *   <ColorPicker.Swatch color="#D80073" name="magenta" />
 * </ColorPicker.Group>
 * ```
 *
 * Under `ramps` the swatches stand one under the other, a row each. Under `mosaic` they
 * are laid in rows of five that share the width, 2 apart — the last row short, its
 * squares the size of the others'. The heading is a `caption` in the grey, above them.
 *
 * It hands each swatch its turn in the page's cascade: the chosen one first, the others
 * in the order they are written.
 */
export const ColorPickerGroup = forwardRef<View, ColorPickerGroupProps>(
  function ColorPickerGroup({ name, children, style, ...props }, ref) {
    const {
      value,
      layout,
      groupStyle,
      groupLabelStyle,
      swatchesStyle,
      mosaicRowStyle,
      cellStyle,
    } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    // R3 — a string name is the heading's text; an element is the heading itself.
    const text = childrenToString(name)

    const swatches = Children.toArray(children)
    const current = swatches.findIndex(child => {
      const color = colorOf(child)
      return color !== undefined && sameColor(value, color)
    })
    const ranked = swatches.map((child, index) => (
      <SwatchRankContext.Provider
        key={isValidElement(child) && child.key !== null ? child.key : index}
        value={cascadeRank(index, current)}
      >
        {child}
      </SwatchRankContext.Provider>
    ))

    const laid =
      layout === 'mosaic'
        ? rowsOf(ranked, MOSAIC_COLUMNS).map((row, rowIndex) => (
            <View key={rowIndex} style={mosaicRowStyle}>
              {row.map(cell => (
                <View key={cell.key} style={cellStyle}>
                  {cell}
                </View>
              ))}
              {/* A short row keeps the squares' size: the cells it lacks are empty. */}
              {Array.from({ length: MOSAIC_COLUMNS - row.length }, (_, gap) => (
                <View key={`gap-${gap}`} style={cellStyle} />
              ))}
            </View>
          ))
        : ranked

    return (
      <View ref={ref} {...rest} style={[groupStyle, styleProps, style]}>
        {text !== null ? (
          <Text accessibilityRole="header" numberOfLines={1} style={groupLabelStyle}>
            {text}
          </Text>
        ) : isValidElement(name) ? (
          name
        ) : null}
        <View style={swatchesStyle}>{laid}</View>
      </View>
    )
  }
)

ColorPickerGroup.displayName = 'XAUI.Tram.ColorPicker.Group'
