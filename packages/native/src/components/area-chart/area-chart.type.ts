import type { ChartDatum, ChartSeriesProps, Curve } from '../chart'

type AreaChartOwnProps = {
  /** @default 'monotone' */
  curve?: Curve
  /**
   * Whether the series stack on each other rather than overlapping.
   *
   * The two answer different questions: stacked reads as a total split into parts, overlaid
   * reads as several quantities compared. A stacked chart whose parts are not parts of one
   * whole is a chart that adds unrelated numbers together.
   */
  isStacked?: boolean
  /** The line along the top of each area. `0` leaves the fill bare. @default 2 */
  strokeWidth?: number
}

export type AreaChartProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = AreaChartOwnProps & ChartSeriesProps<Data, XK, YK>
