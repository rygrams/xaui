import { Children, createContext, forwardRef, useContext, useMemo } from 'react'
import { Text, View } from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useChartInk } from './chart.hook'
import { useOptionalChart } from './chart.context'
import type { ChartLegendItemProps, ChartLegendProps } from './chart.type'

/**
 * R5 — what an entry needs, resolved once by the legend around it.
 *
 * It exists because a legend is the one slot that is **useful away from its frame**: a
 * widget puts the title in its header and the figure in its well, and the legend belongs
 * beside the title. So the entries read their colours from the legend rather than from a
 * frame that may not be there.
 */
type ChartLegendContextValue = {
  itemStyle: StyleProp<ViewStyle>
  dotStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  colors: string[]
}

const ChartLegendContext = createContext<ChartLegendContextValue | null>(null)
ChartLegendContext.displayName = 'XAUI.Chart.Legend.Context'

/** R10 — the resolved entry styles and the palette, for an entry of your own. */
export function useChartLegend(): ChartLegendContextValue {
  const value = useContext(ChartLegendContext)

  if (value === null) {
    throw new Error(
      'XAUI: useChartLegend must be called inside <Chart.Legend>. It reads the palette ' +
        'that legend walked, so it can only be called under one.'
    )
  }

  return value
}

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
 * **The labels are the caller's and the colours are the palette's**, which is the whole
 * reason this is a slot rather than a prop on a figure: what a series is called is a
 * sentence in the caller's language, and which colour it got is arithmetic the palette
 * already did.
 *
 * `labels` is the short form. Children are the long one — a legend that carries a value and
 * a share beside each name, which is what a donut usually wants under it.
 *
 * **Inside a `<Chart>` given a `seriesCount`, it takes the frame's palette; otherwise it walks
 * its own**, as long as `count`, its labels or its children — a frame walked for one series
 * would colour every entry after the first with a shade no series wears. The usual case for
 * its own is a `Widget`: the title and the legend sit in the widget's header and the figure
 * sits in its well, so the legend is nowhere near the frame — and then `variant`, `size`,
 * `color` and `count` are how it is told which ramp to walk. They have to match what the
 * figure was given, or the legend names the wrong colours.
 */
export const ChartLegend = forwardRef<View, ChartLegendProps>(function ChartLegend(
  { labels, children, variant, size, color, count, style, ...props },
  ref
) {
  const frame = useOptionalChart()
  const [styleProps, rest] = useStyleProps(props)

  // The figure's own count, so the ramp has the same number of stops it does. Unset with
  // children, `Children.count` is the honest guess: one entry per series is what a legend is.
  const series = Math.max(1, count ?? labels?.length ?? Children.count(children))

  const own = useChartInk({
    variant: variant ?? frame?.variant,
    size: size ?? frame?.size ?? 'md',
    color: color ?? frame?.color,
    // Never dimmed here: inside a frame, the frame dims itself and everything in it.
    isDisabled: false,
    count: series,
  })
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
    const { itemStyle, dotStyle, labelStyle, colors } = useChartLegend()
    const [styleProps, rest] = useStyleProps(props)

    const dot = color ?? colors[index] ?? colors[0]
    // R3 — `{name} ({count})` is an array of strings, and a bare string under a `View`
    // crashes on a device: anything that reads as text is set as one label.
    const text = childrenToString(children)

    return (
      <View ref={ref} {...rest} style={[itemStyle, styleProps, style]}>
        <View style={[dotStyle, { backgroundColor: dot }]} />
        {text === null ? children : <Text style={labelStyle}>{text}</Text>}
      </View>
    )
  }
)

ChartLegendItem.displayName = 'XAUI.Chart.LegendItem'
