import { forwardRef, useMemo } from 'react'
import { Text, View } from 'react-native'
import { weekdayNames } from '@xaui/native/system'
import { useStyleProps } from '@xaui/native/system'
import { useCalendar } from './calendar.context'
import type { CalendarViewSlotProps } from './calendar.type'
import { weekdayInitials } from './calendar.utils'

/**
 * The seven column headings, starting on the day the week does: two letters each, in
 * `caption`, in the page's ink rather than grey — Windows reads them as the grid's top
 * row. Hidden from a screen reader: each day says its own full date.
 */
export const CalendarWeekdays = forwardRef<View, CalendarViewSlotProps>(
  function CalendarWeekdays({ children, style, ...props }, ref) {
    const { weekdaysStyle, weekdayStyle, locale, firstDayOfWeek } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const names = useMemo(
      () => weekdayNames(locale, firstDayOfWeek).map(weekdayInitials),
      [locale, firstDayOfWeek]
    )

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
            <Text key={`${index}-${name}`} style={weekdayStyle}>
              {name}
            </Text>
          ))}
      </View>
    )
  }
)

CalendarWeekdays.displayName = 'XAUI.Tram.Calendar.Weekdays'
