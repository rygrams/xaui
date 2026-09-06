import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { AgendaCalendarDay } from './agenda-calendar-day'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarWeekProps } from './agenda-calendar.type'

/**
 * The seven days on screen.
 *
 * Children may be a **function**, for `Calendar.Grid`'s reason: seven cells are generated
 * from a date rather than written, so there is nothing to compose against. Given one it
 * renders each day; given nothing, the built-in day.
 */
export const AgendaCalendarWeek = forwardRef<View, AgendaCalendarWeekProps>(
  function AgendaCalendarWeek({ children, style, ...props }, ref) {
    const { weekStyle, days } = useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[weekStyle, styleProps, style]}>
        {days.map(date => (
          <View key={date.getTime()} style={CELL}>
            {typeof children === 'function' ? (
              children(date)
            ) : (
              <AgendaCalendarDay date={date} />
            )}
          </View>
        ))}
      </View>
    )
  }
)

AgendaCalendarWeek.displayName = 'XAUI.AgendaCalendar.Week'

/** A seventh of the row, with the cell centred in it — the `Calendar`'s column, exactly. */
const CELL = { width: '14.2857%', alignItems: 'center' } as const
