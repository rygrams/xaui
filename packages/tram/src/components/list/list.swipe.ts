import { rowSwipe } from '../../motion/motion-tokens'

/**
 * The way a row opens, as a sign along the x axis: toward the start, so its actions —
 * held at the end — come out from under it. -1 left to right, 1 in RTL.
 */
export type SwipeSide = -1 | 1

/**
 * Where a row lies once a finger has dragged it `travel` points from `start`: toward its
 * actions, never the other way past closed, and past its whole `span` a third as fast.
 */
export function swipeOffset(
  start: number,
  travel: number,
  span: number,
  side: SwipeSide
): number {
  'worklet'
  const along = (start + travel) * side

  if (along <= 0) return 0
  if (along <= span) return along * side

  return (span + (along - span) / rowSwipe.rubber) * side
}

/**
 * Where a released row settles: open, its whole `span` out, or closed at 0. A fling
 * decides first, either way; short of one, it is past half the actions or it is not.
 */
export function swipeRest(
  offset: number,
  velocity: number,
  span: number,
  side: SwipeSide
): number {
  'worklet'
  if (span <= 0) return 0

  const speed = velocity * side

  if (speed > rowSwipe.velocity) return span * side
  if (speed < -rowSwipe.velocity) return 0

  return offset * side > span * rowSwipe.distance ? span * side : 0
}
