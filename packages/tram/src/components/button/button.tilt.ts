import { tilt } from '../../motion/motion-tokens'

export type Point = { x: number; y: number }
export type Box = { width: number; height: number }

/** Degrees, for `rotateX` and `rotateY`. */
export type Lean = { rotateX: number; rotateY: number }

const FLAT: Lean = { rotateX: 0, rotateY: 0 }

function clamp(value: number): number {
  return Math.min(1, Math.max(-1, value))
}

/**
 * How far a box leans when pressed at `touch`, measured from its own top-start corner.
 * The centre does not lean at all — it only shrinks — and an edge leans the most, toward
 * the finger: a touch on the end side turns the box around its vertical axis, a touch at
 * the top around its horizontal one.
 *
 * A box not yet measured stays flat rather than dividing by zero.
 */
export function leanFor(touch: Point, box: Box): Lean {
  if (box.width <= 0 || box.height <= 0) return FLAT

  const across = clamp((touch.x / box.width - 0.5) * 2)
  const down = clamp((touch.y / box.height - 0.5) * 2)
  const degrees = box.width > tilt.wideFrom ? tilt.wideDegrees : tilt.degrees

  return { rotateX: -down * degrees, rotateY: across * degrees }
}
