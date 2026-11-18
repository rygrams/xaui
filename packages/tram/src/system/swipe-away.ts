import { swipe, swivel } from '../motion/motion-tokens'

/** As much of the turn as a banner that may not be dismissed gives to the finger. */
const HELD_MOST = swipe.resist / Math.abs(swivel.degrees)

/**
 * How flat a banner lies under a finger that moved `dy` points — 1 flat, 0 edge-on. The
 * angle is in proportion to the way up: a finger that climbed the banner's whole `height`
 * has turned it edge-on. Downward it does not move. A banner at the bottom leaves the
 * other way: its caller hands `dy` and the speed with their sign turned. A banner that is `isHeld` — it may
 * not be dismissed — follows over a few degrees and stops there.
 */
export function swipeTurn(dy: number, height: number, isHeld = false): number {
  'worklet'
  if (height <= 0 || dy >= 0) return 1

  const climbed = Math.min(-dy / height, 1)

  return 1 - climbed * (isHeld ? HELD_MOST : 1)
}

/**
 * Whether a banner released at `turn`, the finger moving at `velocityY` points a second,
 * goes on to leave: turned far enough, or flung upward fast enough. Otherwise it comes
 * back flat.
 */
export function swipeLeaves(turn: number, velocityY: number): boolean {
  'worklet'
  return turn <= 1 - swipe.distance || velocityY <= -swipe.velocity
}

/**
 * How much of its dimming the ground behind keeps while the banner lies at `turn`: it
 * lightens at the banner's own pace, and a spring that carries the banner past flat does
 * not darken it further.
 */
export function swipeDim(turn: number): number {
  'worklet'
  return Math.min(1, Math.max(0, turn))
}
