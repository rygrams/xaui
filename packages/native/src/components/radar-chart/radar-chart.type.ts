import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { ChartDatum, ChartSize, ChartVariant } from '../chart'

export type RadarChartSlot = 'root'

/** The cartesian family's five: a radar's ink is a line chart's ink, bent into a ring. */
export type RadarChartVariant = ChartVariant
export type RadarChartSize = ChartSize

type RadarChartOwnProps<
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
> = {
  /** One row per **axis**, not per reading along one — a radar is transposed. */
  data: ReadonlyArray<Data>
  /** Which key names each axis, and what its label prints. */
  axisKey: AK
  /** Which keys are the series, in the order the palette walks them. */
  yKeys: ReadonlyArray<YK>
  variant?: RadarChartVariant
  /** The web's diameter, before the labels are given room. */
  size?: RadarChartSize
  /** A raw tint (R7). The palette is walked out of it, a shade per series. */
  color?: string
  /**
   * How many rings the web is drawn with. They are the chart's only scale, so this is also
   * how many gradations a reader can count. @default 4
   */
  levels?: number
  /**
   * The top of every axis. Unset, it is the highest reading across all of them — which is
   * what makes the shape comparable within one chart but **not between two**, so a
   * dashboard of radars should set it.
   */
  maxValue?: number
  /** Whether the axis names are drawn around the web. @default true */
  hasLabels?: boolean
  /** How much of the colour a series' fill is. @default 0.18 */
  fillOpacity?: number
  /** The outline's thickness, in points. @default 2 */
  strokeWidth?: number
  /** A dot at every vertex. Off by default: six axes of dots is a dotted outline. */
  hasPoints?: boolean
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** R14 — its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type RadarChartProps<
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
> = RadarChartOwnProps<Data, AK, YK> &
  Omit<ViewProps, keyof RadarChartOwnProps<Data, AK, YK>> &
  Omit<ViewStyleProps, keyof RadarChartOwnProps<Data, AK, YK> | keyof ViewProps>
