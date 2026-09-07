import { isSameDay, startOfDay } from './dates'

/** Two ends, either of which may be missing while the other is not. */
export type DateRange = { start: Date | null; end: Date | null }

/** Where a day falls in a range — what a cell needs to know to draw itself. */
export type RangePosition = 'none' | 'start' | 'end' | 'middle' | 'single'

/** Nothing chosen, as one shared object — a new `{}` per call re-renders forty-two cells. */
export const EMPTY_RANGE: DateRange = { start: null, end: null }

/**
 * The range after pressing a day.
 *
 * Three cases, and the third is the one every range picker gets wrong:
 *
 * 1. **Nothing, or both ends already set** → this day becomes the start, and the end is
 *    cleared. A reader who has a range and presses a day is starting a new one; asking them
 *    to clear it first is asking them to find a control that should not need to exist.
 * 2. **A start and no end, and the day is on or after it** → this day becomes the end.
 * 3. **A start and no end, and the day is *before* it** → this day becomes the **start**
 *    rather than an end that precedes it. A backwards range is not a range, and silently
 *    swapping the two would move a bound the reader did not touch.
 *
 * Pressing the start again gives a single-day range rather than nothing: a one-night stay
 * and a one-day event are real, and a range picker that cannot express them is one a caller
 * has to work around.
 *
 * Every date is taken to midnight, for `startOfDay`'s reason: a `Date` is an instant and a
 * calendar day is not, and a range whose ends carry the moment they were pressed compares
 * unequal to the same two days written by the caller.
 */
export function nextRange(current: DateRange, day: Date): DateRange {
  const chosen = startOfDay(day)

  if (current.start === null || current.end !== null) {
    return { start: chosen, end: null }
  }

  if (chosen.getTime() < current.start.getTime()) {
    return { start: chosen, end: null }
  }

  return { start: current.start, end: chosen }
}

/** Whether a day is inside the range, ends included. A half range contains only its start. */
export function isInRange(day: Date, range: DateRange): boolean {
  if (range.start === null) return false

  const at = startOfDay(day).getTime()
  const from = range.start.getTime()

  if (range.end === null) return at === from

  return at >= from && at <= range.end.getTime()
}

/**
 * Where a day sits in the range, which is the whole of what a cell needs.
 *
 * `single` is its own answer rather than "start and end at once": the two ends of a one-day
 * range are the same cell, and a cell told it is both would have to decide which half of its
 * own shape to draw.
 */
export function rangePosition(day: Date, range: DateRange): RangePosition {
  if (range.start === null) return 'none'

  const isStart = isSameDay(day, range.start)
  const isEnd = range.end !== null && isSameDay(day, range.end)

  if (isStart && isEnd) return 'single'
  if (isStart) return range.end === null ? 'single' : 'start'
  if (isEnd) return 'end'

  return isInRange(day, range) ? 'middle' : 'none'
}

/** Whether two ranges name the same two days, either of which may be absent. */
export function isSameRange(a: DateRange, b: DateRange): boolean {
  return sameDay(a.start, b.start) && sameDay(a.end, b.end)
}

function sameDay(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) return a === b

  return isSameDay(a, b)
}
