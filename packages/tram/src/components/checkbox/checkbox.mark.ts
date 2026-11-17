import { clamp, markSide } from '../../system/selection-mark'
import type { MarkGeometry } from '../../system/selection-mark'

/**
 * What the checkbox's mark has that the radio's dot does not: the bar of the third state,
 * and the rule a press follows. The arrival they share is `system/selection-mark`.
 *
 * `flatness` is how far the square has become the bar.
 */

/**
 * The mark's vertical scale: 1 as a square, and as the bar of the third state the share
 * of its height that two line widths are.
 */
export function barScale(flatness: number, geometry: MarkGeometry): number {
  'worklet'
  const side = markSide(geometry)
  if (side === 0) return 1

  const bar = Math.min((2 * geometry.line) / side, 1)

  return 1 + (bar - 1) * clamp(flatness, 0, 1)
}

/**
 * What a press makes of the state. The third state resolves to selected rather than
 * toggling — "some of these" is reported by a control, never picked by a person.
 */
export function nextSelected(
  isSelected: boolean,
  isIndeterminate: boolean
): boolean {
  return isIndeterminate ? true : !isSelected
}
