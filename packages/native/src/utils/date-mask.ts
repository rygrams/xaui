import { daysInMonth } from './dates'

/**
 * Which of the three parts comes first, and which second.
 *
 * Three orders rather than every permutation, because these are the three the world writes:
 * day-first across most of Europe, month-first in the United States, year-first in East
 * Asia and in ISO 8601.
 */
export type DateOrder = 'DMY' | 'MDY' | 'YMD'

/** One part of a date, and how wide it is written. */
type Segment = { part: 'day' | 'month' | 'year'; width: number }

const SEGMENTS: Record<DateOrder, ReadonlyArray<Segment>> = {
  DMY: [
    { part: 'day', width: 2 },
    { part: 'month', width: 2 },
    { part: 'year', width: 4 },
  ],
  MDY: [
    { part: 'month', width: 2 },
    { part: 'day', width: 2 },
    { part: 'year', width: 4 },
  ],
  YMD: [
    { part: 'year', width: 4 },
    { part: 'month', width: 2 },
    { part: 'day', width: 2 },
  ],
}

/** Two separators for three parts, so the whole is eight digits plus two marks. */
export const DATE_LENGTH = 10

/**
 * The order that locale writes a date in.
 *
 * Read out of `Intl` rather than off a table of countries: the platform already ships the
 * answer for every locale it supports, and a table here would be a second one, shorter and
 * out of date. A locale `Intl` does not know falls back to day-first, which is what most of
 * the world writes.
 */
export function dateOrderFor(locale: string): DateOrder {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(2001, 1, 3))
  const order = parts
    .filter(
      part => part.type === 'day' || part.type === 'month' || part.type === 'year'
    )
    .map(part => part.type[0].toUpperCase())
    .join('')

  return order === 'MDY' || order === 'YMD' || order === 'DMY' ? order : 'DMY'
}

/**
 * The separator that locale writes between the parts.
 *
 * The same argument as the order, and the same fallback. A locale that writes its date with
 * a word between the parts — some do — has no single separator, so anything that is not one
 * character comes back as a slash.
 */
export function dateSeparatorFor(locale: string): string {
  const literal = new Intl.DateTimeFormat(locale)
    .formatToParts(new Date(2001, 1, 3))
    .find(part => part.type === 'literal')?.value

  return literal?.length === 1 ? literal : '/'
}

/** What a placeholder calls each part. The letters are a language's, so they are given. */
export type SegmentLabels = { day: string; month: string; year: string }

/** The shape a reader is being asked for — `JJ/MM/AAAA`, `MM/DD/YYYY`. */
export function datePlaceholder(
  order: DateOrder,
  separator: string,
  labels: SegmentLabels
): string {
  return SEGMENTS[order].map(segment => labels[segment.part]).join(separator)
}

/**
 * What the reader typed, as a date is written.
 *
 * Digits only — everything else is dropped, including the separator, which is **put back**
 * rather than kept. That is what makes the field survive a paste, a keyboard that offers its
 * own punctuation, and a backspace over a separator: there is one representation, the digits
 * in order, and this is the only thing that turns them into text.
 *
 * **Each part is clamped as it completes**, and only then: a month is capped at 12 once its
 * second digit lands, so `9` on its way to `09` is left alone while `95` becomes `12`. A day
 * is capped at the length of its month when the month and the year are already known, and at
 * 31 otherwise — so `31` in a February that has not been typed yet stands, and becomes `28`
 * as soon as the month says February.
 *
 * A part is never *raised*: `00` stays `00` rather than becoming `01`, because a reader
 * halfway through typing `01` has typed a zero and moving it under them loses the keystroke.
 */
export function maskDate(
  input: string,
  order: DateOrder,
  separator: string
): string {
  const digits = input.replace(/\D/g, '').slice(0, 8)
  if (digits.length === 0) return ''

  const segments = SEGMENTS[order]
  const values: Partial<Record<Segment['part'], string>> = {}
  const written: string[] = []

  let at = 0
  for (const segment of segments) {
    if (at >= digits.length) break

    const raw = digits.slice(at, at + segment.width)
    at += segment.width

    const complete = raw.length === segment.width
    const value = complete ? clampSegment(segment.part, raw, values) : raw

    values[segment.part] = value
    written.push(value)
  }

  return written.join(separator)
}

/**
 * The date those digits are, or `null` while they are not one yet.
 *
 * `null` covers both "not finished" and "not a real day", and deliberately so: a caller
 * holding a `Date | null` needs no third state, and the two cases produce the same empty
 * value on the way out. A year is taken as written — `0023` is the year 23, not 2023 — since
 * guessing a century is the kind of help that is wrong once and then silently wrong forever.
 */
export function parseDate(text: string, order: DateOrder): Date | null {
  const digits = text.replace(/\D/g, '')
  if (digits.length !== 8) return null

  const parts: Partial<Record<Segment['part'], number>> = {}
  let at = 0
  for (const segment of SEGMENTS[order]) {
    parts[segment.part] = Number(digits.slice(at, at + segment.width))
    at += segment.width
  }

  const { day = 0, month = 0, year = 0 } = parts
  if (month < 1 || month > 12) return null
  if (day < 1 || day > daysInMonth(year, month - 1)) return null

  const date = new Date(year, month - 1, day)
  // A two-digit year would otherwise land in the last century: `new Date(23, …)` is 1923.
  date.setFullYear(year)

  return date
}

/** A date as this order writes it — the inverse of `parseDate`, and the caller's way in. */
export function formatDate(date: Date, order: DateOrder, separator: string): string {
  const parts = {
    day: pad(date.getDate(), 2),
    month: pad(date.getMonth() + 1, 2),
    year: pad(date.getFullYear(), 4),
  }

  return SEGMENTS[order].map(segment => parts[segment.part]).join(separator)
}

/** A completed part, held inside the range it can actually name. */
function clampSegment(
  part: Segment['part'],
  raw: string,
  known: Partial<Record<Segment['part'], string>>
): string {
  const value = Number(raw)

  if (part === 'month') return value > 12 ? '12' : raw
  if (part === 'year') return raw

  // The month and the year may or may not have been typed yet — in `YMD` they always have,
  // in `DMY` they never have. 31 is the honest ceiling until they are known.
  const month = known.month === undefined ? undefined : Number(known.month)
  const year = known.year === undefined ? undefined : Number(known.year)
  const ceiling =
    month === undefined || month < 1 || month > 12
      ? 31
      : daysInMonth(year ?? 2000, month - 1)

  return value > ceiling ? pad(ceiling, 2) : raw
}

function pad(value: number, width: number): string {
  return String(value).padStart(width, '0')
}
