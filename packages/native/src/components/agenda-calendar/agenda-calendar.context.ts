import { createSlotContext } from '../../system/slot'
import type { AgendaCalendarContextValue } from './agenda-calendar.type'

/**
 * R10 — the seven days on screen, the chosen one, which of them carry a mark, and the three
 * moves. Enough to write a strip of your own: a row of names under the numbers, a count
 * instead of a dot, a second mark in another colour.
 *
 * Outside an `<AgendaCalendar>` it throws by name.
 */
export const [AgendaCalendarProvider, useAgendaCalendar] =
  createSlotContext<AgendaCalendarContextValue>('AgendaCalendar')
