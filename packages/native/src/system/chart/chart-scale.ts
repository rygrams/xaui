/** A closed interval, low first. */
export type Span = readonly [number, number]

/** A point in the plot, in the coordinates an SVG path is written in. */
export type Point = { x: number; y: number }

/**
 * The steps a reader recognises. Any tick spacing is one of these times a power of ten —
 * 1, 2, 2.5, 5, 10, 20, 25, 50 — and nothing else, which is why an axis never reads 3.33.
 *
 * `2.5` is in the set for one case that is everywhere: a domain of 0 to 100 asked for four
 * ticks. Without it the step rounds up from 25 to 50 and the axis comes back with two gaps
 * where four were wanted — and 0, 25, 50, 75, 100 is about as readable as an axis gets.
 */
const NICE_STEPS = [1, 2, 2.5, 5, 10] as const

/**
 * Maps a value in `domain` onto `range`.
 *
 * A **function**, not a table: a chart calls it once per point per render, and returning a
 * closure is what lets a caller pass it around without carrying the four numbers with it.
 *
 * An empty domain maps everything to the middle of the range rather than dividing by zero.
 * That is the case of a series where every value is the same — a flat line halfway up the
 * plot, which is what it is.
 */
export function linearScale(domain: Span, range: Span): (value: number) => number {
  const [d0, d1] = domain
  const [r0, r1] = range
  const span = d1 - d0

  if (span === 0 || !Number.isFinite(span)) return () => (r0 + r1) / 2

  return value => r0 + ((value - d0) / span) * (r1 - r0)
}

/**
 * A domain widened to the nearest round numbers, and the ticks inside it.
 *
 * **The domain is widened, not the ticks squeezed.** A y axis whose top tick is below the
 * tallest bar is an axis that lies about the data, so the step is chosen first and the
 * domain rounded out to a multiple of it.
 *
 * `count` is a **target**: the step lands on 1, 2, 5 or 10 times a power of ten, and how
 * many of those fit is then arithmetic. Forcing an exact count is what produces an axis
 * labelled 3.33 and 6.67.
 */
export function niceScale(
  min: number,
  max: number,
  count = 4
): { domain: Span; ticks: number[] } {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { domain: [0, 1], ticks: [0, 1] }
  }

  const target = Math.max(Math.floor(count), 1)
  const low = Math.min(min, max)
  const high = Math.max(min, max)

  // A flat series has no span to divide. One step either side of the value gives it an
  // axis to sit on rather than a domain of zero width.
  if (low === high) {
    const step = niceStep(Math.abs(low) || 1, target)
    const places = decimalsOf(step)
    const at = (value: number) => Number(value.toFixed(places))
    return {
      domain: [low - step, low + step],
      ticks: [at(low - step), at(low), at(low + step)],
    }
  }

  const step = niceStep(high - low, target)
  const start = Math.floor(low / step) * step
  const end = Math.ceil(high / step) * step

  const ticks: number[] = []
  // Counted rather than accumulated: adding `step` repeatedly drifts, and an axis whose
  // last label is 59.999999999 is an axis with a bug in it.
  const steps = Math.round((end - start) / step)
  const places = decimalsOf(step)
  for (let index = 0; index <= steps; index += 1) {
    ticks.push(Number((start + step * index).toFixed(places)))
  }

  return { domain: [start, end], ticks }
}

/** The nicest step that divides `span` into about `count` parts. */
function niceStep(span: number, count: number): number {
  const rough = span / count
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const normalised = rough / magnitude

  const step = NICE_STEPS.find(candidate => candidate >= normalised) ?? 10

  return step * magnitude
}

/**
 * Floating point leaves 0.1 + 0.2 at 0.30000000000000004, and a tick is a label. Rounded to
 * the step's own precision, so a step of 0.001 keeps its digits and a step of 1000 gains
 * none.
 *
 * The precision is found by asking the step what it needs rather than derived from its
 * magnitude, and the difference is not academic: a step of 2.5 has a magnitude of one, and
 * rounding its ticks to zero places turns 0, 2.5, 5, 7.5, 10 into 0, 3, 5, 8, 10.
 */
function decimalsOf(step: number): number {
  for (let places = 0; places <= 20; places += 1) {
    if (Number(step.toFixed(places)) === step) return places
  }

  return 20
}

/**
 * Where each of `count` categories sits along `range`, and how wide one is.
 *
 * `padding` is the share of a slot left empty, so `0.4` puts a bar in the middle 60% of its
 * own column. It is a **fraction** rather than points because the slot's width is the
 * plot's divided by the data, and a caller cannot know that number.
 */
export function bandScale(
  count: number,
  range: Span,
  padding = 0
): { center: (index: number) => number; width: number; step: number } {
  const [r0, r1] = range
  const size = Math.max(Math.floor(count), 0)

  if (size === 0) return { center: () => r0, width: 0, step: 0 }

  const step = (r1 - r0) / size
  const gap = Math.min(Math.max(padding, 0), 0.95)

  return {
    // The middle of the slot, not its edge: a bar is centred on its label and a point sits
    // over it, and an edge-aligned scale puts the first one half off the plot.
    center: index => r0 + step * (index + 0.5),
    width: step * (1 - gap),
    step,
  }
}

/**
 * Where each of `count` readings sits along `range`, with the **first and last on the ends**.
 *
 * The other half of `bandScale`, and the difference is what the mark is. A bar occupies a
 * slot, so it is centred in one and the ends of the plot are empty. A line connects
 * readings, so the first and the last sit on the edges — a line chart inset by half a slot
 * at either end reads as a chart that has been cut off.
 *
 * `width` is the room a label under one of them gets, which is a whole step: the labels are
 * centred on the readings, so neighbouring ones meet halfway.
 */
export function pointScale(
  count: number,
  range: Span
): { center: (index: number) => number; width: number; step: number } {
  const [r0, r1] = range
  const size = Math.max(Math.floor(count), 0)

  if (size === 0) return { center: () => r0, width: 0, step: 0 }
  // One reading has no interval to divide, so it goes in the middle rather than on an end.
  if (size === 1) {
    const middle = (r0 + r1) / 2
    return { center: () => middle, width: r1 - r0, step: r1 - r0 }
  }

  const step = (r1 - r0) / (size - 1)

  return { center: index => r0 + step * index, width: step, step }
}

/** The lowest and highest finite number in the lot, or `[0, 0]` when there are none. */
export function extent(values: ReadonlyArray<number>): Span {
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  for (const value of values) {
    if (!Number.isFinite(value)) continue
    if (value < min) min = value
    if (value > max) max = value
  }

  if (min > max) return [0, 0]

  return [min, max]
}
