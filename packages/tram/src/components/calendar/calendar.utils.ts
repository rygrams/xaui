/** The month a date is in, at its first day — the only form the grid is built from. */
export function firstOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Which way the grid moved, from the month it showed to the month it shows: `1` forward,
 * `-1` back, `0` for the same month. What the page slides by — the next month rises from
 * below, the one before drops in from above.
 */
export function pageDirection(from: Date | undefined, to: Date): -1 | 0 | 1 {
  if (!from) return 0

  const steps =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())

  return steps === 0 ? 0 : steps > 0 ? 1 : -1
}

/**
 * The column heading as the Windows calendar writes it: two letters, no full stop —
 * "lu", "ma" from "lun.", "mar.", "Su", "Mo" from "Sun", "Mon". The locale still names the
 * day; only its length is the drawing's.
 */
export function weekdayInitials(name: string): string {
  return name.replace(/\./g, '').slice(0, 2)
}

/**
 * "dimanche 6 septembre 2026", or the engine's own English where `Intl` cannot — a day a
 * screen reader cannot name in the locale is still better named than read as "6".
 */
export function fullDate(date: Date, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch {
    return date.toDateString()
  }
}

/**
 * The device's locale, or English. `resolvedOptions()` needs no platform module, and is
 * absent on a Hermes build with no ICU — where a locale cannot be resolved anyway.
 */
export function deviceLocale(): string {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().locale
  } catch {
    return 'en'
  }
}
