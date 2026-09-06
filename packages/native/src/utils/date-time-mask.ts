import {
  DATE_LENGTH,
  datePlaceholder,
  formatDate,
  maskDate,
  parseDate,
} from './date-mask'
import type { DateOrder, SegmentLabels } from './date-mask'
import {
  formatTime,
  maskTime,
  parseTime,
  timeLength,
  timePlaceholder,
  withTime,
} from './time-mask'
import type { DayPeriod, HourCycle, TimeGranularity, TimeLabels } from './time-mask'

/** How a moment is written: which parts, in which order, with which marks between them. */
export type DateTimeShape = {
  order: DateOrder
  separator: string
  granularity: TimeGranularity
  hourCycle: HourCycle
}

/** Eight digits for the day, four or six for the time. */
const DATE_DIGITS = 8

/**
 * How many characters a finished moment is — the date, a space, and the time.
 *
 * The space is what a reader sees; it is **not** a third separator to configure. A date and
 * a time are two things written side by side, and every convention in the world puts a space
 * between them.
 */
export function dateTimeLength(granularity: TimeGranularity): number {
  return DATE_LENGTH + 1 + timeLength(granularity)
}

/** The shape a reader is being asked for — `JJ/MM/AAAA HH:mm`. */
export function dateTimePlaceholder(
  shape: DateTimeShape,
  labels: { date: SegmentLabels; time: TimeLabels }
): string {
  return `${datePlaceholder(shape.order, shape.separator, labels.date)} ${timePlaceholder(
    shape.granularity,
    labels.time
  )}`
}

/**
 * What the reader typed, as a moment is written.
 *
 * **The two masks, in sequence, over one stream of digits.** The first eight are the date
 * and the rest are the time, so `maskDate` and `maskTime` keep every rule they already have
 * — the month capped at 12, the day capped by its month, the minutes at 59, nothing raised
 * under the reader — and this adds one thing to them: where the date stops.
 *
 * Writing it any other way would mean a third mask with two more copies of those rules in
 * it, which is the drift this composition exists to avoid.
 */
export function maskDateTime(input: string, shape: DateTimeShape): string {
  const digits = input.replace(/\D/g, '')
  if (digits.length === 0) return ''

  const date = maskDate(digits.slice(0, DATE_DIGITS), shape.order, shape.separator)
  const time = maskTime(
    digits.slice(DATE_DIGITS),
    shape.granularity,
    shape.hourCycle
  )

  return time === '' ? date : `${date} ${time}`
}

/**
 * The moment those digits are, or `null` while they are not one yet.
 *
 * Both halves have to be whole and real: a complete date beside a half-typed time is not a
 * moment, and neither is the 31st of February at noon.
 */
export function parseDateTime(
  text: string,
  shape: DateTimeShape,
  period: DayPeriod = 'am'
): Date | null {
  const digits = text.replace(/\D/g, '')
  const timeDigits = shape.granularity === 'second' ? 6 : 4
  if (digits.length !== DATE_DIGITS + timeDigits) return null

  const day = parseDate(digits.slice(0, DATE_DIGITS), shape.order)
  const parts = parseTime(
    digits.slice(DATE_DIGITS),
    shape.granularity,
    shape.hourCycle,
    period
  )

  if (day === null || parts === null) return null

  return withTime(day, parts)
}

/** A moment as this shape writes it — the inverse of `parseDateTime`. */
export function formatDateTime(date: Date, shape: DateTimeShape): string {
  return `${formatDate(date, shape.order, shape.separator)} ${formatTime(
    date,
    shape.granularity,
    shape.hourCycle
  )}`
}
