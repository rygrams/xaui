/**
 * The mark of a Tram selection control — the checkbox's square, the radio's dot — sits
 * inside a lined frame and arrives on a spring. The arithmetic the two share is here,
 * apart from the views. The worklets run in the animated style.
 *
 * `presence` is how far the mark has come in, 0 to 1 — a spring, so it passes 1 on the
 * way in, which is the bounce, and would pass 0 on the way out.
 */

/** The three numbers of the drawing the mark depends on. */
export type MarkGeometry = {
  /** The frame's outer side, or its diameter. */
  box: number
  /** The frame's line. */
  line: number
  /** From the inside of the line to the mark. */
  inset: number
}

export function clamp(value: number, min: number, max: number): number {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

/** The side of the mark: the frame, less its line and the inset, on both sides. */
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
