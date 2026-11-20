import { forwardRef } from 'react'
import type { View } from 'react-native'
import { CalendarGrid } from '../calendar/calendar-grid'
import type { CalendarGridProps } from '../calendar'
import { RangeCalendarDay } from './range-calendar-day'

/** The Tram `Calendar.Grid`, handed `RangeCalendar.Day`. A function of one's own wins. */
export const RangeCalendarGrid = forwardRef<View, CalendarGridProps>(
  function RangeCalendarGrid({ children, ...props }, ref) {
    return (
      <CalendarGrid ref={ref} {...props}>
        {children ?? (date => <RangeCalendarDay date={date} />)}
      </CalendarGrid>
    )
  }
)

RangeCalendarGrid.displayName = 'XAUI.Tram.RangeCalendar.Grid'
