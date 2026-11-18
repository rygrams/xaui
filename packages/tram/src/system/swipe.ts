import type { Point } from './tilt'

/** The axis a gesture took: across the screen, or along it. */
export type SwipeAxis = 'x' | 'y'

/** What a release is judged on, both counted toward the way out. */
export type SwipeRelease = {
  /** Points travelled. Negative is the wrong way. */
  distance: number
  /** Points a second. */
  velocity: number
}

export type SwipeThreshold = { distance: number; velocity: number }

/**
 * The axis a gesture has taken, or `null` while the finger is still within `slop` of where
 * it landed. The larger travel wins and a diagonal is read as across — and once taken, an
 * axis is kept: the caller stops asking.
 */
export function swipeAxis(travel: Point, slop: number): SwipeAxis | null {
  'worklet'
  const across = Math.abs(travel.x)
  const along = Math.abs(travel.y)

  if (Math.max(across, along) < slop) return null

  return across >= along ? 'x' : 'y'
}

/** How far the thing follows a finger: all the way toward the way out, not at all back. */
export function swipeTravel(distance: number): number {
  'worklet'
  return Math.max(0, distance)
}

/**
 * Whether a release sends the thing away. It has to have gone the right way; then far
 * enough **or** fast enough is enough.
 */
export function shouldDismiss(
  release: SwipeRelease,
  threshold: SwipeThreshold
): boolean {
  'worklet'
  if (release.distance <= 0) return false

  return (
    release.distance > threshold.distance || release.velocity > threshold.velocity
  )
}
