/**
 * The two conversions a slider is made of, and the rounding between them.
 *
 * Pure, because a slider that lands one step off at the far end is a bug you cannot see in
 * a screenshot — it needs a table of inputs and outputs, which is what a test is.
 */

export type Range = { min: number; max: number; step: number }

/** One value, or the two ends of a range. */
export type SliderValue = number | readonly [number, number]

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

/** Always one or two entries, snapped, whatever shape the caller wrote. */
export function toValues(value: SliderValue, range: Range): number[] {
  return Array.isArray(value)
    ? [snap(value[0], range), snap(value[1], range)]
    : [snap(value as number, range)]
}

/** Back to the caller's shape: a number stays a number, a pair stays a pair. */
export function fromValues(values: readonly number[]): SliderValue {
  return values.length > 1 ? [values[0]!, values[1]!] : values[0]!
}

/**
 * One thumb moved, with the other holding its ground.
 *
 * **The thumbs cannot cross.** Each is bounded by its neighbour rather than by the range,
 * so dragging the lower one past the upper stops it dead instead of swapping the two — a
 * swap loses the finger's grip mid-drag, and it ends up pushing the thumb it did not pick
 * up.
 */
export function withThumbAt(
  values: readonly number[],
  index: number,
  value: number,
  range: Range
): number[] {
  const next = [...values]
  const lower = index > 0 ? values[index - 1]! : range.min
  const upper = index < values.length - 1 ? values[index + 1]! : range.max

  next[index] = snap(Math.min(Math.max(value, lower), upper), range)
  return next
}

/**
 * Which thumb a press on the rail should move: the nearest one.
 *
 * Ties go to the **lower** thumb, arbitrarily but consistently. Two thumbs at the same
 * value have nothing to be told apart by, and picking the same one every time at least
 * makes the behaviour learnable.
 */
export function nearestThumb(values: readonly number[], value: number): number {
  let best = 0
  let distance = Math.abs(values[0]! - value)

  for (let i = 1; i < values.length; i += 1) {
    const d = Math.abs(values[i]! - value)
    if (d < distance) {
      best = i
      distance = d
    }
  }

  return best
}
