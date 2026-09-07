import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { weekdayNames } from '../../utils/dates'
import { useCalendar } from './calendar.context'
import type { CalendarViewSlotProps } from './calendar.type'

/**
 * The seven column headings, starting on the day the week does.
 *
 * They are **not** in the grid. A row of names that scrolled or paged with the days would
 * be seven labels re-rendered per month for no reason, and a screen reader would read them
 * again every time.
 *
 * `accessibilityElementsHidden` for that reason too: the names are for the eye, and each
 * day announces its own full date.
 */
export const CalendarWeekdays = forwardRef<View, CalendarViewSlotProps>(
  function CalendarWeekdays({ children, style, ...props }, ref) {
    const { weekdaysStyle, weekdayStyle, locale, firstDayOfWeek } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[weekdaysStyle, styleProps, style]}
      >
        {children ??
          weekdayNames(locale, firstDayOfWeek).map(name => (
            <Text key={name} style={weekdayStyle}>
              {name}
            </Text>
          ))}
      </View>
    )
  }
)

CalendarWeekdays.displayName = 'XAUI.Calendar.Weekdays'
