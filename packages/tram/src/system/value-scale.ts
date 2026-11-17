/**
 * A quantity on a line: the value a place along a track means, the place a value sits at,
 * and the steps between the two — the arithmetic of a slider, kept apart from the views
 * that draw one. Every function is a worklet: a drag reads them on the UI thread.
 *
 * A **place** is a number from 0, at the start of the track, to 1 at its end.
 */

/** What the scale runs over. A `step` of 0 is a continuous scale. */
export type ValueScale = { min: number; max: number; step: number }

/** One value, or the two ends of a range. */
export type ScaleValue = number | readonly [number, number]

function clamp(value: number, min: number, max: number): number {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

function decimalsOf(value: number): number {
  'worklet'
  const text = String(value)
  const dot = text.indexOf('.')

  return dot === -1 ? 0 : text.length - dot - 1
}

/** Where a value sits on its track, from 0 at `min` to 1 at `max`. */
export function placeOf(value: number, { min, max }: ValueScale): number {
  'worklet'
  if (max <= min) return 0

  return clamp((value - min) / (max - min), 0, 1)
}

/**
 * The nearest step to a value, never outside the scale.
 *
 * Steps are counted **from `min`**, so a step of 0.1 from 0.05 stops on 0.05, 0.15, 0.25.
 * The result is rebuilt from the step count and rounded to the decimals of `min` and
 * `step`: a hundred steps of 0.1 is 10, not 9.99999999999998.
 */
export function snapToStep(value: number, { min, max, step }: ValueScale): number {
  'worklet'
  const held = clamp(value, min, max)
  if (step <= 0) return held

  const steps = Math.round((held - min) / step)
  const factor = 10 ** Math.max(decimalsOf(step), decimalsOf(min))

  return clamp(Math.round((min + steps * step) * factor) / factor, min, max)
}

/** The value a place on the track means, on its nearest step. */
export function valueAt(place: number, scale: ValueScale): number {
  'worklet'
  return snapToStep(scale.min + clamp(place, 0, 1) * (scale.max - scale.min), scale)
}

/** How far a thumb `thumb` points long travels on a track: flush with it at both ends. */
export function travelOn(length: number, thumb: number): number {
  'worklet'
  return Math.max(length - thumb, 0)
}

/**
 * The place of a thumb whose middle is `along` points from the start of its track. A
 * track too short for the thumb to move has one place, its start.
 */
export function placeAlong(along: number, length: number, thumb: number): number {
  'worklet'
  const travel = travelOn(length, thumb)
  if (travel === 0) return 0

  return clamp((along - thumb / 2) / travel, 0, 1)
}

/** One or two values, each on a step, whatever shape the caller wrote. */
export function toStops(value: ScaleValue, scale: ValueScale): number[] {
  'worklet'
  if (typeof value === 'number') return [snapToStep(value, scale)]

  return [snapToStep(value[0], scale), snapToStep(value[1], scale)]
}

/** Back to the caller's shape: a number stays a number, a pair stays a pair. */
export function fromStops(stops: readonly number[]): ScaleValue {
  'worklet'
  return stops.length > 1 ? [stops[0]!, stops[1]!] : stops[0]!
}

/**
 * The value the thumb `index` takes when asked for `value`: on a step, and held between
 * its neighbours. **Two thumbs do not cross** — the one dragged into the other stops
 * there, on the other's value.
 */
export function stopFor(
  stops: readonly number[],
  index: number,
  value: number,
  scale: ValueScale
): number {
  'worklet'
  const lower = index > 0 ? stops[index - 1]! : scale.min
  const upper = index < stops.length - 1 ? stops[index + 1]! : scale.max

  return clamp(snapToStep(value, scale), lower, upper)
}

/** The stops with the thumb `index` moved to `value`, as `stopFor` allows it. */
export function withStopAt(
  stops: readonly number[],
  index: number,
  value: number,
  scale: ValueScale
): number[] {
  'worklet'
  const next = [...stops]
  next[index] = stopFor(stops, index, value, scale)

  return next
}

/**
 * Which thumb a touch at `value` picks up: the nearest. Between two that are as near —
 * two thumbs on one value above all — it is the one that can still move toward the
 * touch: the upper for a touch above them, the lower otherwise.
 */
export function nearestStop(stops: readonly number[], value: number): number {
  'worklet'
  let nearest = 0
  let distance = Math.abs(stops[0]! - value)

  for (let index = 1; index < stops.length; index += 1) {
    const away = Math.abs(stops[index]! - value)
    const isNearer = away < distance || (away === distance && value > stops[index]!)

    if (isNearer) {
      nearest = index
      distance = away
    }
  }

  return nearest
}

/** Whether two lists of stops hold the same values. */
export function sameStops(a: readonly number[], b: readonly number[]): boolean {
  'worklet'
  return a.length === b.length && a.every((stop, index) => stop === b[index])
}

/**
 * What a screen reader's swipe moves a value by: one step, or a tenth of the scale when
 * it is continuous.
 */
export function nudgeOf({ min, max, step }: ValueScale): number {
  'worklet'
  return step > 0 ? step : (max - min) / 10
}
