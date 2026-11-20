import { pieSlices } from '@xaui/native/system'
import type { PieBox } from '@xaui/native/system'

function isPart(value: number): boolean {
  return Number.isFinite(value) && value > 0
}

/**
 * Native's `pieSlices`, with two Tram rules on top:
 *
 * - **A row of nothing has no slice.** Native keeps a hairline for it at the seam, which on
 *   a flat ring reads as a stray tick.
 * - **A sole part takes no gap**: a gap separates two slices, and a whole with one part in
 *   it is drawn as a whole ring rather than one with a notch at twelve o'clock.
 */
export function drawnSlices(box: PieBox): string[] {
  const parts = box.values.filter(isPart).length
  const slices = pieSlices(parts > 1 ? box : { ...box, gap: 0 })

  return slices.map((d, index) => (isPart(box.values[index]) ? d : ''))
}
