import type { ReactNode } from 'react'
import { Path } from 'react-native-svg'
import { barPath } from '../../utils/chart-path'
import { ChartPlot } from '../chart'
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
 * The plot, the axes, the grid and the palette are `ChartPlot`'s, shared with the
 * `LineChart` and the `AreaChart`.
 */
export function BarChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>({
  isGrouped = false,
  radius,
  gap = DEFAULT_GAP,
  ...props
}: BarChartProps<Data, XK, YK>) {
  return (
    <ChartPlot {...props} spacing="band" bandPadding={gap}>
      {({ series, band, frame, scaleY, domainY }) => {
        const baseline = scaleY(Math.max(domainY[0], 0))
        // Side by side inside the slot the row already has, rather than a second scale:
        // the group is the slot, and each series takes an equal share of it.
        const width = isGrouped ? band.width / series.length : band.width
        const corner = radius ?? width * CORNER_RATIO

        if (!isGrouped && series.length > 1) {
          return series.map((one, index) => (
            <Stack
              key={one.key}
              below={series.slice(0, index)}
              series={one}
              band={band}
              width={width}
              corner={index === series.length - 1 ? corner : 0}
              scaleY={scaleY}
              baseline={baseline}
              frame={frame}
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
}

BarChart.displayName = 'XAUI.BarChart'

/** `Fragment` under another name, so the map above reads as a group of bars. */
function Group({ children }: { children: ReactNode }) {
  return <>{children}</>
}

type StackProps = {
  below: { values: number[] }[]
  series: { color: string; values: number[] }
  band: { center: (index: number) => number; width: number }
  width: number
  corner: number
  scaleY: (value: number) => number
  baseline: number
  frame: { x: number; y: number; width: number; height: number }
}

/**
 * One series of a stack, drawn on top of the ones below it.
 *
 * The running total is summed here rather than folded into the data, unlike the
 * `AreaChart`'s: a bar's **height** is its own value and its **position** is the total under
 * it, so the two are needed separately. Only the topmost segment is rounded — a corner
 * between two segments is a gap in a bar that is meant to read as one.
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
        const under = below.reduce((total, one) => {
          const part = one.values[index]
          return total + (Number.isFinite(part) ? part : 0)
        }, 0)
        const own = Number.isFinite(value) ? value : 0

        const top = scaleY(under + own)
        const bottom = under === 0 ? baseline : scaleY(under)

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
