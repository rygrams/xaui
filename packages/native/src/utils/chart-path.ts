import type { Point } from './chart-scale'

/**
 * How a line travels between two points.
 *
 * `linear` joins them with a straight edge. `monotone` bends through them without ever
 * leaving the interval its neighbours set — which is what a curve through data has to do:
 * a smooth line that dips below zero between two positive readings is drawing a number
 * nobody measured, and an area chart doing it puts ink under the axis.
 */
export type Curve = 'linear' | 'monotone'

/** Two digits is a tenth of a pixel at any density, and shorter paths parse faster. */
const PRECISION = 2

/**
 * The path through the points, as an SVG `d`.
 *
 * Fewer than two points draws nothing rather than a dot: a chart of one reading has no line
 * in it, and an empty string is what tells the renderer so.
 */
export function linePath(
  points: ReadonlyArray<Point>,
  curve: Curve = 'monotone'
): string {
  if (points.length < 2) return ''

  return curve === 'linear' ? straight(points) : monotone(points)
}

/**
 * The same path, closed down to `baseline` and back — the shape an area chart fills.
 *
 * It closes through the **first and last x** rather than through the points themselves, so
 * the fill has vertical edges at either end instead of a diagonal to the origin.
 */
export function areaPath(
  points: ReadonlyArray<Point>,
  baseline: number,
  curve: Curve = 'monotone'
): string {
  const top = linePath(points, curve)
  if (top === '') return ''

  const first = points[0]
  const last = points[points.length - 1]

  return `${top} L ${n(last.x)} ${n(baseline)} L ${n(first.x)} ${n(baseline)} Z`
}

function straight(points: ReadonlyArray<Point>): string {
  const [first, ...rest] = points

  return rest.reduce(
    (path, point) => `${path} L ${n(point.x)} ${n(point.y)}`,
    `M ${n(first.x)} ${n(first.y)}`
  )
}

/**
 * A monotone cubic through the points — Fritsch–Carlson.
 *
 * The tangent at each point starts as the average of the slopes either side of it, then is
 * **pulled back wherever that would overshoot**: where the data turns, the tangent is
 * flattened to zero, and elsewhere it is capped at three times the smaller neighbouring
 * slope. That cap is the whole algorithm — it is the condition under which a cubic Hermite
 * segment cannot leave the interval its two endpoints set.
 *
 * The alternative, a control point at the x-midpoint, is four lines and overshoots: two
 * high readings either side of a low one bow the curve below the low one, and on an area
 * chart that is ink under the axis.
 */
function monotone(points: ReadonlyArray<Point>): string {
  const count = points.length
  const tangents = monotoneTangents(points)

  let path = `M ${n(points[0].x)} ${n(points[0].y)}`

  for (let index = 0; index < count - 1; index += 1) {
    const from = points[index]
    const to = points[index + 1]
    // A cubic Bézier's control points sit a third of the way along, which is the identity
    // that turns a Hermite tangent into the two handles SVG wants.
    const third = (to.x - from.x) / 3

    path +=
      ` C ${n(from.x + third)} ${n(from.y + third * tangents[index])}` +
      ` ${n(to.x - third)} ${n(to.y - third * tangents[index + 1])}` +
      ` ${n(to.x)} ${n(to.y)}`
  }

  return path
}

/** The slope the curve leaves each point at, capped so no segment overshoots. */
function monotoneTangents(points: ReadonlyArray<Point>): number[] {
  const count = points.length
  const slopes: number[] = []

  for (let index = 0; index < count - 1; index += 1) {
    const run = points[index + 1].x - points[index].x
    slopes.push(run === 0 ? 0 : (points[index + 1].y - points[index].y) / run)
  }

  const tangents = [slopes[0]]
  for (let index = 1; index < count - 1; index += 1) {
    const before = slopes[index - 1]
    const after = slopes[index]
    // A turning point: the curve has to be flat there, or it leaves the interval on one
    // side of it. This is the case the midpoint construction gets wrong.
    tangents.push(before * after <= 0 ? 0 : (before + after) / 2)
  }
  tangents.push(slopes[count - 2])

  for (let index = 0; index < count - 1; index += 1) {
    if (slopes[index] === 0) {
      tangents[index] = 0
      tangents[index + 1] = 0
      continue
    }

    // Fritsch–Carlson: a Hermite segment stays inside its endpoints' interval as long as
    // neither tangent exceeds three times the segment's own slope.
    const a = tangents[index] / slopes[index]
    const b = tangents[index + 1] / slopes[index]
    const size = Math.hypot(a, b)

    if (size > 3) {
      const scale = 3 / size
      tangents[index] = scale * a * slopes[index]
      tangents[index + 1] = scale * b * slopes[index]
    }
  }

  return tangents
}

/**
 * A bar, with the two corners on its far end rounded.
 *
 * The radius is **clamped to half the bar's width and to its whole height**, which is what
 * keeps a short bar a stadium rather than a shape whose arcs cross each other and render as
 * a knot. A bar shorter than its own corner is a real and common case: it is the first bar
 * of a chart that starts near zero.
 */
export function barPath(
  rect: { x: number; y: number; width: number; height: number },
  radius: number
): string {
  const { x, y, width, height } = rect
  if (width <= 0 || height <= 0) return ''

  const r = Math.max(0, Math.min(radius, width / 2, height))
  const right = x + width
  const bottom = y + height

  if (r === 0) {
    return `M ${n(x)} ${n(y)} L ${n(right)} ${n(y)} L ${n(right)} ${n(bottom)} L ${n(x)} ${n(bottom)} Z`
  }

  return (
    `M ${n(x)} ${n(bottom)}` +
    ` L ${n(x)} ${n(y + r)}` +
    ` A ${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}` +
    ` L ${n(right - r)} ${n(y)}` +
    ` A ${n(r)} ${n(r)} 0 0 1 ${n(right)} ${n(y + r)}` +
    ` L ${n(right)} ${n(bottom)}` +
    ' Z'
  )
}

/**
 * A closed path through the points — the shape a radar series is.
 *
 * Always straight edges, never a curve: a radar's vertices are its **axes**, and a curve
 * between two of them draws a reading on an axis that does not exist.
 */
export function polygonPath(points: ReadonlyArray<Point>): string {
  if (points.length < 3) return ''

  return `${straight(points)} Z`
}

/**
 * A point at `angle` on a circle, **clockwise from twelve o'clock**.
 *
 * The quarter turn is baked in here rather than at every call site: a radar's first axis
 * points up, a pie's first slice starts at the top, and a reader's eye starts there too.
 */
export function polarPoint(center: Point, radius: number, angle: number): Point {
  return {
    x: center.x + radius * Math.sin(angle),
    y: center.y - radius * Math.cos(angle),
  }
}

/** One slice of a pie, or of a donut when `innerRadius` is above zero. */
export type Arc = {
  cx: number
  cy: number
  outerRadius: number
  innerRadius: number
  /** Radians, clockwise, zero at twelve o'clock. */
  startAngle: number
  endAngle: number
}

/**
 * A slice, as an SVG `d`.
 *
 * Angles run **clockwise from twelve o'clock**, which is where a reader starts and the
 * direction they go; the maths below is the quarter turn that puts zero at the top.
 *
 * A slice covering the whole circle is drawn as **two half arcs**: an SVG arc from a point
 * back to itself is a no-op, so a single-category pie would otherwise render as nothing at
 * all — which is the bug this shape exists to avoid.
 */
export function arcPath(arc: Arc): string {
  const { cx, cy, outerRadius, innerRadius, startAngle, endAngle } = arc
  const sweep = endAngle - startAngle

  if (outerRadius <= 0 || sweep <= 0) return ''

  const full = sweep >= Math.PI * 2 - 1e-6
  if (full) return ring(arc)

  const large = sweep > Math.PI ? 1 : 0
  const outerStart = onCircle(cx, cy, outerRadius, startAngle)
  const outerEnd = onCircle(cx, cy, outerRadius, endAngle)

  if (innerRadius <= 0) {
    return (
      `M ${n(cx)} ${n(cy)}` +
      ` L ${n(outerStart.x)} ${n(outerStart.y)}` +
      ` A ${n(outerRadius)} ${n(outerRadius)} 0 ${large} 1 ${n(outerEnd.x)} ${n(outerEnd.y)}` +
      ' Z'
    )
  }

  const innerEnd = onCircle(cx, cy, innerRadius, endAngle)
  const innerStart = onCircle(cx, cy, innerRadius, startAngle)

  return (
    `M ${n(outerStart.x)} ${n(outerStart.y)}` +
    ` A ${n(outerRadius)} ${n(outerRadius)} 0 ${large} 1 ${n(outerEnd.x)} ${n(outerEnd.y)}` +
    ` L ${n(innerEnd.x)} ${n(innerEnd.y)}` +
    ` A ${n(innerRadius)} ${n(innerRadius)} 0 ${large} 0 ${n(innerStart.x)} ${n(innerStart.y)}` +
    ' Z'
  )
}

/** A whole circle, or a whole ring — two half arcs, because one full arc draws nothing. */
function ring({ cx, cy, outerRadius, innerRadius }: Arc): string {
  const outer =
    `M ${n(cx - outerRadius)} ${n(cy)}` +
    ` A ${n(outerRadius)} ${n(outerRadius)} 0 1 1 ${n(cx + outerRadius)} ${n(cy)}` +
    ` A ${n(outerRadius)} ${n(outerRadius)} 0 1 1 ${n(cx - outerRadius)} ${n(cy)} Z`

  if (innerRadius <= 0) return outer

  // The hole is drawn the other way round, so the even-odd fill rule cuts it out.
  return (
    `${outer}` +
    ` M ${n(cx - innerRadius)} ${n(cy)}` +
    ` A ${n(innerRadius)} ${n(innerRadius)} 0 1 0 ${n(cx + innerRadius)} ${n(cy)}` +
    ` A ${n(innerRadius)} ${n(innerRadius)} 0 1 0 ${n(cx - innerRadius)} ${n(cy)} Z`
  )
}

/** The same turn `polarPoint` makes, in the shape the arc code reads. */
function onCircle(cx: number, cy: number, radius: number, angle: number): Point {
  return polarPoint({ x: cx, y: cy }, radius, angle)
}

/** A number as a path writes it: two decimals, and no trailing zeroes. */
function n(value: number): string {
  return Number(value.toFixed(PRECISION)).toString()
}
