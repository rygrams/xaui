import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { weekdayNames } from '../../utils/dates'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarViewSlotProps } from './agenda-calendar.type'

/**
 * The seven column headings.
 *
 * Read off **the days on screen** rather than from a locale and a first-day number, unlike
 * the `Calendar`'s: the strip already knows which seven days it is showing, and formatting
 * those is one fewer place for the two to disagree about where a week starts.
 *
 * Hidden from the accessibility tree, for the `Calendar`'s reason: each day announces the
 * day it is.
 */
export const AgendaCalendarWeekdays = forwardRef<View, AgendaCalendarViewSlotProps>(
  function AgendaCalendarWeekdays({ children, style, ...props }, ref) {
    const { weekdaysStyle, weekdayStyle, days, locale } = useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const names = weekdayNames(locale, days[0].getDay() as 0)

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[weekdaysStyle, styleProps, style]}
      >
        {children ??
          names.map((name, index) => (
            <Text key={days[index].getTime()} style={weekdayStyle}>
              {name}
            </Text>
          ))}
      </View>
    )
  }
)

AgendaCalendarWeekdays.displayName = 'XAUI.AgendaCalendar.Weekdays'
