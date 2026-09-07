/**
 * Declared before it is used, not after.
 *
 * A `'worklet'` function is rewritten by Reanimated's plugin into a `const` binding, which
 * is *not* hoisted the way the `function` it was written as would be — so a helper defined
 * at the foot of a file that a worklet above it calls throws on the first frame.
 */
function clamp(value: number, low: number, high: number): number {
  'worklet'

  return Math.min(Math.max(value, low), high)
}

/** What a carousel's track measures, once its own width is known. */
export type CarouselMetrics = {
  /** How wide one slide is. */
  itemWidth: number
  /** How far one step travels — a slide plus the gap after it. This is the snap interval. */
  step: number
  /** Between two slides. The same number the caller gave, kept here so nothing recomputes it. */
  gap: number
  /**
   * The empty run at each end of the track.
   *
   * It is what makes the first and last slides sit where the middle ones do: without it a
   * carousel that peeks would show its first slide flush against the edge and every other
   * one inset, and the snap points would be right for one of those and wrong for the other.
   */
  inset: number
}

export type CarouselMetricsOptions = {
  /** The track's own width, measured. */
  width: number
  /** How many whole slides are in view at once. */
  itemsPerView: number
  /** Between two slides. */
  gap: number
  /** How much of the neighbouring slide shows at each edge. Zero for a full-width carousel. */
  peek: number
}

/**
 * The slide width and the snap interval a track of this width implies.
 *
 * ```
 * ├ peek ┼ gap ┼──── item ────┼ gap ┼──── item ────┼ gap ┼ peek ┤
 * ```
 *
 * The peek is a *sight* of the next slide, so it brings a gap of its own with it — the run
 * it costs at each edge is `peek + gap`, not `peek`. Without that second term the peeking
 * neighbour would touch the slide in view, and a carousel whose slides touch reads as one
 * wide image that has been cut.
 *
 * Everything is clamped at zero: a width smaller than what the gaps and the peeks already
 * claim asks for a negative slide, and a negative width renders as nothing at all rather
 * than as the too-small thing the caller could have seen and fixed.
 */
export function carouselMetrics({
  width,
  itemsPerView,
  gap,
  peek,
}: CarouselMetricsOptions): CarouselMetrics {
  const perView = Math.max(1, Math.floor(itemsPerView))
  const inset = peek > 0 ? peek + gap : 0
  const between = gap * (perView - 1)
  const itemWidth = Math.max(0, (width - 2 * inset - between) / perView)

  return { itemWidth, step: itemWidth + gap, gap, inset }
}

/**
 * Which slide a scroll offset has landed on.
 *
 * Rounded, not floored: the slide the track is *nearest* to is the one it will snap to, and
 * an indicator that waits for the halfway point to pass lags a drag the reader can see.
 */
export function indexFromOffset(
  offset: number,
  step: number,
  count: number
): number {
  'worklet'

  if (step <= 0 || count <= 0) return 0

  return clamp(Math.round(offset / step), 0, count - 1)
}

/**
 * The same thing unrounded — where the track is *between* two slides.
 *
 * This is what an indicator that follows the drag reads: 1.4 means forty percent of the way
 * from the second dot to the third, and the pill is stretched across both.
 */
export function progressFromOffset(
  offset: number,
  step: number,
  count: number
): number {
  'worklet'

  if (step <= 0 || count <= 0) return 0

  return clamp(offset / step, 0, count - 1)
}

/**
 * The slide `delta` steps away, wrapping or stopping at the ends.
 *
 * `delta` rather than a target, because both callers are arrows: the whole question is what
 * "the next one" means at the last slide, and the answer is the `hasLoop` branch here rather
 * than a check written twice.
 */
export function stepIndex(
  index: number,
  delta: number,
  count: number,
  hasLoop: boolean
): number {
  if (count <= 0) return 0

  const next = index + delta
  // `%` keeps the sign of its left operand in JS, so stepping back from the first slide
  // gives −1 rather than the last one. The second modulo is what fixes that.
  if (hasLoop) return ((next % count) + count) % count

  return clamp(next, 0, count - 1)
}
