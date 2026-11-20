import { forwardRef, useMemo, useState } from 'react'
import type { ForwardedRef, ReactElement, ReactNode, Ref } from 'react'
import { Text, View } from 'react-native'
import type { LayoutChangeEvent, StyleProp, TextStyle } from 'react-native'
import { Line, Svg } from 'react-native-svg'
import { useStyleProps } from '@xaui/native/system'
import { useFigureInk } from './chart.hook'
import {
  Y_AXIS_WIDTH,
  Y_LABEL_GAP,
  axisValue,
  plotLayout,
  xLabelBox,
  xLabelEvery,
} from './chart.utils'
import type { LabelBox } from './chart.utils'
import type { ChartDatum, ChartPlotProps } from './chart.type'

/** The rules behind the series, and the zero axis: a reading aid at 1, an edge at 2. */
const GRID_WIDTH = 1
const AXIS_WIDTH = 2

/** The x labels sit this far under the plot. */
const X_LABEL_OFFSET = 4

/** Where a label's text sits in its box, in the plot's left-to-right frame. */
const ALIGN = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
} as const

type AxisLabelProps = LabelBox & {
  top: number
  style: StyleProp<TextStyle>
  children: ReactNode
}

/**
 * One axis label: a box placed in the plot's coordinates, its text set against the start,
 * the middle or the end. Aligned by the box rather than by `textAlign`, whose `left` and
 * `right` would name a physical side.
 */
function AxisLabel({ start, width, align, top, style, children }: AxisLabelProps) {
  return (
    <View
      style={{ position: 'absolute', start, width, top, alignItems: ALIGN[align] }}
    >
      <Text numberOfLines={1} style={style}>
        {children}
      </Text>
    </View>
  )
}

/**
 * The plot every cartesian Tram chart is drawn in — Tram's own, on Native's maths: the
 * grid, the zero axis, the labels, both scales and the palette.
 *
 * ```tsx
 * <ChartPlot data={rows} xKey="month" yKeys={['revenue']}>
 *   {({ series }) => <Path d={linePath(series[0].points)} stroke={series[0].color} />}
 * </ChartPlot>
 * ```
 *
 * Drawn as the Finance app's figures were: rules of 1 in the `Skeleton`'s grey, the zero
 * axis a line of 2 in the muted ink, laid **over** the marks so a bar stands on it. The
 * labels are React Native `Text` beside the canvas, on `caption`, tabular and muted.
 *
 * It measures itself — a chart's width is its parent's — so nothing is drawn until it
 * knows, which is one frame.
 */
const ChartPlotBase = forwardRef(function ChartPlot<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    data,
    xKey,
    yKeys,
    accent,
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
  const { styles, ink, colors } = useFigureInk({
    accent,
    size,
    color,
    isDisabled,
    count: yKeys.length,
  })

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    onLayout?.(event)
    setWidth(event.nativeEvent.layout.width)
    setHeight(event.nativeEvent.layout.height)
  }

  const plot = useMemo(
    () =>
      plotLayout({
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
      }),
    [
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
    ]
  )

  const every = xLabelEvery(data.length, plot?.frame.width ?? width, xLabelCount)

  const axis = plot === null ? 0 : axisValue(plot.domainY)
  const axisY = plot === null ? 0 : plot.scaleY(axis)

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
              ? plot.ticks.map(tick =>
                  // The zero axis takes its own rule's place.
                  hasXAxis && tick === axis ? null : (
                    <Line
                      key={tick}
                      x1={plot.frame.x}
                      x2={plot.frame.x + plot.frame.width}
                      y1={plot.scaleY(tick)}
                      y2={plot.scaleY(tick)}
                      stroke={ink.gridColor}
                      strokeWidth={GRID_WIDTH}
                    />
                  )
                )
              : null}
            {children(plot)}
            {hasXAxis ? (
              <Line
                x1={plot.frame.x}
                x2={plot.frame.x + plot.frame.width}
                y1={axisY}
                y2={axisY}
                stroke={ink.axisColor}
                strokeWidth={AXIS_WIDTH}
              />
            ) : null}
          </Svg>

          {hasYAxis
            ? plot.ticks.map(tick => (
                <AxisLabel
                  key={tick}
                  start={0}
                  width={Y_AXIS_WIDTH - Y_LABEL_GAP}
                  align="end"
                  // Centred on the rule rather than hanging from it.
                  top={plot.scaleY(tick) - ink.labelSize * 0.7}
                  style={styles.label}
                >
                  {formatY ? formatY(tick) : String(tick)}
                </AxisLabel>
              ))
            : null}

          {hasXAxis
            ? data.map((row, index) => {
                if (index % every !== 0) return null

                const box = xLabelBox({
                  center: plot.band.center(index),
                  room: plot.band.step * every,
                  index,
                  count: data.length,
                  spacing,
                })

                return (
                  <AxisLabel
                    key={index}
                    {...box}
                    top={plot.frame.y + plot.frame.height + X_LABEL_OFFSET}
                    style={styles.label}
                  >
                    {formatX ? formatX(row[xKey], index) : String(row[xKey] ?? '')}
                  </AxisLabel>
                )
              })
            : null}
        </>
      )}
    </View>
  )
})

ChartPlotBase.displayName = 'XAUI.Tram.ChartPlot'

/** The plot, typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const ChartPlotRoot = ChartPlotBase as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: ChartPlotProps<Data, XK, YK> & { ref?: Ref<View> }
) => ReactElement
