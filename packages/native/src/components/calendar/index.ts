import { CalendarDay } from './calendar-day'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeader } from './calendar-header'
import { CalendarNextButton, CalendarPreviousButton } from './calendar-nav-button'
import { CalendarRoot } from './calendar'
import { CalendarTitle } from './calendar-title'
import { CalendarWeekdays } from './calendar-weekdays'

export const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Title: CalendarTitle,
  PreviousButton: CalendarPreviousButton,
  NextButton: CalendarNextButton,
  Weekdays: CalendarWeekdays,
  Grid: CalendarGrid,
  Day: CalendarDay,
})

export { CalendarRoot } from './calendar'
export { CalendarDay } from './calendar-day'
export { CalendarGrid } from './calendar-grid'
export { CalendarHeader } from './calendar-header'
export { CalendarNextButton, CalendarPreviousButton } from './calendar-nav-button'
export { CalendarTitle } from './calendar-title'
export { CalendarWeekdays } from './calendar-weekdays'
export { useCalendar } from './calendar.context'
export { calendarRecipe } from './calendar.recipe'
export type {
  CalendarContextValue,
  CalendarDayProps,
  CalendarGridProps,
  CalendarNavButtonProps,
  CalendarProps,
  CalendarSize,
  CalendarSlot,
  CalendarTextSlotProps,
  CalendarVariant,
  CalendarViewSlotProps,
} from './calendar.type'
