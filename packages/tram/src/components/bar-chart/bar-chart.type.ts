import type { ChartDatum, ChartSeriesProps } from '../chart'

type BarChartOwnProps = {
  /**
   * Whether several series stand side by side in the row's slot rather than stacking.
   * Grouped compares; stacked totals — and stacked is the default.
   */
  isGrouped?: boolean
  /**
   * The corner of the bar's far end, in points. Square by default and **held at 2**, the
   * Tram corner (Native: a third of the bar, a capsule). @default 0
   */
  radius?: number
  /** The share of a slot left empty either side of a bar. @default 0.4 */
  gap?: number
}

export type BarChartProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = BarChartOwnProps & ChartSeriesProps<Data, XK, YK>
