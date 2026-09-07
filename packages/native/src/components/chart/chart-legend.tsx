import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChart } from './chart.context'
import type { ChartLegendItemProps, ChartLegendProps } from './chart.type'

/**
 * Which colour is which series.
 *
 * ```tsx
 * <Chart.Legend labels={['Organique', 'Payant']} />
 *
 * <Chart.Legend>
 *   <Chart.LegendItem index={0}>Organique — 292 000</Chart.LegendItem>
 * </Chart.Legend>
 * ```
 *
 * **The labels are the caller's and the colours are the frame's**, which is the whole reason
 * this is a slot rather than a prop on a figure: what a series is called is a sentence in the
 * caller's language, and which colour it got is arithmetic the palette already did.
 *
 * `labels` is the short form. Children are the long one — a legend that carries a value and
 * a share beside each name, which is what a donut usually wants under it.
 */
export const ChartLegend = forwardRef<View, ChartLegendProps>(function ChartLegend(
  { labels, children, style, ...props },
  ref
) {
  const { legendStyle } = useChart()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[legendStyle, styleProps, style]}>
      {children ??
        labels?.map((label, index) => (
          <ChartLegendItem key={label} index={index}>
            {label}
          </ChartLegendItem>
        ))}
    </View>
  )
})

ChartLegend.displayName = 'XAUI.Chart.Legend'

/**
 * One entry: a dot in the series' colour, and what it is called.
 *
 * `index` is how it finds its colour — the same index the figure walked its `yKeys` in — and
 * it is a number rather than a key because the palette is an ordered ramp and nothing else
 * about the series reaches here.
 */
export const ChartLegendItem = forwardRef<View, ChartLegendItemProps>(
  function ChartLegendItem({ index = 0, color, children, style, ...props }, ref) {
    const { legendItemStyle, legendDotStyle, legendLabelStyle, colors } = useChart()
    const [styleProps, rest] = useStyleProps(props)

    const dot = color ?? colors[index] ?? colors[0]

    return (
      <View ref={ref} {...rest} style={[legendItemStyle, styleProps, style]}>
        <View style={[legendDotStyle, { backgroundColor: dot }]} />
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text style={legendLabelStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    )
  }
)

ChartLegendItem.displayName = 'XAUI.Chart.LegendItem'
