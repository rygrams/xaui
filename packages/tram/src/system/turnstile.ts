import { turnstile } from '../motion/motion-tokens'

/** A `transformOrigin`: across, down, and depth. */
export type Hinge = [string | number, string, number]

/**
 * The angle of a box turning on the screen's start edge, for a `turn` between -1 and 1:
 * flat at 0; at 1 turned away the way a page leaves forward, its far side going into the
 * screen; at -1 turned the other way, where what arrives waits. Mirrored in a
 * right-to-left layout. Degrees.
 *
 * In `system/` since its second use: the `Page` turns the whole screen with it, the
 * `JumpList` its keys and the header it lands on.
 */
export function turnstileAngle(turn: number, isRtl: boolean): number {
  'worklet'
  const side = Math.max(-1, Math.min(1, turn))

  return side * turnstile.degrees * (isRtl ? -1 : 1)
}

/** Where a box is hinged to turn on its own start edge, half-way down. */
export function hingeFor(isRtl: boolean): Hinge {
  return [isRtl ? '100%' : 0, '50%', 0]
}

/**
 * Where a box `width` across is hinged to turn on an edge `inset` points before its own
 * start edge — the screen's, for a key `inset` from it — so that every box of a screen
 * turns around the same line. `transformOrigin` is measured from the box's physical
 * left, which in a right-to-left layout is its end.
 */
export function hingeAt(inset: number, width: number, isRtl: boolean): Hinge {
  'worklet'
  // `0 - inset`, not `-inset`: no inset is the box's own edge, 0 and not -0.
  return [isRtl ? width + inset : 0 - inset, '50%', 0]
}
