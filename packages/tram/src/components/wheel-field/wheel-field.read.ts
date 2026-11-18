/**
 * How a picker reads a moment in words — the field's value, a column's name for a screen
 * reader. Everything goes through `Intl`, and everything survives its absence: a Hermes
 * build without ICU still gets something a reader can understand.
 */

/** The parts of a moment a column stands for, as `Intl.DisplayNames` names them. */
export type MomentField = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'dayPeriod'

/**
 * `date` as `locale` writes it with `options`, or `fallback(date)` where `Intl` refuses —
 * missing, or handed options it does not know.
 */
export function readMoment(
  date: Date,
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
  fallback: (date: Date) => string
): string {
  try {
    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch {
    return fallback(date)
  }
}

/** Two digits: the shape of a day, a month, an hour or a minute on a square. */
export function twoDigits(value: number): string {
  return String(value).padStart(2, '0')
}

/** The day, ISO-written — unambiguous in every locale, if nobody's habit. */
export function isoDay(date: Date): string {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`
}

/** The time, on a 24-hour clock. */
export function isoTime(date: Date): string {
  return `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`
}

const FIELD_NAMES: Record<MomentField, string> = {
  year: 'year',
  month: 'month',
  day: 'day',
  hour: 'hour',
  minute: 'minute',
  dayPeriod: 'AM/PM',
}

/**
 * What a column is called in `locale` — "jour", "mois", "année" — for the screen reader
 * that lands on it. English where `Intl.DisplayNames` is missing.
 */
export function fieldName(field: MomentField, locale?: string): string {
  try {
    const names = new Intl.DisplayNames(locale ? [locale] : undefined, {
      type: 'dateTimeField',
    })

    return names.of(field) ?? FIELD_NAMES[field]
  } catch {
    return FIELD_NAMES[field]
  }
}

/** One name per value of a calendar part — a month, a weekday — as `locale` writes it. */
export function partName(
  date: Date,
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions
): string | undefined {
  try {
    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch {
    return undefined
  }
}
