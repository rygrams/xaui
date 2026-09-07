import type { ChartDatum, ChartSeriesProps, Curve } from '../chart'

type LineChartOwnProps = {
  /**
   * How the line travels between two points. `monotone` bends through them without ever
   * leaving the interval its neighbours set — the reason `chart-path` implements
   * Fritsch–Carlson rather than a midpoint cubic. @default 'monotone'
   */
  curve?: Curve
  /** The line's thickness, in points. @default 2 */
  strokeWidth?: number
  /** A dot on every reading. Off by default: twelve months of dots is a dotted line. */
  hasPoints?: boolean
}

export type LineChartProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = LineChartOwnProps & ChartSeriesProps<Data, XK, YK>
