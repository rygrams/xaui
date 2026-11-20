import { channels, isHex } from '../../theme/on-accent'
import type { ColorGroup, ColorSwatch } from './color-picker.type'

/** How many squares a `mosaic` row holds: the Windows Phone 8 accents grid. */
export const MOSAIC_COLUMNS = 5

/**
 * Whether two colours are the same colour, rather than the same string.
 *
 * `#ABC`, `#abc` and `#aabbcc` are one colour written three ways, and a picker comparing
 * strings would mark nothing chosen for a caller who wrote their default in upper case.
 * Only hex is read; anything else — a name, an `rgb()` — is compared as written.
 */
export function sameColor(value: string | undefined, color: string): boolean {
  if (value === undefined) return false
  if (!isHex(value) || !isHex(color)) return value === color

  const [first, second] = [channels(value), channels(color)]

  return first.every((channel, index) => channel === second[index])
}

/** A swatch's name: the group's and its own, "violet 600" — or its own, in a nameless group. */
export function swatchName(group: ColorGroup, swatch: ColorSwatch): string {
  return group.name ? `${group.name} ${swatch.shade}` : swatch.shade
}

/**
 * What the field shows for `color`: the name of the swatch that offers it, the first one
 * if several do, or — for a colour the palette does not hold — its hex, upper-cased as
 * Native's field writes it.
 */
export function colorName(colors: readonly ColorGroup[], color: string): string {
  for (const group of colors) {
    const swatch = group.swatches.find(item => sameColor(color, item.value))
    if (swatch) return swatchName(group, swatch)
  }

  return color.toUpperCase()
}

/**
 * `items` in rows of `size`, the last one short. A `mosaic` lays each row out on its own,
 * so the squares of a row share its width and a short last row keeps their size.
 */
export function rowsOf<T>(items: readonly T[], size: number): T[][] {
  if (size < 1)
    throw new Error(`Tram ColorPicker: a row holds at least one item, not ${size}.`)

  const rows: T[][] = []
  for (let start = 0; start < items.length; start += size) {
    rows.push(items.slice(start, start + size))
  }

  return rows
}
