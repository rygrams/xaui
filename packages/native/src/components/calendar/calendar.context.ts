import { createSlotContext } from '../../system/slot'
import type { CalendarContextValue } from './calendar.type'

/**
 * R10 — the resolved styles, the month on screen, the chosen day, and the two moves.
 *
 * A third party writing a day of its own needs all four: which day is chosen is the one
 * thing a cell cannot work out for itself, and stepping the month is the one thing a header
 * cannot.
 *
 * Outside a `<Calendar>` it throws by name.
 */
export const [CalendarProvider, useCalendar] =
  createSlotContext<CalendarContextValue>('Calendar')
