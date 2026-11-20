import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, ReactNode, Ref } from 'react'
import type { View } from 'react-native'
import { Path } from 'react-native-svg'
import { barPath } from '../../system/chart/chart-path'
import { ChartPlot } from '../chart'
import { stackKeys, stackRows } from '../../system/chart/chart-stack'
import type { ChartDatum } from '../chart'
import type { BarChartProps } from './bar-chart.type'

/** Four tenths of a slot, which is the bar chart in the reference measured. */
const DEFAULT_GAP = 0.4

/**
 * How round the far end of a bar is, as a fraction of its width.
 *
 * **Under a third, not a half.** Half the width is a capsule, and a capsule reads as a
 * shape rather than as a measurement: the eye stops at the dome instead of at the value it
 * marks, and a narrow bar — one of three in a group — becomes a pill with no flat top at
 * all. A softened corner says the same thing about the design and gets out of the way of
 * the number.
 */
const CORNER_RATIO = 0.3

/**
 * A bar per row, and a bar per series inside it once there is more than one.
 *
 * ```tsx
 * <BarChart data={rows} xKey="month" yKeys={['units']} />
 * <BarChart data={rows} xKey="month" yKeys={['organic', 'paid']} isGrouped />
 * ```
 *
 * **Grouped compares; stacked totals**, and stacked is the default because a bar chart with
 * two series is usually one quantity split. The `AreaChart` makes the same distinction in
 * the same words.
 *
 * **The corner is a capsule unless a caller says otherwise**, computed from the slot the
 * scale gave the bar rather than fixed — so it survives a chart of four bars and one of
 * forty. `barPath` clamps it to the bar's own height too, which is what keeps the first bar
 * of a chart that starts near zero a stadium rather than a knot.
 *
 * **A stack is summed before it is scaled**, as the `AreaChart`'s is, so the axis reaches
 * the top of the tallest stack rather than of its tallest segment.
 *
 * The plot, the axes, the grid and the palette are `ChartPlot`'s, shared with the
 * `LineChart` and the `AreaChart`.
 */
const BarChartBase = forwardRef(function BarChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    isGrouped = false,
    radius,
    gap = DEFAULT_GAP,
    data,
    yKeys,
    ...props
  }: BarChartProps<Data, XK, YK>,
  ref: ForwardedRef<View>
) {
  const isStacked = !isGrouped && yKeys.length > 1
  // The rows a stack is drawn from carry a running total per series, so the plot's domain
  // reaches the top of the stack. Summed once per change of rows: the plot memoises on them.
  const rows = useMemo(
    () => (isStacked ? stackRows(data, yKeys) : data),
    [data, yKeys, isStacked]
  )
  const keys = useMemo(
    () => (isStacked ? stackKeys(yKeys) : yKeys),
    [yKeys, isStacked]
  )

  return (
    <ChartPlot
      ref={ref}
      {...props}
      data={rows}
      yKeys={keys}
      spacing="band"
      bandPadding={gap}
    >
      {({ series, band, scaleY, domainY }) => {
        const baseline = scaleY(Math.max(domainY[0], 0))
        // Side by side inside the slot the row already has, rather than a second scale:
        // the group is the slot, and each series takes an equal share of it.
        const width = isGrouped ? band.width / series.length : band.width
        const corner = radius ?? width * CORNER_RATIO

        if (isStacked) {
          return series.map((one, index) => (
            <Stack
              key={one.key}
              below={index > 0 ? series[index - 1] : undefined}
              series={one}
              band={band}
              width={width}
              corner={index === series.length - 1 ? corner : 0}
              scaleY={scaleY}
              baseline={baseline}
            />
          ))
        }

        return series.map((one, seriesIndex) => (
          <Group key={one.key}>
            {one.points.map((point, index) => {
              const x = isGrouped
                ? band.center(index) - band.width / 2 + width * seriesIndex
                : band.center(index) - width / 2
              const top = Math.min(point.y, baseline)
              const height = Math.abs(baseline - point.y)

              return (
                <Path
                  key={index}
                  d={barPath({ x, y: top, width, height }, corner)}
                  fill={one.color}
                />
              )
            })}
          </Group>
        ))
      }}
    </ChartPlot>
  )
})

BarChartBase.displayName = 'XAUI.BarChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const BarChart = BarChartBase as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: BarChartProps<Data, XK, YK> & { ref?: Ref<View> }
) => ReactElement

/** `Fragment` under another name, so the map above reads as a group of bars. */
function Group({ children }: { children: ReactNode }) {
  return <>{children}</>
}

type StackProps = {
  /** The series under this one, whose running totals are where this one starts. */
  below: { values: number[] } | undefined
  /** This series, its values already running totals (`stackRows`). */
  series: { color: string; values: number[] }
  band: { center: (index: number) => number; width: number }
  width: number
  corner: number
  scaleY: (value: number) => number
  baseline: number
}

/**
 * One series of a stack, drawn on top of the one below it.
 *
 * The values are **running totals**, summed into the rows before the plot scaled them, so a
 * segment runs from the total under it to its own. Only the topmost segment is rounded — a
 * corner between two segments is a gap in a bar that is meant to read as one.
 */
function Stack({
  below,
  series,
  band,
  width,
  corner,
  scaleY,
  baseline,
}: StackProps) {
  return (
    <>
      {series.values.map((value, index) => {
        const under = below?.values[index] ?? 0
        const top = scaleY(value)
        const bottom = below === undefined ? baseline : scaleY(under)

        return (
          <Path
            key={index}
            d={barPath(
              {
                x: band.center(index) - width / 2,
                y: Math.min(top, bottom),
                width,
                height: Math.abs(bottom - top),
              },
              corner
            )}
            fill={series.color}
          />
        )
      })}
    </>
  )
}
