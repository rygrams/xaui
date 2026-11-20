import { forwardRef } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import type { View } from 'react-native'
import { Path, Rect } from 'react-native-svg'
import { linePath } from '@xaui/native/system'
import { ChartPlot } from '../chart'
import { POINT_SIDE } from '../chart/chart.recipe'
import type { ChartDatum } from '../chart'
import type { LineChartProps } from './line-chart.type'

/**
 * A line per series, over a shared scale — the Native `LineChart`'s API, drawn in Metro:
 * a stroke of 2 with **sharp corners and cut ends** (`miter`, `butt`), straight between
 * readings unless `curve="monotone"`, and squares for points.
 *
 * ```tsx
 * <LineChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
 * ```
 *
 * The series are props, not children: a line is a column of the caller's data. The
 * palette walks a shade of one colour per series. The ref is the plot's view.
 */
const LineChartBase = forwardRef(function LineChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    curve = 'linear',
    strokeWidth = 2,
    hasPoints = false,
    ...props
  }: LineChartProps<Data, XK, YK>,
  ref: ForwardedRef<View>
) {
  return (
    <ChartPlot ref={ref} {...props}>
      {({ series }) => (
        <>
          {series.map(line => (
            <Path
              key={line.key}
              d={linePath(line.points, curve)}
              stroke={line.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              fill="none"
            />
          ))}
          {hasPoints
            ? series.flatMap(line =>
                line.points.map((point, index) => (
                  <Rect
                    key={`${line.key}-${index}`}
                    x={point.x - POINT_SIDE / 2}
                    y={point.y - POINT_SIDE / 2}
                    width={POINT_SIDE}
                    height={POINT_SIDE}
                    fill={line.color}
                  />
                ))
              )
            : null}
        </>
      )}
    </ChartPlot>
  )
})

LineChartBase.displayName = 'XAUI.Tram.LineChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const LineChart = LineChartBase as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: LineChartProps<Data, XK, YK> & { ref?: Ref<View> }
) => ReactElement
