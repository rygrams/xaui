/**
 * The two conversions a slider is made of, and the rounding between them.
 *
 * Pure, because a slider that lands one step off at the far end is a bug you cannot see in
 * a screenshot — it needs a table of inputs and outputs, which is what a test is.
 */

export type Range = { min: number; max: number; step: number }

/** Where a value sits on its track, from 0 at `min` to 1 at `max`. */
export function toFraction(value: number, { min, max }: Range): number {
  if (max === min) return 0
  return clamp((value - min) / (max - min), 0, 1)
}

/**
 * The value a position on the track means, snapped to the nearest step.
 *
 * The snap is computed in **steps from `min`** rather than by rounding the value itself:
 * a step of 0.1 from a min of 0.05 gives 0.05, 0.15, 0.25 — rounding the value would give
 * 0.1, 0.2, 0.3 and quietly move every stop.
 */
export function fromFraction(fraction: number, range: Range): number {
  const { min, max } = range
  return snap(min + clamp(fraction, 0, 1) * (max - min), range)
}

/** The nearest step to a value, never outside the range. */
export function snap(value: number, { min, max, step }: Range): number {
  if (step <= 0) return clamp(value, min, max)

  const steps = Math.round((clamp(value, min, max) - min) / step)
  // Re-derived from the step count rather than accumulated, so a hundred steps of 0.1 is
  // 10 and not 9.99999999999998.
  return clamp(round(min + steps * step, min, step), min, max)
}

/**
 * To the precision of the numbers that built the value. Floating point makes `0.1 * 3`
 * into `0.30000000000000004`, and a slider reporting that is one whose value cannot be
 * compared or displayed.
 *
 * **The minimum counts as much as the step.** A range from `0.05` in steps of `0.1` has
 * two decimals of precision and not one — rounding to the step's alone turns its first
 * stop, `0.05`, into `0.1`, and every stop after it moves with it.
 */
function round(value: number, min: number, step: number): number {
  const factor = 10 ** Math.max(decimalsOf(step), decimalsOf(min))
  return Math.round(value * factor) / factor
}

function decimalsOf(step: number): number {
  const text = String(step)
  const dot = text.indexOf('.')
  return dot === -1 ? 0 : text.length - dot - 1
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
