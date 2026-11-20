import type { ChartDatum, ChartSeriesProps, Curve } from '../chart'

type AreaChartOwnProps = {
  /** Straight by default, as the `LineChart`. @default 'linear' */
  curve?: Curve
  /**
   * Whether the series stack on each other rather than overlapping. Stacked reads as a
   * total split into parts, overlaid as several quantities compared.
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
