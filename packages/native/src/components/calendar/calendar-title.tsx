import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { monthLabel } from '../../utils/dates'
import { useCalendar } from './calendar.context'
import type { CalendarTextSlotProps } from './calendar.type'

/**
 * The month on screen, named.
 *
 * With no children it formats the month through the calendar's locale — "septembre 2026",
 * "September 2026" — and falls back to `9/2026` on an engine with no `Intl`, because a
 * locale that cannot be resolved is not a reason for a calendar to render nothing.
 *
 * Children replace it: a header that reads "Sep" beside a year picker is a real design.
 */
export const CalendarTitle = forwardRef<Text, CalendarTextSlotProps>(
  function CalendarTitle({ children, accessibilityRole, style, ...props }, ref) {
    const { titleStyle, month, locale } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        // A screen reader jumps between headings, and the month is the heading of a grid
        // of forty-two numbers that say nothing on their own.
        accessibilityRole={accessibilityRole ?? 'header'}
        style={[titleStyle, styleProps, style]}
        {...rest}
      >
        {children ?? monthLabel(month, locale)}
      </Text>
    )
  }
)

CalendarTitle.displayName = 'XAUI.Calendar.Title'
