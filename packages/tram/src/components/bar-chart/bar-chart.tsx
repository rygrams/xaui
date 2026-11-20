import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import type { View } from 'react-native'
import { Path } from 'react-native-svg'
import { barPath } from '@xaui/native/system'
import { ChartPlot } from '../chart'
import { stackKeys, stackRows } from '../chart/chart.utils'
import type { ChartDatum } from '../chart'
import { barCorner, barLayout } from './bar-chart.utils'
import type { BarChartProps } from './bar-chart.type'

/** Four tenths of a slot, Native's. */
const DEFAULT_GAP = 0.4

/**
 * A bar per row, and a bar per series inside it once there is more than one — the Native
 * `BarChart`'s API, drawn in Metro: **square rectangles** of flat colour, stacked by default
 * with no gap between segments, and a corner of 2 at most.
 *
 * ```tsx
 * <BarChart data={rows} xKey="month" yKeys={['units']} />
 * <BarChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} isGrouped />
 * ```
 *
 * A stack is summed into the rows before the plot scales them, so the y axis reaches the
 * top of the tallest stack rather than the tallest segment. The ref is the plot's view.
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
  const corner = barCorner(radius)
  // Summed once per change of rows, not per render: the plot memoises on these arrays.
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
      {({ series, band, scaleY, domainY }) =>
        barLayout({ series, band, scaleY, domainY, isGrouped, corner }).map(bar => (
          <Path
            key={bar.key}
            d={barPath(
              { x: bar.x, y: bar.y, width: bar.width, height: bar.height },
              bar.corner
            )}
            fill={bar.color}
          />
        ))
      }
    </ChartPlot>
  )
})

BarChartBase.displayName = 'XAUI.Tram.BarChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const BarChart = BarChartBase as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: BarChartProps<Data, XK, YK> & { ref?: Ref<View> }
) => ReactElement
