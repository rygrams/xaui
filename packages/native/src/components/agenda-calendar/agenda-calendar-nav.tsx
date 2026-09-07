import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarViewSlotProps } from './agenda-calendar.type'

/**
 * The cluster on the trailing end: back, today, forward.
 *
 * It exists for R4's reason, the same one `ProgressBar.Header` gives: the gap between three
 * controls belongs to a root, and the header's own gap is the one between the month and
 * this whole group. Two gaps, two roots.
 */
export const AgendaCalendarNav = forwardRef<View, AgendaCalendarViewSlotProps>(
  function AgendaCalendarNav({ children, style, ...props }, ref) {
    const { navStyle } = useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[navStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

AgendaCalendarNav.displayName = 'XAUI.AgendaCalendar.Nav'
