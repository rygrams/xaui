/**
 * The arithmetic of a moment made by two sets of wheels: what the picker accepts from
 * them, and how each half reads. Pure, so it is tested on its own.
 */
import {
  composeTime,
  minuteStepOf,
  timeSquaresOf,
} from '../time-picker/time-picker.times'
import type { HourCycle } from '../time-picker/time-picker.times'

/** The two halves of a moment, in the order the page shows them. */
export type DateTimePickerStep = 'date' | 'time'

export const STEPS: DateTimePickerStep[] = ['date', 'time']

const MINUTE = 60_000

/** `moment` on the minute square at or under it, its seconds dropped. */
function floorSquare(moment: Date, step: number): Date {
  return composeTime(moment, timeSquaresOf(moment, 24, step), 24)
}

/** `moment` on the minute square at or over it: a bound between two squares is not one. */
function ceilSquare(moment: Date, step: number): Date {
  const floor = floorSquare(moment, step)

  return floor < moment ? new Date(floor.getTime() + step * MINUTE) : floor
}

/**
 * What the picker accepts from any moment the wheels make: on a minute square, and
 * between the bounds — compared to the minute, not by the day. A moment before
 * `minValue` turns to the first square after it, one past `maxValue` to the last square
 * before it.
 */
export function settleMoment(
  moment: Date,
  minuteStep: number,
  minValue?: Date,
  maxValue?: Date
): Date {
  const step = minuteStepOf(minuteStep)
  const at = floorSquare(moment, step)

  if (minValue && at < minValue) return ceilSquare(minValue, step)
  if (maxValue && at > maxValue) return floorSquare(maxValue, step)

  return at
}

/**
 * How the field reads a moment when the caller names no format: the day as the
 * `DatePicker` reads it and the time on the picker's clock — "18 nov. 2026, 09:30".
 */
export function momentFormat(hourCycle: HourCycle): Intl.DateTimeFormatOptions {
  return { dateStyle: 'medium', timeStyle: 'short', hour12: hourCycle === 12 }
}

/** How each step's title reads its half of the moment. */
export function stepFormats(
  hourCycle: HourCycle
): Record<DateTimePickerStep, Intl.DateTimeFormatOptions> {
  return {
    date: { dateStyle: 'medium' },
    time: { timeStyle: 'short', hour12: hourCycle === 12 },
  }
}
