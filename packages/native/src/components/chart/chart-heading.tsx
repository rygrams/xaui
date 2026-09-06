import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/**
 * The title, its description and a value, as one block.
 *
 * It exists for `ProgressBar.Header`'s reason: the gap between a title and its subtitle is
 * a different gap from the one between that block and the legend beside it, and two gaps
 * belong to two roots. It shrinks rather than pushing, so a long title wraps instead of
 * squeezing the legend off the row.
 */
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

ChartHeading.displayName = 'XAUI.Chart.Heading'
