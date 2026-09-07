/** How far down a time is written. Hours and minutes, or seconds as well. */
export type TimeGranularity = 'minute' | 'second'

/** Twenty-four hours, or twelve and a period beside them. */
export type HourCycle = 12 | 24

/** Which half of a twelve-hour day. */
export type DayPeriod = 'am' | 'pm'

/** The parts of a time, in the units a clock names them. */
export type TimeParts = { hours: number; minutes: number; seconds: number }

const MINUTE_CEILING = 59
const HOURS_IN_HALF_DAY = 12
const HOURS_IN_DAY = 24

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

/** How many characters a finished time is, so a field can stop the caret at the end. */
export function timeLength(granularity: TimeGranularity): number {
  return granularity === 'second' ? 8 : 5
}

/** What a placeholder calls each part. The letters are a language's, so they are given. */
export type TimeLabels = { hours: string; minutes: string; seconds: string }

/** The shape a reader is being asked for — `HH:mm`, `hh:mm:ss`. */
export function timePlaceholder(
  granularity: TimeGranularity,
  labels: TimeLabels
): string {
  const base = `${labels.hours}:${labels.minutes}`

  return granularity === 'second' ? `${base}:${labels.seconds}` : base
}

/**
 * What the reader typed, as a time is written.
 *
 * Digits only, and the colons are **put back** rather than kept — the `maskDate` argument,
 * for the same four reasons: a paste, a keyboard with its own punctuation, a backspace over
 * a separator, and a caret dropped into the middle.
 *
 * **The period is not typed.** A twelve-hour field caps its hours at 12 and takes AM or PM
 * from `TimeField.Period` beside it. The legacy field asked for the letters to be typed into
 * a number pad, which is a keyboard that cannot produce them.
 *
 * Each part is clamped as it completes and never raised, exactly as a date's is: `9` on its
 * way to `09` is left alone, `75` minutes becomes `59`, and `00` stays `00`.
 */
export function maskTime(
  input: string,
  granularity: TimeGranularity,
  hourCycle: HourCycle = 24
): string {
  const width = granularity === 'second' ? 6 : 4
  const digits = input.replace(/\D/g, '').slice(0, width)
  if (digits.length === 0) return ''

  const written: string[] = []
  for (let at = 0; at < digits.length; at += 2) {
    const raw = digits.slice(at, at + 2)
    const ceiling = at === 0 ? hourCeiling(hourCycle) : MINUTE_CEILING

    written.push(raw.length === 2 ? clamp(raw, ceiling) : raw)
  }

  return written.join(':')
}

/**
 * The time those digits are, or `null` while they are not one yet.
 *
 * On a twelve-hour clock the `period` is what says which half of the day it is, so a time
 * with no period given is read as the morning — twelve o'clock included, which is why the
 * arithmetic below is a remainder rather than a subtraction: 12 AM is midnight and 12 PM is
 * noon, and the naive `hours + 12` gets exactly those two wrong.
 */
export function parseTime(
  text: string,
  granularity: TimeGranularity,
  hourCycle: HourCycle = 24,
  period: DayPeriod = 'am'
): TimeParts | null {
  const digits = text.replace(/\D/g, '')
  if (digits.length !== (granularity === 'second' ? 6 : 4)) return null

  const written = Number(digits.slice(0, 2))
  const minutes = Number(digits.slice(2, 4))
  const seconds = granularity === 'second' ? Number(digits.slice(4, 6)) : 0

  if (minutes > MINUTE_CEILING || seconds > MINUTE_CEILING) return null
  if (written > hourCeiling(hourCycle)) return null

  const hours =
    hourCycle === 24
      ? written
      : (written % HOURS_IN_HALF_DAY) + (period === 'pm' ? HOURS_IN_HALF_DAY : 0)

  return { hours, minutes, seconds }
}

/** A date's time as this cycle writes it — the inverse of `parseTime`. */
export function formatTime(
  date: Date,
  granularity: TimeGranularity,
  hourCycle: HourCycle = 24
): string {
  const hours =
    hourCycle === 24
      ? date.getHours()
      : date.getHours() % HOURS_IN_HALF_DAY || HOURS_IN_HALF_DAY

  const base = `${pad(hours)}:${pad(date.getMinutes())}`

  return granularity === 'second' ? `${base}:${pad(date.getSeconds())}` : base
}

/** Which half of the day that date falls in, for a field that shows a period. */
export function periodOf(date: Date): DayPeriod {
  return date.getHours() < HOURS_IN_HALF_DAY ? 'am' : 'pm'
}

/**
 * Those parts, on that day.
 *
 * A time on its own is still a `Date` in this library — the same type the `DateField`
 * reports and the one a `DateTimeField` composes from both halves. The day it lands on is
 * given rather than assumed, so a caller merging a time into a date they already hold gets
 * that date back and not today's.
 */
export function withTime(day: Date, parts: TimeParts): Date {
  const date = new Date(day)
  date.setHours(parts.hours, parts.minutes, parts.seconds, 0)

  return date
}

/** The largest hour that cycle can name: 23, or 12. */
function hourCeiling(hourCycle: HourCycle): number {
  return hourCycle === 24 ? HOURS_IN_DAY - 1 : HOURS_IN_HALF_DAY
}

/** A completed part, held under its ceiling. Never raised — `00` is a keystroke. */
function clamp(raw: string, ceiling: number): string {
  return Number(raw) > ceiling ? pad(ceiling) : raw
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}
