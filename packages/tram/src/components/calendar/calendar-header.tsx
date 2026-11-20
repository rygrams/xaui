import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCalendar } from './calendar.context'
import type { CalendarViewSlotProps } from './calendar.type'

/**
 * The row above the grid, 48 tall, laid out with `space-between` and nothing else: where
 * the title and the chevrons sit is the order the caller writes them in. Windows puts the
 * title at the start and both chevrons at the end.
 */
export const CalendarHeader = forwardRef<View, CalendarViewSlotProps>(
  function CalendarHeader({ children, style, ...props }, ref) {
    const { headerStyle } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

CalendarHeader.displayName = 'XAUI.Tram.Calendar.Header'
