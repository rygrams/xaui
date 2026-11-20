import { createSlotContext } from '@xaui/native/system'
import type { RangeCalendarContextValue } from './range-calendar.type'

/** The period and where each day falls in it. Outside a `<RangeCalendar>` it throws. */
export const [RangeCalendarProvider, useRangeCalendar] =
  createSlotContext<RangeCalendarContextValue>('Tram.RangeCalendar')
