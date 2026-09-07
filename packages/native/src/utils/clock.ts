/** A point on the dial, in the view's own coordinates. */
export type ClockPoint = { x: number; y: number }

const FULL_TURN = 360
const RIGHT_ANGLE = 90

/**
 * Where a value sits on the dial, in degrees **clockwise from twelve o'clock**.
 *
 * The quarter turn is baked in here rather than at every call site, for `polarPoint`'s
 * reason: a clock's first mark is at the top, and so is a reader's eye.
 *
 * `count` is how many marks go all the way round — 12 for the hours, 60 for the minutes —
 * and the value wraps, so hour 12 and hour 0 are the same place.
 */
export function clockAngle(value: number, count: number): number {
  if (count <= 0) return 0

  const turns = ((value % count) + count) % count

  return (turns / count) * FULL_TURN
}

/**
 * The mark nearest that angle — the inverse, rounded.
 *
 * Rounded rather than floored: a finger halfway between two marks belongs to the one it is
 * nearer, and a dial that always rounded down would feel like it lagged the touch by half a
 * step.
 */
export function valueAtAngle(angle: number, count: number): number {
  if (count <= 0) return 0

  const turns = ((angle % FULL_TURN) + FULL_TURN) % FULL_TURN

  return Math.round((turns / FULL_TURN) * count) % count
}

/**
 * A point at `angle` on a circle, **clockwise from twelve o'clock**.
 *
 * Screen coordinates grow downwards, which is why the cosine is subtracted rather than
 * added: twelve o'clock is *above* the centre, and a plus there puts it below.
 */
export function clockPoint(
  center: ClockPoint,
  radius: number,
  angle: number
): ClockPoint {
  const radians = (angle * Math.PI) / 180

  return {
    x: center.x + radius * Math.sin(radians),
    y: center.y - radius * Math.cos(radians),
  }
}

/**
 * Which way a point lies from the centre, in the same degrees `clockAngle` speaks.
 *
 * `atan2` measures from three o'clock and anticlockwise; the quarter turn and the sign here
 * are what turn that into "clockwise from twelve", so a touch anywhere on the dial can be
 * compared against a mark without either side knowing about the other's convention.
 */
export function angleAtPoint(center: ClockPoint, point: ClockPoint): number {
  const degrees =
    (Math.atan2(point.y - center.y, point.x - center.x) * 180) / Math.PI

  return (((degrees + RIGHT_ANGLE) % FULL_TURN) + FULL_TURN) % FULL_TURN
}

/**
 * How far a point is from the centre, for a dial with two rings.
 *
 * A twenty-four hour clock writes 1–12 on the outside and 13–00 on the inside, and which
 * ring a touch landed on is the only thing that tells them apart.
 */
export function distanceFrom(center: ClockPoint, point: ClockPoint): number {
  return Math.hypot(point.x - center.x, point.y - center.y)
}
