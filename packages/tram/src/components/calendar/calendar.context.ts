import { createSlotContext } from '@xaui/native/system'
import type { CalendarContextValue } from './calendar.type'

/**
 * The resolved styles, the month on screen, the chosen day and the moves. Exported so a
 * cell or a header of one's own reads the same calendar. Outside a `<Calendar>` it throws
 * by name.
 */
export const [CalendarProvider, useCalendar] =
  createSlotContext<CalendarContextValue>('Tram.Calendar')
