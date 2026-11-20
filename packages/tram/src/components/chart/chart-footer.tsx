import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChart } from './chart.context'
import type { ChartViewSlotProps } from './chart.type'

/** The row under the figure: a legend, a range picker, a note. It wraps. */
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

ChartFooter.displayName = 'XAUI.Tram.Chart.Footer'
