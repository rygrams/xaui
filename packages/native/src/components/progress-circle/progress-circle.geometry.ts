import type { ProgressCircleSize } from './progress-circle.type'

/**
 * The ring's outer diameter and the thickness of its stroke, in points.
 *
 * Bigger than the `Spinner`'s ladder at every step, and that is the difference between the
 * two: a spinner says "wait" and a progress circle says how long, which means it usually
 * has a number written in the middle of it. `sm` is the one that does not, and it is the
 * step where this reads as a spinner that happens to be honest.
 */
export const SIZES: Record<
  ProgressCircleSize,
  { diameter: number; stroke: number }
> = {
  sm: { diameter: 32, stroke: 3 },
  md: { diameter: 48, stroke: 4 },
  lg: { diameter: 64, stroke: 5 },
}

export type CircleGeometry = {
  /** The box the ring is drawn in — the stroke is centred on the path, so it fits. */
  diameter: number
  /** The path's radius: half the box, less half the stroke. */
  radius: number
  strokeWidth: number
  /** How long the path is, and therefore what a dash offset is measured against. */
  circumference: number
}

/**
 * What the SVG needs, from what the caller wrote.
 *
 * `radius` is the one prop in this library that means what it means in geometry rather than
 * a corner, because a circle has no corner to round. It is a **raw number** and it wins
 * over `size`, exactly as a raw `color` wins over a variant's token: the ladder is the
 * vocabulary, and a ring that has to line up with something already on the screen is not a
 * vocabulary question.
 *
 * Both raw values are clamped: a negative radius, or a stroke thicker than the ring is
 * wide, draws an SVG path with a negative radius — which renders nothing, on one platform,
 * with no error.
 */
export function circleGeometry(
  size: ProgressCircleSize,
  radius?: number,
  strokeWidth?: number
): CircleGeometry {
  const step = SIZES[size]
  const diameter =
    radius !== undefined && Number.isFinite(radius) && radius > 0
      ? radius * 2
      : step.diameter
  const requested =
    strokeWidth !== undefined && Number.isFinite(strokeWidth) && strokeWidth > 0
      ? strokeWidth
      : step.stroke
  // A stroke is centred on the path, so it can take at most the whole radius before the
  // ring closes into a disc.
  const stroke = Math.min(requested, diameter / 2)
  const pathRadius = (diameter - stroke) / 2

  return {
    diameter,
    radius: pathRadius,
    strokeWidth: stroke,
    circumference: 2 * Math.PI * pathRadius,
  }
}
