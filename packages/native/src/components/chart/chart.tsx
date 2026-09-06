import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useChartInk } from './chart.hook'
import { ChartProvider } from './chart.context'
import type { ChartFrameProps } from './chart.type'

/**
 * The card a figure is read on: a title above it, a legend under it.
 *
 * ```tsx
 * <Chart>
 *   <Chart.Header>
 *     <Chart.Heading>
 *       <Chart.Title>Source du trafic</Chart.Title>
 *       <Chart.Description>Sessions</Chart.Description>
 *     </Chart.Heading>
 *     <Chart.Legend labels={['Organique', 'Payant']} />
 *   </Chart.Header>
 *
 *   <LineChart data={rows} xKey="month" yKeys={['organic', 'paid']} />
 * </Chart>
 * ```
 *
 * **The five figures draw no ground of their own**, and this is where that decision is paid
 * back: a chart on a screen is a card with words around it, and those words are a title, a
 * subtitle, a number and a legend — every one of them a `Text` that should take the theme's
 * type rather than a prop on a figure.
 *
 * **The frame owns the appearance, and the figure inside takes it.** `variant`, `size` and
 * `color` are handed down, so the legend's dots and the figure's series are the same colours
 * in the same order without either being told twice — which is the whole reason
 * `Chart.Legend` can exist at all. A figure that names its own still wins.
 *
 * A figure outside a frame is unchanged: this is optional, like the `ListGroup` around a
 * `List`.
 */
export const ChartRoot = forwardRef<View, ChartFrameProps>(function Chart(
  {
    children,
    variant,
    size = 'md',
    color,
    seriesCount = 0,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const { styles, colors } = useChartInk({
    variant,
    size,
    color,
    isDisabled,
    // The frame cannot count the figure's series — it has not rendered yet, and the keys
    // are the figure's props. `seriesCount` is what a legend needs and nothing else does,
    // which is why it is on the frame rather than inferred.
    count: Math.max(seriesCount, 1),
  })

  const context = useMemo(
    () => ({
      headerStyle: styles.header,
      headingStyle: styles.heading,
      footerStyle: styles.footer,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      valueStyle: styles.value,
      legendStyle: styles.legend,
      legendItemStyle: styles.legendItem,
      legendDotStyle: styles.legendDot,
      legendLabelStyle: styles.legendLabel,
      colors,
      variant,
      size,
      color,
      isDisabled,
    }),
    [styles, colors, variant, size, color, isDisabled]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <ChartProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </ChartProvider>
  )
})

ChartRoot.displayName = 'XAUI.Chart.Root'
