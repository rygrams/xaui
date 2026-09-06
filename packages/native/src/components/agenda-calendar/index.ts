import { AgendaCalendarDay } from './agenda-calendar-day'
import { AgendaCalendarHeader } from './agenda-calendar-header'
import { AgendaCalendarNav } from './agenda-calendar-nav'
import {
  AgendaCalendarNextButton,
  AgendaCalendarPreviousButton,
} from './agenda-calendar-nav-button'
import { AgendaCalendarRoot } from './agenda-calendar'
import { AgendaCalendarTitle } from './agenda-calendar-title'
import { AgendaCalendarTodayButton } from './agenda-calendar-today-button'
import { AgendaCalendarWeek } from './agenda-calendar-week'
import { AgendaCalendarWeekdays } from './agenda-calendar-weekdays'

export const AgendaCalendar = Object.assign(AgendaCalendarRoot, {
  Header: AgendaCalendarHeader,
  Title: AgendaCalendarTitle,
  Nav: AgendaCalendarNav,
  PreviousButton: AgendaCalendarPreviousButton,
  NextButton: AgendaCalendarNextButton,
  TodayButton: AgendaCalendarTodayButton,
  Weekdays: AgendaCalendarWeekdays,
  Week: AgendaCalendarWeek,
  Day: AgendaCalendarDay,
})

export { AgendaCalendarRoot } from './agenda-calendar'
export { AgendaCalendarDay } from './agenda-calendar-day'
export { AgendaCalendarHeader } from './agenda-calendar-header'
export { AgendaCalendarNav } from './agenda-calendar-nav'
export {
  AgendaCalendarNextButton,
  AgendaCalendarPreviousButton,
} from './agenda-calendar-nav-button'
export { AgendaCalendarTitle } from './agenda-calendar-title'
export { AgendaCalendarTodayButton } from './agenda-calendar-today-button'
export { AgendaCalendarWeek } from './agenda-calendar-week'
export { AgendaCalendarWeekdays } from './agenda-calendar-weekdays'
export { useAgendaCalendar } from './agenda-calendar.context'
export { agendaCalendarRecipe } from './agenda-calendar.recipe'
export type {
  AgendaCalendarContextValue,
  AgendaCalendarDayProps,
  AgendaCalendarNavButtonProps,
  AgendaCalendarProps,
  AgendaCalendarSize,
  AgendaCalendarSlot,
  AgendaCalendarTextSlotProps,
  AgendaCalendarVariant,
  AgendaCalendarViewSlotProps,
  AgendaCalendarWeekProps,
} from './agenda-calendar.type'
