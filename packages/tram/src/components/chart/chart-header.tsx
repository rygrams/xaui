import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/** The row above the figure, pushed apart and wrapping: a long title keeps the row and the legend drops under it. */
export const ChartHeader = forwardRef<View, ChartViewSlotProps>(function ChartHeader(
  { children, style, ...props },
  ref
) {
  const { headerStyle } = useChart()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
      {children}
    </View>
  )
})

ChartHeader.displayName = 'XAUI.Tram.Chart.Header'
