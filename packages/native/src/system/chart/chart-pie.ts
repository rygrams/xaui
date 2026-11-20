import { arcPath } from './chart-path'

const FULL_TURN = Math.PI * 2

/** The hole stops short of the rim: past this a donut is a hairline. */
const MAX_INNER = 0.95

/** The widest gap, in degrees. Past it the slices are mostly ground. */
const MAX_GAP = 20

/** What a slice thinner than the gap keeps, in radians, so a real row never vanishes. */
const HAIRLINE = 1e-4

/** What a pie is asked to draw, before anything is clamped. */
export type PieBox = {
  /** The quantities, in row order. A negative or non-numeric share counts as nothing. */
  values: ReadonlyArray<number>
  /** The square the ring is drawn in. */
  diameter: number
  /**
   * The hole, as a fraction of the radius — so it stays in proportion at every size. Held
   * within [0, 0.95].
   */
  innerRadius: number
  /** The gap between two slices, in degrees. Held within [0, 20]. */
  gap: number
}

/**
 * Each row's slice as an SVG `d`, clockwise from twelve o'clock — one per value, in order.
 *
 * **The gap is drawn, not stroked.** Each slice is shortened by half the gap at either end,
 * so the ring's ground shows through between them — a stroke would sit on top of the slice
 * and read as an outline. Half at either end means the seam where the last slice meets the
 * first loses the same amount as every other pair.
 *
 * A slice thinner than the gap would be drawn inside out, so it keeps a hairline instead: a
 * row with a real value should not disappear. A pie of nothing — an empty list, or every
 * share zero or negative — has no slices at all.
 */
export function pieSlices({ values, diameter, innerRadius, gap }: PieBox): string[] {
  const shares = values.map(value =>
    // A negative share is a slice of less than nothing, and clamping is what keeps one
    // from eating the ring in the other direction.
    Number.isFinite(value) && value > 0 ? value : 0
  )
  const total = shares.reduce((sum, value) => sum + value, 0)
  if (total === 0 || diameter <= 0) return []

  const radius = diameter / 2
  const inner = radius * Math.min(Math.max(innerRadius, 0), MAX_INNER)
  const half = (Math.min(Math.max(gap, 0), MAX_GAP) * Math.PI) / 180 / 2

  let angle = 0

  return shares.map(value => {
    const sweep = (value / total) * FULL_TURN
    const start = angle
    angle += sweep

    const inset = Math.min(half, sweep / 2 - HAIRLINE)

    return arcPath({
      cx: radius,
      cy: radius,
      outerRadius: radius,
      innerRadius: inner,
      startAngle: start + inset,
      endAngle: start + sweep - inset,
    })
  })
}
