import { Circle, Path } from 'react-native-svg'
import { linePath } from '../../utils/chart-path'
import { ChartPlot } from '../chart'
import type { ChartDatum } from '../chart'
import type { LineChartProps } from './line-chart.type'

/** Wide enough to read against the plot's ground, small enough not to be a marker. */
const POINT_RADIUS = 3

/**
 * A line per series, over a shared scale.
 *
 * ```tsx
 * <LineChart
 *   data={rows}
 *   xKey="month"
 *   yKeys={['organic', 'paid']}
 *   formatY={value => `${value / 1000}k`}
 * />
 * ```
 *
 * **The series are props, not children**, and that is the one place a chart parts company
 * with the rest of this library. A line is not a component a caller composes — it is a
 * column of their data — so `yKeys` names the columns and the palette walks a shade for
 * each. What composition there is lives on the escape hatch: `ChartPlot` takes a render
 * function, and a caller who needs a band behind a line writes it there.
 *
 * **A shade per series rather than a colour per series.** A chart's series are usually one
 * quantity split — organic and paid, mobile and desktop — so shades of one colour say
 * "parts of a whole" where a rainbow says "unrelated things", and a caller changing the
 * accent changes the whole chart with it.
 *
 * **The curve is monotone**: it bends through the readings without ever leaving the interval
 * its neighbours set. A smooth line that dips between two rising points is drawing a number
 * nobody measured, and on the `AreaChart` it is ink under the axis.
 */
export function LineChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>({
  curve = 'monotone',
  strokeWidth = 2,
  hasPoints = false,
  ...props
}: LineChartProps<Data, XK, YK>) {
  return (
    <ChartPlot {...props}>
      {({ series }) => (
        <>
          {series.map(line => (
            <Path
              key={line.key}
              d={linePath(line.points, curve)}
              stroke={line.color}
              strokeWidth={strokeWidth}
              // Round, not butt: a line ending in a square cap reads as clipped at the
              // axis, and every trend line ends at the edge of its plot.
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
          {hasPoints
            ? series.flatMap(line =>
                line.points.map((point, index) => (
                  <Circle
                    key={`${line.key}-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r={POINT_RADIUS}
                    fill={line.color}
                  />
                ))
              )
            : null}
        </>
      )}
    </ChartPlot>
  )
}

LineChart.displayName = 'XAUI.LineChart'
