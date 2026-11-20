import { Children, createContext, forwardRef, useContext, useMemo } from 'react'
import { Text, View } from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { useFigureInk } from './chart.hook'
import { useOptionalChart } from './chart.context'
import type { ChartLegendItemProps, ChartLegendProps } from './chart.type'

/**
 * What an entry needs, resolved once by the legend around it — so a legend works away
 * from its frame too, in a `Widget`'s header beside a figure in its well.
 */
type ChartLegendContextValue = {
  itemStyle: StyleProp<ViewStyle>
  /** The entry's square — Native's name for its dot. */
  dotStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  colors: string[]
}

const ChartLegendContext = createContext<ChartLegendContextValue | null>(null)
ChartLegendContext.displayName = 'XAUI.Tram.Chart.Legend.Context'

/** The resolved entry styles and the palette, for an entry of your own. */
export function useChartLegend(): ChartLegendContextValue {
  const value = useContext(ChartLegendContext)

  if (value === null) {
    throw new Error(
      'XAUI Tram: useChartLegend must be called inside <Chart.Legend>. It reads the ' +
        'palette that legend walked, so it can only be called under one.'
    )
  }

  return value
}

/**
 * Which colour is which series: a square of 10 in the series' colour, and its name on
 * `caption`.
 *
 * ```tsx
 * <Chart.Legend labels={['wi-fi', 'mobile']} />
 * ```
 *
 * Inside a `<Chart>` given a `seriesCount`, it takes the frame's palette. Otherwise it walks
 * its own, as long as `count`, its labels or its children, from `accent`, `size` and
 * `color` — the frame's where it names none — which have to be the figure's.
 */
export const ChartLegend = forwardRef<View, ChartLegendProps>(function ChartLegend(
  { labels, children, accent, size, color, count, style, ...props },
  ref
) {
  const frame = useOptionalChart()
  const [styleProps, rest] = useStyleProps(props)

  const series = Math.max(1, count ?? labels?.length ?? Children.count(children))

  // Never dimmed here: inside a frame, the frame dims itself and everything in it.
  const own = useFigureInk({ accent, size, color, isDisabled: false, count: series })
  // The frame's palette only when it was told how many series there are: walked for one,
  // it would colour the second entry with a shade no series wears.
  const colors = frame !== null && frame.seriesCount > 0 ? frame.colors : own.colors

  const context = useMemo<ChartLegendContextValue>(
    () =>
      frame === null
        ? {
            itemStyle: own.styles.legendItem,
            dotStyle: own.styles.legendDot,
            labelStyle: own.styles.legendLabel,
            colors,
          }
        : {
            itemStyle: frame.legendItemStyle,
            dotStyle: frame.legendDotStyle,
            labelStyle: frame.legendLabelStyle,
            colors,
          },
    [frame, own, colors]
  )

  return (
    <ChartLegendContext.Provider value={context}>
      <View
        ref={ref}
        {...rest}
        style={[frame?.legendStyle ?? own.styles.legend, styleProps, style]}
      >
        {children ??
          labels?.map((label, index) => (
            <ChartLegendItem key={label} index={index}>
              {label}
            </ChartLegendItem>
          ))}
      </View>
    </ChartLegendContext.Provider>
  )
})

ChartLegend.displayName = 'XAUI.Tram.Chart.Legend'

/** One entry: a square in the series' colour, and what it is called. */
export const ChartLegendItem = forwardRef<View, ChartLegendItemProps>(
  function ChartLegendItem({ index = 0, color, children, style, ...props }, ref) {
    const { itemStyle, dotStyle, labelStyle, colors } = useChartLegend()
    const [styleProps, rest] = useStyleProps(props)

    const square = color ?? colors[index] ?? colors[0]
    // `{name} ({count})` is an array of strings, and a bare string under a `View` crashes on
    // a device: anything that reads as text is set as one label.
    const text = childrenToString(children)

    return (
      <View ref={ref} {...rest} style={[itemStyle, styleProps, style]}>
        <View style={[dotStyle, { backgroundColor: square }]} />
        {text === null ? children : <Text style={labelStyle}>{text}</Text>}
      </View>
    )
  }
)

ChartLegendItem.displayName = 'XAUI.Tram.Chart.LegendItem'
