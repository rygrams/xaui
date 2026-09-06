import {
  DATE_LENGTH,
  datePlaceholder,
  formatDate,
  maskDate,
  parseDate,
} from './date-mask'
import type { DateOrder, SegmentLabels } from './date-mask'

/** Two ends, either of which may be missing while the other is not. */
export type DateRange = { start: Date | null; end: Date | null }

/** Eight digits per end, sixteen in all. */
const DATE_DIGITS = 8

/**
 * What is written between the two ends.
 *
 * An en dash with a space either side, which is what a range is written with in every
 * convention that has one — and not a hyphen, which is already a date separator in half the
 * locales this field serves.
 */
export const RANGE_SEPARATOR = ' – '

/** How many characters a finished range is, so a field can stop the caret at its end. */
export function dateRangeLength(): number {
  return DATE_LENGTH * 2 + RANGE_SEPARATOR.length
}

/** The shape a reader is being asked for — `JJ/MM/AAAA – JJ/MM/AAAA`. */
export function dateRangePlaceholder(
  order: DateOrder,
  separator: string,
  labels: SegmentLabels
): string {
  const one = datePlaceholder(order, separator, labels)

  return `${one}${RANGE_SEPARATOR}${one}`
}

/**
 * What the reader typed, as a range is written.
 *
 * **`maskDate` twice, over one stream of digits.** The first eight are the start and the
 * rest are the end, so every rule that mask already has is kept rather than copied — the
 * `DateTimeField`'s composition, for the same reason.
 *
 * The dash appears the moment the ninth digit does, which is what tells a reader they have
 * left the first date and are typing the second.
 */
export function maskDateRange(
  input: string,
  order: DateOrder,
  separator: string
): string {
  const digits = input.replace(/\D/g, '')
  if (digits.length === 0) return ''

  const start = maskDate(digits.slice(0, DATE_DIGITS), order, separator)
  const end = maskDate(digits.slice(DATE_DIGITS), order, separator)

  return end === '' ? start : `${start}${RANGE_SEPARATOR}${end}`
}

/**
 * The two ends those digits are, each `null` until it is a whole and real date.
 *
 * **The ends are read independently**, and that is the point: a reader who has finished the
 * start and is halfway through the end has a start, and a caller filtering a list can use it
 * straight away. A single `null` for the pair would throw that away and make the field feel
 * like it does nothing until the last digit.
 *
 * Whether the end is *after* the start is not decided here. That is a rule about the range
 * rather than about what was typed, it differs by feature — some ranges may be a single day
 * and some may not — and `isInvalid` with an error is where a caller says so.
 */
export function parseDateRange(text: string, order: DateOrder): DateRange {
  const digits = text.replace(/\D/g, '')

  return {
    start: parseDate(digits.slice(0, DATE_DIGITS), order),
    end: parseDate(digits.slice(DATE_DIGITS, DATE_DIGITS * 2), order),
  }
}

/** A range as this order writes it — the inverse of `parseDateRange`. */
export function formatDateRange(
  range: DateRange,
  order: DateOrder,
  separator: string
): string {
  const start = range.start ? formatDate(range.start, order, separator) : ''
  const end = range.end ? formatDate(range.end, order, separator) : ''

  if (start === '') return ''

  return end === '' ? start : `${start}${RANGE_SEPARATOR}${end}`
}

/** Whether two ranges name the same two days, either of which may be absent. */
export function isSameRange(a: DateRange, b: DateRange): boolean {
  return isSameDay(a.start, b.start) && isSameDay(a.end, b.end)
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) return a === b

  return a.getTime() === b.getTime()
}
