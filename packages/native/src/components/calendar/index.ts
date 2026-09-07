import { CalendarDay } from './calendar-day'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeader } from './calendar-header'
import { CalendarMonthPicker } from './calendar-month-picker'
import { CalendarNextButton, CalendarPreviousButton } from './calendar-nav-button'
import { CalendarRoot } from './calendar'
import { CalendarTitle } from './calendar-title'
import { CalendarWeekdays } from './calendar-weekdays'
import { CalendarYearPicker } from './calendar-year-picker'

export const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Title: CalendarTitle,
  PreviousButton: CalendarPreviousButton,
  NextButton: CalendarNextButton,
  Weekdays: CalendarWeekdays,
  Grid: CalendarGrid,
  Day: CalendarDay,
  YearPicker: CalendarYearPicker,
  MonthPicker: CalendarMonthPicker,
})

export { CalendarRoot } from './calendar'
export { CalendarDay } from './calendar-day'
export { CalendarGrid } from './calendar-grid'
export { CalendarHeader } from './calendar-header'
export { CalendarMonthPicker } from './calendar-month-picker'
export { CalendarNextButton, CalendarPreviousButton } from './calendar-nav-button'
export { CalendarTitle } from './calendar-title'
export { CalendarWeekdays } from './calendar-weekdays'
export { CalendarYearPicker } from './calendar-year-picker'
export { useCalendar } from './calendar.context'
export { calendarRecipe, SIZES as calendarCellSizes } from './calendar.recipe'
export type {
  CalendarContextValue,
  CalendarDayProps,
  CalendarGridProps,
  CalendarMonthPickerProps,
  CalendarNavButtonProps,
  CalendarProps,
  CalendarSize,
  CalendarSlot,
  CalendarTextSlotProps,
  CalendarVariant,
  CalendarView,
  CalendarViewSlotProps,
  CalendarYearPickerProps,
} from './calendar.type'
