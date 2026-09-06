import type { FontSizeKey } from '../../theme/theme.type'
import type { WheelPickerSize } from './wheel-picker.type'

/**
 * A row's height and the type in it, in points.
 *
 * Off the spacing grid, like the `Slider`'s rail: how tall a row has to be before a list
 * of them reads as a wheel you can aim at has nothing to do with the gaps between things.
 * `md` is iOS's picker row measured — 36 points, which is what puts five of them in the
 * 180 the platform's own wheel is.
 */
export const ROWS: Record<WheelPickerSize, { height: number; type: FontSizeKey }> = {
  sm: { height: 32, type: 'sm' },
  md: { height: 36, type: 'md' },
  lg: { height: 44, type: 'lg' },
}

/** Five, and the shape of the argument: an odd number, so one row is the middle one. */
const DEFAULT_VISIBLE = 5
const MIN_VISIBLE = 3

export type WheelGeometry = {
  rowHeight: number
  /** Always odd, always at least three. */
  visibleCount: number
  /** Empty rows above the first and below the last, so either can reach the middle. */
  padding: number
  /** The wheel's own height: every visible row, and nothing else. */
  height: number
}

/**
 * The wheel's measurements, from the ladder and the one raw number a caller gives.
 *
 * `visibleCount` is **forced odd**, because the whole control is built on there being a
 * middle row: an even count has two rows equally near the centre, and the band would sit
 * over the seam between them. Rounding up rather than down keeps a caller who asked for
 * four from getting three — they wanted more, not less.
 *
 * Everything else falls out of it. The padding is what lets the first and last rows reach
 * the middle: without it a wheel would stop with its first row at the top, where the band
 * is not.
 */
export function wheelGeometry(
  size: WheelPickerSize,
  visibleCount = DEFAULT_VISIBLE
): WheelGeometry {
  const rowHeight = ROWS[size].height
  const requested = Number.isFinite(visibleCount)
    ? Math.max(Math.round(visibleCount), MIN_VISIBLE)
    : DEFAULT_VISIBLE
  const odd = requested % 2 === 0 ? requested + 1 : requested

  return {
    rowHeight,
    visibleCount: odd,
    padding: (rowHeight * (odd - 1)) / 2,
    height: rowHeight * odd,
  }
}

/**
 * Which row the wheel has come to rest on, from where it stopped.
 *
 * Clamped, because a bounce past either end reports an offset outside the content and
 * `Math.round` would hand back an index that is not a row — which is a crash on the array
 * and, worse, a silent `undefined` value on the way out.
 */
export function indexFromOffset(
  offset: number,
  rowHeight: number,
  count: number
): number {
  if (count <= 0 || rowHeight <= 0) return 0

  return Math.min(Math.max(Math.round(offset / rowHeight), 0), count - 1)
}
