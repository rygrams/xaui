import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarViewSlotProps } from './agenda-calendar.type'

/**
 * The row above the strip.
 *
 * `space-between` and nothing else, which is what lets the month sit on the leading edge
 * with the controls clustered on the trailing one — the shape this component is usually
 * drawn in, and one a header that centred its title could not make.
 */
export const AgendaCalendarHeader = forwardRef<View, AgendaCalendarViewSlotProps>(
  function AgendaCalendarHeader({ children, style, ...props }, ref) {
    const { headerStyle, glyph } = useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <IconContext.Provider value={glyph}>
        <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
          {children}
        </View>
      </IconContext.Provider>
    )
  }
)

AgendaCalendarHeader.displayName = 'XAUI.AgendaCalendar.Header'
