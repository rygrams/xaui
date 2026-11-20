import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import type { View } from 'react-native'
import { Path } from 'react-native-svg'
import { linePath, stackKeys, stackRows } from '@xaui/native/system'
import { ChartPlot } from '../chart'
import type { ChartDatum } from '../chart'
import { areaShape } from './area-chart.utils'
import type { AreaChartProps } from './area-chart.type'

/**
 * How much of the colour the fill is: **flat**, a fifth. No gradient — Tram has no depth —
 * and light enough that the line, which carries the number, stays the thing read.
 */
const FILL_OPACITY = 0.2

/**
 * The `LineChart` with the ground under it filled — the Native `AreaChart`'s API, drawn in
 * Metro: a flat fill at a fifth of the colour, no gradient, and the line's sharp corners
 * and cut ends.
 *
 * ```tsx
 * <AreaChart data={rows} xKey="month" yKeys={['revenue']} />
 * <AreaChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} isStacked />
 * ```
 *
 * Stacked, each series is drawn at the running total of the ones under it and fills only
 * its own band, so the plot's domain reaches the top of the stack and no floor darkens.
 * The ref is the plot's view.
 */
const AreaChartBase = forwardRef(function AreaChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    curve = 'linear',
    isStacked = false,
    strokeWidth = 2,
    data,
    yKeys,
    ...props
  }: AreaChartProps<Data, XK, YK>,
  ref: ForwardedRef<View>
) {
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
    <ChartPlot ref={ref} {...props} data={rows} yKeys={keys}>
      {({ series, frame }) => {
        const baseline = frame.y + frame.height
        const fills = series.map((one, index) => ({
          key: one.key,
          color: one.color,
          points: one.points,
          d: areaShape({
            top: one.points,
            lower: isStacked && index > 0 ? series[index - 1].points : undefined,
            baseline,
            curve,
          }),
        }))
        // A stack is painted from its top series down, as Native does, so each lower edge
        // lies over the band above it.
        const drawn = isStacked ? [...fills].reverse() : fills

        return (
          <>
            {drawn.map(one => (
              <Path
                key={`${one.key}-fill`}
                d={one.d}
                fill={one.color}
                // Its own prop, not an alpha in the colour: the native renderer drops an
                // `rgba()` alpha.
                fillOpacity={FILL_OPACITY}
              />
            ))}

            {strokeWidth > 0
              ? drawn.map(one => (
                  <Path
                    key={`${one.key}-line`}
                    d={linePath(one.points, curve)}
                    stroke={one.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fill="none"
                  />
                ))
              : null}
          </>
        )
      }}
    </ChartPlot>
  )
})

AreaChartBase.displayName = 'XAUI.Tram.AreaChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const AreaChart = AreaChartBase as <
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: AreaChartProps<Data, XK, YK> & { ref?: Ref<View> }
) => ReactElement
