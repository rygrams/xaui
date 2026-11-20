import { areaPath, linePath } from '@xaui/native/system'
import type { Curve, Point } from '@xaui/native/system'

export type AreaShape = {
  /** The series' own edge. */
  top: ReadonlyArray<Point>
  /**
   * The edge of the series under it, in a stack. Unset, the fill runs down to `baseline`
   * — the lowest series of a stack, or every series of an overlaid chart.
   */
  lower?: ReadonlyArray<Point>
  baseline: number
  curve: Curve
}

/**
 * The fill of one series, as an SVG `d`.
 *
 * In a stack it is the **band between two edges**, not a fill down to the axis: the fill is
 * flat at a fifth of the colour, and five stacked fills each running to the axis would
 * pile up into a dark floor under the lowest one. The band runs along the series' edge,
 * then back along the edge under it — the same curve read the other way, which a monotone
 * cubic draws identically.
 */
export function areaShape({ top, lower, baseline, curve }: AreaShape): string {
  if (lower === undefined) return areaPath(top, baseline, curve)

  const forward = linePath(top, curve)
  const back = linePath([...lower].reverse(), curve)
  if (forward === '' || back === '') return ''

  return `${forward} L${back.slice(1)} Z`
}
