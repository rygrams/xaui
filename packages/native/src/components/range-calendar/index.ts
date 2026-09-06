import {
  CalendarHeader,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  CalendarWeekdays,
} from '../calendar'
import { RangeCalendarDay } from './range-calendar-day'
import { RangeCalendarGrid } from './range-calendar-grid'
import { RangeCalendarRoot } from './range-calendar'

/**
 * Five of the seven slots **are** the `Calendar`'s, re-exported rather than wrapped — the
 * `TextArea`'s arrangement, for the `TextArea`'s reason: a wrapper would add five components
 * to the tree to change a `displayName`, and the string it would change is the one that tells
 * you the truth.
 */
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
export { rangeCalendarRecipe } from './range-calendar.recipe'
export type {
  RangeCalendarContextValue,
  RangeCalendarDayProps,
  RangeCalendarProps,
} from './range-calendar.type'
export type { DateRange, RangePosition } from '../../utils/date-range'
