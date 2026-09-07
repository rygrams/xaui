import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/**
 * The row under the figure: a legend, a range picker, a note.
 *
 * It wraps, unlike the header. What goes under a chart is usually a list — four legend
 * entries, six time ranges — and a list that will not wrap is a list with items off the
 * edge of the card.
 */
export const ChartFooter = forwardRef<View, ChartViewSlotProps>(function ChartFooter(
  { children, style, ...props },
  ref
) {
  const { footerStyle } = useChart()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[footerStyle, styleProps, style]}>
      {children}
    </View>
  )
})

ChartFooter.displayName = 'XAUI.Chart.Footer'
