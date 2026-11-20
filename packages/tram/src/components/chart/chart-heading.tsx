import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/** The title, its description and a value, as one block with its own gap. It shrinks rather than pushing. */
export const ChartHeading = forwardRef<View, ChartViewSlotProps>(
  function ChartHeading({ children, style, ...props }, ref) {
    const { headingStyle } = useChart()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headingStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ChartHeading.displayName = 'XAUI.Tram.Chart.Heading'
