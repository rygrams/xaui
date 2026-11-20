import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useChartInk } from './chart.hook'
import { ChartProvider } from './chart.context'
import { DEFAULT_SIZE } from './chart.recipe'
import type { ChartFrameProps } from './chart.type'

/**
 * The words around a figure — the Native `Chart`'s API, drawn in Metro: **no shell**. No
 * ground, no line, no corner; the figure sits on the page, as the Finance app's did, and a
 * caller who wants a card puts the frame in a Tram `Card`.
 *
 * ```tsx
 * <Chart seriesCount={2} accent="cobalt">
 *   <Chart.Header>
 *     <Chart.Heading>
 *       <Chart.Title>données</Chart.Title>
 *       <Chart.Description>Go par mois</Chart.Description>
 *     </Chart.Heading>
 *     <Chart.Legend labels={['wi-fi', 'mobile']} />
 *   </Chart.Header>
 *
 *   <LineChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
 * </Chart>
 * ```
 *
 * The frame owns the appearance and the figure inside takes it: `accent`, `size` and
 * `color` are handed down, so the legend's squares and the figure's series are the same
 * colours in the same order. A figure that names its own still wins.
 */
export const ChartRoot = forwardRef<View, ChartFrameProps>(function Chart(
  {
    children,
    accent,
    size = DEFAULT_SIZE,
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
    accent,
    size,
    color,
    isDisabled,
    // The frame cannot count the figure's series: it has not rendered it, and the keys
    // are the figure's props. A legend needs this, and nothing else does.
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
      seriesCount,
      accent,
      size,
      color,
      isDisabled,
    }),
    [styles, colors, seriesCount, accent, size, color, isDisabled]
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

ChartRoot.displayName = 'XAUI.Tram.Chart.Root'
