import { forwardRef } from 'react'
import { Text } from 'react-native'
import { monthLabel } from '@xaui/native/system'
import { useStyleProps } from '@xaui/native/system'
import { useCalendar } from './calendar.context'
import type { CalendarTextSlotProps } from './calendar.type'

/**
 * The month on screen, named through the locale — "novembre 2026" — in the `title` role,
 * SemiLight. On the year and month panels it is the year alone. Children replace it.
 */
export const CalendarTitle = forwardRef<Text, CalendarTextSlotProps>(
  function CalendarTitle({ children, accessibilityRole, style, ...props }, ref) {
    const { titleStyle, month, locale, view } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const label =
      view === 'grid' ? monthLabel(month, locale) : String(month.getFullYear())

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? 'header'}
        numberOfLines={1}
        {...rest}
        style={[titleStyle, styleProps, style]}
      >
        {children ?? label}
      </Text>
    )
  }
)

CalendarTitle.displayName = 'XAUI.Tram.Calendar.Title'
