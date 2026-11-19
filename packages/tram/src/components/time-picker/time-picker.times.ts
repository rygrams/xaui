/**
 * The arithmetic of the time wheels: an hour, a minute and — on a twelve-hour clock — a
 * half of the day, and the time they make together. Pure, so it is tested on its own.
 */

/** Twelve hours and a half of the day, or twenty-four. Native's type, by value. */
export type HourCycle = 12 | 24

/** The half of the day a twelve-hour clock adds. */
export type DayPeriod = 'am' | 'pm'

/** The columns of a time, in the order a locale writes them. */
export type TimePart = 'hour' | 'minute' | 'period'

/** What the columns stand on. `hour` is as the clock shows it: 1–12, or 0–23. */
export type TimeSquares = { hour: number; minute: number; period: DayPeriod }

const HALF_DAY = 12
const MINUTES_IN_HOUR = 60

/** The hour, then the minute, then the half of the day — and no half on a 24-hour clock. */
const FALLBACK_ORDER: TimePart[] = ['hour', 'minute', 'period']

/**
 * The clock `locale` reads time on. `h11` and `h12` are twelve hours, `h23` and `h24`
 * twenty-four; where `Intl` is missing, twenty-four, which no reader mistakes.
 */
export function hourCycleOf(locale?: string): HourCycle {
  try {
    // `hourCycle` is ES2020's, past the `lib` this package is checked against.
    const { hourCycle, hour12 } = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
    }).resolvedOptions() as Intl.ResolvedDateTimeFormatOptions & {
      hourCycle?: string
    }

    if (hourCycle) return hourCycle === 'h11' || hourCycle === 'h12' ? 12 : 24

    return hour12 ? 12 : 24
  } catch {
    return 24
  }
}

/**
 * A minute step a column can be made of: a whole number from 1 to 30 that divides the
 * hour, so the column turns back to 00 without a gap. Anything else is the nearest step
 * under it that does — 7 is 6, 45 is 30.
 */
export function minuteStepOf(step: number): number {
  const whole = Number.isFinite(step) ? Math.floor(step) : 1
  let fitted = Math.min(Math.max(whole, 1), MINUTES_IN_HOUR / 2)

  while (MINUTES_IN_HOUR % fitted !== 0) fitted -= 1

  return fitted
}

/** The hour squares, in the order they turn: 12, 1 … 11 — or 0 … 23. */
export function hourSquares(cycle: HourCycle): number[] {
  if (cycle === 24) return Array.from({ length: 24 }, (_, hour) => hour)

  return [HALF_DAY, ...Array.from({ length: HALF_DAY - 1 }, (_, hour) => hour + 1)]
}

/** The minute squares, one every `step`. */
export function minuteSquares(step: number): number[] {
  const every = minuteStepOf(step)

  return Array.from({ length: MINUTES_IN_HOUR / every }, (_, index) => index * every)
}

/**
 * The squares a time stands on. A minute between two squares is the one under it: the
 * column has no square for 9:07 on a five-minute step, and 9:05 is the time it says.
 */
export function timeSquaresOf(
  date: Date,
  cycle: HourCycle,
  step: number
): TimeSquares {
  const every = minuteStepOf(step)
  const hours = date.getHours()
  const minute = Math.floor(date.getMinutes() / every) * every
  const period: DayPeriod = hours < HALF_DAY ? 'am' : 'pm'

  if (cycle === 24) return { hour: hours, minute, period }

  return { hour: hours % HALF_DAY || HALF_DAY, minute, period }
}

/**
 * The time the columns make, on `day`'s date, to the minute. Twelve on a twelve-hour
 * clock is the start of its half: 12 am is midnight, 12 pm is noon.
 */
export function composeTime(
  day: Date,
  { hour, minute, period }: TimeSquares,
  cycle: HourCycle
): Date {
  const hours =
    cycle === 24 ? hour : (hour % HALF_DAY) + (period === 'pm' ? HALF_DAY : 0)
  const time = new Date(day)

  time.setHours(hours, minute, 0, 0)

  return time
}

/**
 * The columns in the order `locale` writes a time on `cycle` — the half of the day
 * first in Korean or Chinese, last in English. A 24-hour clock has no half to place.
 */
export function timeColumnOrder(
  locale: string | undefined,
  cycle: HourCycle
): TimePart[] {
  const wanted = cycle === 12 ? FALLBACK_ORDER : FALLBACK_ORDER.slice(0, 2)
  let parts: string[]

  try {
    parts = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: cycle === 12,
    })
      .formatToParts(new Date(2000, 0, 1, 13, 30))
      .map(part => (part.type === 'dayPeriod' ? 'period' : part.type))
  } catch {
    return wanted
  }

  const order = parts.filter((type): type is TimePart =>
    wanted.includes(type as TimePart)
  )

  return order.length === wanted.length ? order : wanted
}

/**
 * The two halves of the day as `locale` writes them — "AM" and "PM", "a.m." and "p.m.",
 * "午前" and "午後". Where `Intl` is missing, or does not write one, "AM" and "PM".
 */
export function periodNames(locale?: string): Record<DayPeriod, string> {
  const nameAt = (hour: number, fallback: string) => {
    try {
      const part = new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: true })
        .formatToParts(new Date(2000, 0, 1, hour))
        .find(({ type }) => type === 'dayPeriod')

      return part?.value ?? fallback
    } catch {
      return fallback
    }
  }

  return { am: nameAt(9, 'AM'), pm: nameAt(21, 'PM') }
}
