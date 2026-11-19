/**
 * The arithmetic of the date wheels: three columns that make a day between them, and
 * what holds that day inside the picker's bounds. Pure, so it is tested on its own.
 */

/** The three columns of a date, in the order a locale writes them. */
export type DatePart = 'day' | 'month' | 'year'

/** What the day, month and year columns stand on. `month` counts from 1. */
export type DateSquares = { year: number; month: number; day: number }

/** The order nobody's locale contradicts badly: the day, then the month, then the year. */
const FALLBACK_ORDER: DatePart[] = ['day', 'month', 'year']

/**
 * How many years the year column reaches on each side of today, when no bound says
 * otherwise. A birthday a century back and a deadline a century ahead are both on it.
 */
export const YEAR_REACH = 100

/** How many days `month` (1–12) of `year` has. */
export function daysInMonth(year: number, month: number): number {
  // Day 0 of the next month is the last day of this one.
  return new Date(year, month, 0).getDate()
}

/** The day at midnight. Two dates of one day compare equal only once both are there. */
export function startOfDay(date: Date): Date {
  const day = new Date(date)
  day.setHours(0, 0, 0, 0)

  return day
}

/** The squares a date stands on. */
export function squaresOf(date: Date): DateSquares {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

/**
 * The day three columns make, at midnight. A day past the end of the month is its last
 * day: turning the month from 31 January to February lands on the 28th or the 29th, not
 * on 3 March.
 */
export function composeDate({ year, month, day }: DateSquares): Date {
  const last = daysInMonth(year, month)
  const date = new Date(year, month - 1, Math.min(Math.max(day, 1), last))

  // `new Date` reads a year under 100 as 19xx: set it again, as it was asked.
  date.setFullYear(year)

  return date
}

/**
 * `day`'s date at `moment`'s time of day. A date wheel turned under a moment moves its day
 * and keeps its hour — the `DateTimePicker`'s; a `DatePicker` settles it to midnight after.
 */
export function withTimeOf(day: Date, moment: Date): Date {
  const next = new Date(day)
  next.setHours(
    moment.getHours(),
    moment.getMinutes(),
    moment.getSeconds(),
    moment.getMilliseconds()
  )

  return next
}

/** `date`, held between two bounds compared by the day. Either bound may be missing. */
export function clampDate(date: Date, minValue?: Date, maxValue?: Date): Date {
  const day = startOfDay(date)

  if (minValue && day < startOfDay(minValue)) return startOfDay(minValue)
  if (maxValue && day > startOfDay(maxValue)) return startOfDay(maxValue)

  return day
}

/**
 * The first and last years of the year column: the bounds' when they are set, else
 * `YEAR_REACH` on each side of `today` — widened to `shown`, so a date chosen outside
 * that reach still has its square.
 */
export function yearSpan(
  today: number,
  shown: number,
  minValue?: Date,
  maxValue?: Date
): [number, number] {
  const from = minValue?.getFullYear() ?? Math.min(today - YEAR_REACH, shown)
  const to = maxValue?.getFullYear() ?? Math.max(today + YEAR_REACH, shown)

  return [from, Math.max(from, to)]
}

/**
 * The three columns in the order `locale` writes a date — the day first in French, the
 * month first in American English, the year first in Japanese. Any part the platform
 * leaves out is put back in the fallback's place, and so is the whole order where `Intl`
 * is missing.
 */
export function dateColumnOrder(locale?: string): DatePart[] {
  let parts: string[]

  try {
    parts = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .formatToParts(new Date(2000, 10, 22))
      .map(part => part.type)
  } catch {
    return FALLBACK_ORDER
  }

  const order = parts.filter((type): type is DatePart =>
    FALLBACK_ORDER.includes(type as DatePart)
  )

  return order.length === FALLBACK_ORDER.length ? order : FALLBACK_ORDER
}
