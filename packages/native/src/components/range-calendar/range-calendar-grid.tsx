import { forwardRef } from 'react'
import type { View } from 'react-native'
import { Calendar } from '../calendar'
import { RangeCalendarDay } from './range-calendar-day'
import type { CalendarGridProps } from '../calendar'

/**
 * The six weeks, with range cells in them.
 *
 * It **is** `Calendar.Grid` — the same month arithmetic, the same seventh-of-a-row cell, the
 * same key — handed `RangeCalendar.Day` as its function child. That function child is the
 * composition point the `Calendar` published, and this is what it published it for.
 *
 * A function of your own still wins, exactly as it does on the calendar's own grid.
 */
export const RangeCalendarGrid = forwardRef<View, CalendarGridProps>(
  function RangeCalendarGrid({ children, ...props }, ref) {
    return (
      <Calendar.Grid ref={ref} {...props}>
        {children ?? (date => <RangeCalendarDay date={date} />)}
      </Calendar.Grid>
    )
  }
)

RangeCalendarGrid.displayName = 'XAUI.RangeCalendar.Grid'
