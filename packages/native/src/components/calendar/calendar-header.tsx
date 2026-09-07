import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useCalendar } from './calendar.context'
import type { CalendarViewSlotProps } from './calendar.type'

/**
 * The row above the grid: which month, and the way to another one.
 *
 * It publishes the header's glyph scale to the `Icon`s inside it, so a chevron matches the
 * title's type without being told to — and it lays its children out with `space-between`,
 * which is what lets the title sit anywhere in the row the caller writes it.
 */
export const CalendarHeader = forwardRef<View, CalendarViewSlotProps>(
  function CalendarHeader({ children, style, ...props }, ref) {
    const { headerStyle, glyph } = useCalendar()
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

CalendarHeader.displayName = 'XAUI.Calendar.Header'
