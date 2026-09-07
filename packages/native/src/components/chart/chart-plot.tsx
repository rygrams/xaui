import { forwardRef, useMemo, useState } from 'react'
import type { ForwardedRef, ReactElement } from 'react'
import { Text, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { Line, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import {
  bandScale,
  extent,
  linearScale,
  niceScale,
  pointScale,
} from '../../utils/chart-scale'
import { useChartInk } from './chart.hook'
import { useOptionalChart } from './chart.context'
import type { Span } from '../../utils/chart-scale'
import type { ChartDatum, ChartPlot, ChartPlotProps } from './chart.type'

/**
 * How much room the labels get, in points.
 *
 * Measured rather than laid out: the axis text is React Native's, drawn beside the SVG
 * rather than inside it, so the plot has to know how much of its box the labels will take
 * before either is rendered. A y label of "1 200 000" is the case this loses to, and the
 * answer there is `formatY` — which is why it exists.
 */
const Y_AXIS_WIDTH = 40
const X_AXIS_HEIGHT = 20

/** Air above the tallest point, so a line at the domain's top does not touch the edge. */
const TOP_PADDING = 8

/**
 * The plot every cartesian chart is drawn in: the frame, the grid, the axes, the scales and
 * the palette.
 *
 * ```tsx
 * <ChartPlot data={rows} xKey="month" yKeys={['revenue']}>
 *   {({ series, frame }) => <Path d={linePath(series[0].points)} stroke={series[0].color} />}
 * </ChartPlot>
 * ```
 *
 * **It is the shared half of `LineChart`, `AreaChart` and `BarChart`**, the way
 * `selectRecipe` is the shared half of the `Select` and the `Autocomplete`. Three charts
 * with three axis tables would be three to keep in step, and the drift would show as a line
 * chart and a bar chart on one dashboard with labels at two sizes.
 *
 * **The maths is `utils/`, and it is tested.** `niceScale` rounds the domain out to steps a
 * reader recognises, `linearScale` maps a value onto the plot, `bandScale` divides the
 * bottom into slots, and `chart-path` turns points into a `d`. None of it is in this file,
 * which is what lets a monotone curve that must never dip below its data be a test rather
 * than a screenshot.
 *
 * **The labels are React Native, not SVG.** `<Text>` beside the canvas inherits the theme's
 * font, its scaling and its colour, where `<Text>` inside an `<Svg>` needs a font file
 * loaded and ignores the platform's text size. The plot reserves the room for them.
 *
 * **It measures itself**, because a chart's width is its parent's and there is no layout
 * pass an SVG can ask for. Nothing is drawn until it knows, which is one frame.
 */
export const ChartPlotRoot = forwardRef(function ChartPlot<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    data,
    xKey,
    yKeys,
    variant,
    size,
    color,
    hasGrid = true,
    hasXAxis = true,
    hasYAxis = true,
    tickCount = 4,
    xLabelCount,
    formatX,
    formatY,
    hasZeroBaseline = true,
    spacing = 'point',
    bandPadding = 0,
    isDisabled = false,
    children,
    style,
    onLayout,
    ...props
  }: ChartPlotProps<Data, XK, YK>,
  ref: ForwardedRef<View>
) {
  const [styleProps, rest] = useStyleProps(props)
  // `null` outside a frame, which is a valid arrangement rather than a misplaced slot: a
  // figure on its own is the shape all five shipped as. The frame's values are defaults and
  // the figure's own win — a uniform card is the common case, and the exception is a design.
  const frame = useOptionalChart()
  const { styles, ink, colors } = useChartInk({
    variant: variant ?? frame?.variant,
    size: size ?? frame?.size ?? 'md',
    color: color ?? frame?.color,
    isDisabled: isDisabled || (frame?.isDisabled ?? false),
    count: yKeys.length,
  })

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    onLayout?.(event)
    setWidth(event.nativeEvent.layout.width)
    setHeight(event.nativeEvent.layout.height)
  }

  const plot = useMemo<ChartPlot | null>(() => {
    if (width <= 0 || height <= 0) return null

    const inset = hasYAxis ? Y_AXIS_WIDTH : 0
    const floor = height - (hasXAxis ? X_AXIS_HEIGHT : 0)
    const frame = {
      x: inset,
      y: TOP_PADDING,
      width: width - inset,
      height: floor - TOP_PADDING,
    }
    const baseline = frame.y + frame.height

    const values = yKeys.flatMap(key =>
      data.map(row => Number(row[key])).filter(Number.isFinite)
    )
    const [low, high] = extent(values)
    // A bar chart read from its own minimum is a bar chart that lies about its proportions,
    // so the baseline is zero unless a caller says the data does not start there.
    const { domain, ticks } = niceScale(
      hasZeroBaseline ? Math.min(0, low) : low,
      high,
      tickCount
    )

    const scaleY = linearScale(domain, [baseline, frame.y])
    const along: Span = [frame.x, frame.x + frame.width]
    // A bar occupies a slot and is centred in one; a line connects readings and starts on
    // the edge. Two scales rather than one with a flag, because they are two shapes.
    const band =
      spacing === 'band'
        ? bandScale(data.length, along, bandPadding)
        : pointScale(data.length, along)

    const series = yKeys.map((key, index) => {
      const rows = data.map(row => Number(row[key]))

      return {
        key,
        color: colors[index] ?? colors[0],
        values: rows,
        points: rows.map((value, rowIndex) => ({
          x: band.center(rowIndex),
          y: scaleY(Number.isFinite(value) ? value : domain[0]),
        })),
      }
    })

    return { frame, series, band, scaleY, domainY: domain, ticks, colors }
  }, [
    data,
    yKeys,
    colors,
    width,
    height,
    hasXAxis,
    hasYAxis,
    hasZeroBaseline,
    tickCount,
    spacing,
    bandPadding,
  ])

  /** Every nth row, so a dozen months under a phone-wide plot is not a smear. */
  const xEvery = useMemo(() => {
    if (data.length === 0) return 1
    const wanted = xLabelCount ?? Math.max(1, Math.floor(width / 56))
    return Math.max(1, Math.ceil(data.length / wanted))
  }, [data.length, width, xLabelCount])

  return (
    <View
      ref={ref}
      {...rest}
      onLayout={handleLayout}
      style={[styles.plot, styleProps, style]}
    >
      {plot === null ? null : (
        <>
          <Svg width={width} height={height}>
            {hasGrid
              ? plot.ticks.map(tick => (
                  <Line
                    key={tick}
                    x1={plot.frame.x}
                    x2={plot.frame.x + plot.frame.width}
                    y1={plot.scaleY(tick)}
                    y2={plot.scaleY(tick)}
                    stroke={ink.gridColor}
                    strokeWidth={1}
                  />
                ))
              : null}
            {children(plot)}
          </Svg>

          {hasYAxis
            ? plot.ticks.map(tick => (
                <Text
                  key={tick}
                  numberOfLines={1}
                  style={[
                    styles.label,
                    {
                      position: 'absolute',
                      // R13 — `start`, so a right-to-left layout puts the axis on the
                      // other side without a second branch here.
                      start: 0,
                      width: Y_AXIS_WIDTH - 6,
                      textAlign: 'right',
                      // Half the line's height above the rule, so the number is centred
                      // on the rule rather than hanging from it.
                      top: plot.scaleY(tick) - ink.labelSize * 0.7,
                    },
                  ]}
                >
                  {formatY ? formatY(tick) : String(tick)}
                </Text>
              ))
            : null}

          {hasXAxis
            ? data.map((row, index) =>
                index % xEvery === 0 ? (
                  <Text
                    key={index}
                    numberOfLines={1}
                    style={[
                      styles.label,
                      {
                        position: 'absolute',
                        start: plot.band.center(index) - plot.band.step / 2,
                        width: plot.band.step,
                        textAlign: 'center',
                        top: plot.frame.y + plot.frame.height + 4,
                      },
                    ]}
                  >
                    {formatX ? formatX(row[xKey], index) : String(row[xKey] ?? '')}
                  </Text>
                ) : null
              )
            : null}
        </>
      )}
    </View>
  )
}) as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: ChartPlotProps<Data, XK, YK> & { ref?: ForwardedRef<View> }
) => ReactElement
