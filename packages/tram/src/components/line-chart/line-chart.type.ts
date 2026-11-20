import type { ChartDatum, ChartSeriesProps, Curve } from '../chart'

type LineChartOwnProps = {
  /**
   * How the line travels between two points. Straight by default — a Metro line has sharp
   * corners; `monotone` (Native's default, Fritsch–Carlson) stays available.
   * @default 'linear'
   */
  curve?: Curve
  /** The line's thickness, in points. @default 2 */
  strokeWidth?: number
  /** A square of 6 on every reading. Off by default. */
  hasPoints?: boolean
}

export type LineChartProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = LineChartOwnProps & ChartSeriesProps<Data, XK, YK>
