import { forwardRef } from 'react'
import type { View } from 'react-native'
import { Calendar, calendarCellSizes } from '../calendar'
import { useDatePicker } from './date-picker.context'
import type { DatePickerCalendarProps } from './date-picker.type'

/**
 * The month inside the panel.
 *
 * **It is a `Calendar`, bound.** The value, the bounds, the locale, the first day of the
 * week and the tint all come from the picker, which is why they are missing from this slot's
 * props: two sources for one of them would be two answers to one question, and the field
 * would eventually read a day the grid did not think was chosen.
 *
 * The month on screen is *not* bound. It is the calendar's own state, so opening the panel a
 * second time after paging leaves you where you were — and choosing a day in another month
 * still works, because paging is not choosing.
 *
 * With no children it renders the header, the weekday row and the grid, which is what a
 * picker wants every time. Children replace all three: a year picker above the grid, a
 * "Today" button under it.
 *
 * **It is given an explicit width**, and that is the one line here that is not wiring. The
 * panel is sized to its content rather than to the field that opens it — a month grid
 * squeezed into a narrow field would crush its cells — and a grid of seven percentage
 * columns inside a box with no width of its own measures zero. Seven cells is the width the
 * grid was always going to be; this is only saying so out loud.
 */
const COLUMNS = 7
export const DatePickerCalendar = forwardRef<View, DatePickerCalendarProps>(
  function DatePickerCalendar({ children, ...props }, ref) {
    const { calendar, value, isDisabled, select } = useDatePicker()

    return (
      <Calendar
        ref={ref}
        width={COLUMNS * calendarCellSizes[calendar.size].cell}
        variant={calendar.variant}
        size={calendar.size}
        color={calendar.color}
        value={value}
        onValueChange={select}
        // The picker's default month is the chosen day's, which is the `Calendar`'s own
        // default — passing it again would freeze the month at whatever it was on mount.
        minValue={calendar.minValue}
        maxValue={calendar.maxValue}
        firstDayOfWeek={calendar.firstDayOfWeek}
        locale={calendar.locale}
        isDisabled={isDisabled}
        {...props}
      >
        {children ?? (
          <>
            <Calendar.Header>
              <Calendar.PreviousButton />
              <Calendar.Title />
              <Calendar.NextButton />
            </Calendar.Header>
            <Calendar.Weekdays />
            <Calendar.Grid />
          </>
        )}
      </Calendar>
    )
  }
)

DatePickerCalendar.displayName = 'XAUI.DatePicker.Calendar'
