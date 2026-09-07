import type { ChartDatum, ChartSeriesProps } from '../chart'

type BarChartOwnProps = {
  /**
   * Whether several series stand side by side in one group rather than stacking.
   *
   * Grouped compares; stacked totals. The `AreaChart` says the same thing about its own
   * pair, and for the same reason: a stack of numbers that are not parts of one whole is a
   * chart that adds unrelated things together.
   */
  isGrouped?: boolean
  /**
   * The bar's corner, in points, and a **raw number rather than a `RadiusKey`**: a bar's
   * corner is bounded by its own width, not by the container scale, and a `2xl` on a
   * six-point bar would be a circle. Unset, it is half the bar — the capsule, and the only
   * value that follows the data rather than the theme.
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
