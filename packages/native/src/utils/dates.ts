/** Sunday is 0, as `Date.getDay()` has it. */
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** A closed interval. Either end may be absent, and an absent end is unbounded. */
export type DateBounds = { min?: Date; max?: Date }

/** Six weeks of seven, which is the most any month can span. */
const GRID_LENGTH = 42
const WEEK_LENGTH = 7

/**
 * Midnight, local time.
 *
 * **Every comparison in this file goes through it**, because a `Date` is an instant and a
 * calendar day is not: two instants eleven hours apart are the same square on the grid, and
 * `a.getTime() === b.getTime()` would say they are not. Constructing a new date from the
 * three parts is also what drops the time zone question — the parts are already local.
 */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** The same square on the grid, whatever time either one carries. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

/**
 * `count` days later, or earlier when it is negative.
 *
 * Through the day-of-month rather than through milliseconds: a day is not always 86 400
 * seconds, and adding that many across a daylight-saving boundary lands an hour into the
 * day before. `Date` normalises an out-of-range day itself, so day 32 of January is the
 * first of February with no arithmetic here.
 */
export function addDays(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + count)
}

/**
 * `count` months later, **clamped to the end of the target month**.
 *
 * The clamp is the whole reason this is not one line: `new Date(2026, 0, 31)` plus a month
 * is the 31st of February, which `Date` rolls forward to the 3rd of March. A calendar
 * stepping from January to February must land on February, and the last day of it is the
 * only answer that is not a different month.
 */
export function addMonths(date: Date, count: number): Date {
  const year = date.getFullYear()
  const month = date.getMonth() + count
  const lastDay = new Date(year, month + 1, 0).getDate()

  return new Date(year, month, Math.min(date.getDate(), lastDay))
}

/** The first day of `date`'s week, given which day a week starts on. */
export function startOfWeek(date: Date, firstDayOfWeek: WeekDay = 0): Date {
  const shift = (date.getDay() - firstDayOfWeek + WEEK_LENGTH) % WEEK_LENGTH
  return addDays(startOfDay(date), -shift)
}

/**
 * Whether a day falls inside the bounds — **compared by day, not by instant**.
 *
 * A `max` of "today" written as `new Date()` carries the current time, and an instant
 * comparison would refuse the rest of today. Normalising both ends is what makes a bound a
 * date rather than a moment.
 */
export function isWithinBounds(date: Date, bounds: DateBounds = {}): boolean {
  const day = startOfDay(date).getTime()

  if (bounds.min && day < startOfDay(bounds.min).getTime()) return false
  if (bounds.max && day > startOfDay(bounds.max).getTime()) return false

  return true
}

/**
 * The forty-two days a month grid shows: the month itself, and enough of the months either
 * side to fill the first and last weeks.
 *
 * **Always forty-two, never five weeks for a short month.** A grid that changed height
 * between March and April would move everything under it twice a year, and the calendar
 * would jump as you paged through it.
 */
export function monthGrid(month: Date, firstDayOfWeek: WeekDay = 0): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const start = startOfWeek(first, firstDayOfWeek)

  return Array.from({ length: GRID_LENGTH }, (_, index) => addDays(start, index))
}

/** The seven days of `date`'s week, in the order they are read. */
export function weekGrid(date: Date, firstDayOfWeek: WeekDay = 0): Date[] {
  const start = startOfWeek(date, firstDayOfWeek)

  return Array.from({ length: WEEK_LENGTH }, (_, index) => addDays(start, index))
}

/**
 * Which day the week starts on where the caller is.
 *
 * `Intl.Locale`'s week info answers it properly and is the right answer where it exists —
 * Saturday-first locales are real, and a hand-kept list of Monday-first ones has never
 * included them. It is missing from most React Native engines, so the list is the fallback
 * rather than the source, and the list is only ever asked Monday or Sunday.
 */
export function firstDayOfWeekFor(locale: string): WeekDay {
  const fromIntl = weekInfoFirstDay(locale)
  if (fromIntl !== undefined) return fromIntl

  const language = locale.split('-')[0]?.toLowerCase() ?? ''
  return MONDAY_FIRST.has(language) ? 1 : 0
}

/**
 * `getWeekInfo` numbers days 1–7 from Monday, where `Date` numbers them 0–6 from Sunday.
 * Wrapped in a `try` because both the constructor and the method are absent on engines
 * that ship a partial `Intl`, and a calendar is not a reason to throw.
 */
function weekInfoFirstDay(locale: string): WeekDay | undefined {
  try {
    const info = (
      new Intl.Locale(locale) as Intl.Locale & {
        getWeekInfo?: () => { firstDay: number }
      }
    ).getWeekInfo?.()

    if (!info) return undefined

    return (info.firstDay % WEEK_LENGTH) as WeekDay
  } catch {
    return undefined
  }
}

/** The languages that start their week on Monday. Only reached when `Intl` cannot say. */
const MONDAY_FIRST = new Set([
  'fr',
  'de',
  'es',
  'it',
  'pt',
  'nl',
  'pl',
  'ru',
  'sv',
  'da',
  'fi',
  'nb',
  'nn',
  'cs',
  'sk',
  'hu',
  'ro',
  'bg',
  'hr',
  'sl',
  'uk',
  'tr',
  'el',
  'et',
  'lt',
  'lv',
])

/**
 * The seven weekday names, starting on the right day.
 *
 * Any January in a known year would do as a source of seven consecutive days; 2023 opened
 * on a Sunday, which makes the offset arithmetic below read as what it is.
 */
export function weekdayNames(
  locale: string,
  firstDayOfWeek: WeekDay = 0,
  format: Intl.DateTimeFormatOptions['weekday'] = 'short'
): string[] {
  const formatter = safeFormatter(locale, { weekday: format })

  return Array.from({ length: WEEK_LENGTH }, (_, index) => {
    // 1 January 2023 was a Sunday, so day `n` of that week is `1 + n`.
    const date = new Date(2023, 0, 1 + ((firstDayOfWeek + index) % WEEK_LENGTH))
    return formatter ? formatter.format(date) : FALLBACK_WEEKDAYS[date.getDay()]
  })
}

/** The month and the year, as the header reads them — "septembre 2026". */
export function monthLabel(month: Date, locale: string): string {
  const formatter = safeFormatter(locale, { month: 'long', year: 'numeric' })

  return formatter
    ? formatter.format(month)
    : `${month.getMonth() + 1}/${month.getFullYear()}`
}

/**
 * The twelve month names, in the calendar's locale — "janvier", "février", … — for the
 * month grid the year picker drills into.
 *
 * Any year would do as a source of twelve consecutive months; 2023 is the one
 * `weekdayNames` already uses. Falls back to English long names on an engine with no
 * `Intl`, like every other formatter in this file.
 */
export function monthNames(
  locale: string,
  format: Intl.DateTimeFormatOptions['month'] = 'long'
): string[] {
  const formatter = safeFormatter(locale, { month: format })

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(2023, index, 1)
    return formatter ? formatter.format(date) : FALLBACK_MONTHS[index]
  })
}

/**
 * A formatter, or nothing.
 *
 * A Hermes build compiled without ICU has no `Intl.DateTimeFormat`, and an invalid locale
 * throws a `RangeError` on a perfectly good date. Neither is a reason for a calendar to
 * render nothing, so both fall back to a form that needs no locale data at all.
 */
function safeFormatter(
  locale: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat | undefined {
  try {
    return new Intl.DateTimeFormat(locale, options)
  } catch {
    return undefined
  }
}

const FALLBACK_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const FALLBACK_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
