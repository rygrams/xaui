import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/**
 * The row above the figure: what it is, and what a reader needs beside it.
 *
 * `space-between`, aligned to the top — so a two-line heading on the leading edge and a
 * legend or a button on the trailing one sit level at their first line rather than centred
 * against each other. R4: the gap between them is this root's, and neither child carries a
 * margin of its own.
 */
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

ChartHeader.displayName = 'XAUI.Chart.Header'
