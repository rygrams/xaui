/**
 * The indicator's arithmetic and the arrows' place, apart from the views that draw them.
 * The two square functions are worklets: they run in the squares' animated styles, on the
 * UI thread, every frame of a drag.
 */

/** The glide target when no programmatic move is in flight. */
export const NO_TARGET = -1

/**
 * How much square `index` is the chosen one while the track is at `progress` — 1 on its
 * own slide, 0 a whole slide away or more, linear between.
 *
 * A triangle, so a square takes width exactly as fast as its neighbour gives it up: the
 * row's total width never changes mid-travel and the squares either side do not shuffle.
 */
export function squareNearness(progress: number, index: number): number {
  'worklet'
  return Math.max(0, 1 - Math.abs(progress - index))
}

/**
 * A square of side `size`, stretched by `nearness` into the bar: its own side plus two
 * more at most, so the chosen one reads as a bar three squares long.
 */
export function barWidth(size: number, nearness: number): number {
  'worklet'
  return size + 2 * size * Math.min(1, Math.max(0, nearness))
}

/**
 * Where an arrow of side `key` sits so its middle is the track's. Zero until the track
 * has been measured, which puts the arrow at the top for one frame and nowhere wrong
 * after it; never negative, for a track shorter than the arrow.
 */
export function arrowTop(trackHeight: number, key: number): number {
  return Math.max(0, (trackHeight - key) / 2)
}
