import type { TextStyle, ViewStyle } from 'react-native'
import type { TramSize } from '../../theme/tram-tokens'
import { pointsOf } from '../../system/style-values'
import type { CellInsets } from './field-group.type'

/**
 * What the box takes from the `TextField`'s field style: the line's width, the corner,
 * the ground and the height. The field inside then draws none of them — its line and its
 * height are the box's — and keeps its type and its padding.
 *
 * `innerHeight` is the box's height less its line, top and bottom: what the field and the
 * cells stand in. `inset` is the field's own padding, which a cell keeps off the box's end.
 */
export function boxFromField(field: TextStyle): {
  box: ViewStyle
  innerHeight: number
  inset: number
} {
  const line = pointsOf(field.borderWidth)

  return {
    box: {
      borderWidth: field.borderWidth,
      borderRadius: field.borderRadius,
      backgroundColor: field.backgroundColor,
      minHeight: field.minHeight,
    },
    innerHeight: Math.max(0, pointsOf(field.minHeight) - line * 2),
    inset: pointsOf(field.paddingHorizontal),
  }
}

/**
 * How a cell is inset. A **decorative** mark stands off the box's end by the field's padding
 * and leans on the text, which keeps its own padding between them: the glyph and the text
 * read as one line. A **control** is a key of its own — padded on both sides, then ruled off
 * from the text, as the `NumberField`'s steppers are.
 *
 * `start` and `end`, never `left` and `right`: the prefix is the leading end in both
 * directions of writing.
 */
export function cellInsets(inset: number): CellInsets {
  return {
    prefix: {
      decorative: { paddingStart: inset },
      control: { paddingStart: inset, paddingEnd: inset },
    },
    suffix: {
      decorative: { paddingEnd: inset },
      control: { paddingStart: inset, paddingEnd: inset },
    },
  }
}

/**
 * The size a box of `height` points was drawn at: the control height it is nearest to.
 * The group has no `size` of its own — it is the `TextField`'s — so the glyph reads it back
 * off the box.
 */
export function sizeAtHeight(
  height: number,
  heights: Record<TramSize, number>
): TramSize {
  const sizes = Object.keys(heights) as TramSize[]

  return sizes.reduce((nearest, size) =>
    Math.abs(heights[size] - height) < Math.abs(heights[nearest] - height)
      ? size
      : nearest
  )
}
