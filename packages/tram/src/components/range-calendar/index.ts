import {
  CalendarHeader,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  CalendarWeekdays,
} from '../calendar'
import { RangeCalendarRoot } from './range-calendar'
import { RangeCalendarDay } from './range-calendar-day'
import { RangeCalendarGrid } from './range-calendar-grid'

/** Five of the seven slots **are** the Tram `Calendar`'s, re-exported, as in Native. */
export const RangeCalendar = Object.assign(RangeCalendarRoot, {
  Header: CalendarHeader,
  Title: CalendarTitle,
  PreviousButton: CalendarPreviousButton,
  NextButton: CalendarNextButton,
  Weekdays: CalendarWeekdays,
  Grid: RangeCalendarGrid,
  Day: RangeCalendarDay,
})

export { RangeCalendarRoot } from './range-calendar'
export { RangeCalendarDay } from './range-calendar-day'
export { RangeCalendarGrid } from './range-calendar-grid'
export { useRangeCalendar } from './range-calendar.context'
export type {
  RangeCalendarContextValue,
  RangeCalendarDayProps,
  RangeCalendarProps,
} from './range-calendar.type'
export type { DateRange, RangePosition } from '@xaui/native/system'
