/** Twenty-four hours, or twelve and a period beside them. */
export type HourCycle = 12 | 24

/** Which half of a twelve-hour day. */
export type DayPeriod = 'am' | 'pm'

/** The parts of a time, in the units a clock names them. */
export type TimeParts = { hours: number; minutes: number; seconds: number }

const HOURS_IN_HALF_DAY = 12

/**
 * Whether that locale writes twelve hours or twenty-four.
 *
 * Out of `Intl`, for the reason `dateOrderFor` gives: the platform ships the answer and a
 * table here would be a second one, shorter and out of date. `hour12` is what
 * `resolvedOptions` calls it, and it is absent on a locale with no hour in its default
 * format — twenty-four is the fallback, being what most of the world writes.
 */
export function hourCycleFor(locale: string): HourCycle {
  const { hour12 } = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
  }).resolvedOptions()

  return hour12 ? 12 : 24
}

/** Which half of the day that date falls in, for a field that shows a period. */
export function periodOf(date: Date): DayPeriod {
  return date.getHours() < HOURS_IN_HALF_DAY ? 'am' : 'pm'
}

/**
 * Those parts, on that day.
 *
 * A time on its own is still a `Date` in this library. The day it lands on is given rather
 * than assumed, so a caller merging a time into a date they already hold gets that date
 * back and not today's.
 */
export function withTime(day: Date, parts: TimeParts): Date {
  const date = new Date(day)
  date.setHours(parts.hours, parts.minutes, parts.seconds, 0)

  return date
}
