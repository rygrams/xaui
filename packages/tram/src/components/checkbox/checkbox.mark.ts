/**
 * The mark of a Tram checkbox is a square inside the square, and the arithmetic of how it
 * arrives is here, apart from the views. The worklets run in the animated style.
 *
 * `presence` is how far the mark has come in, 0 to 1 — a spring, so it passes 1 on the
 * way in, which is the bounce, and would pass 0 on the way out. `flatness` is how far the
 * square has become the bar of the third state.
 */

/** The three numbers of the drawing the mark depends on. */
export type MarkGeometry = {
  /** The box's outer side. */
  box: number
  /** The box's line. */
  line: number
  /** From the inside of the line to the mark. */
  inset: number
}

function clamp(value: number, min: number, max: number): number {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

/** The side of the square mark: the box, less its line and the inset, on both sides. */
export function markSide(geometry: MarkGeometry): number {
  'worklet'
  return Math.max(geometry.box - 2 * geometry.line - 2 * geometry.inset, 0)
}

/** The mark's scale. It follows the spring past 1 and stops at 0: gone is gone. */
export function markScale(presence: number): number {
  'worklet'
  return Math.max(presence, 0)
}

/** The mark's opacity, for when it fades in instead of growing. */
export function markOpacity(presence: number): number {
  'worklet'
  return clamp(presence, 0, 1)
}

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
