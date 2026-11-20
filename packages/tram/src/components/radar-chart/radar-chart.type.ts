import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ChartDatum, ChartSize } from '../chart'

export type RadarChartSlot = 'root' | 'label'

/** The web's box: 180, 240, 300. */
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
  /** One of the twenty named accents: the palette's seed. `color` wins. */
  accent?: TramAccentName
  /** The web's box, before the labels are given room. */
  size?: RadarChartSize
  /** A raw tint. The palette is walked out of it, a shade per series. */
  color?: string
  /** How many rings the web is drawn with. @default 4 */
  levels?: number
  /** The top of every axis. Set it to compare two radars. @default the highest reading */
  maxValue?: number
  /** Whether the axis names are drawn around the web. @default true */
  hasLabels?: boolean
  /** How much of the colour a series' fill is. @default 0.18 */
  fillOpacity?: number
  /** The outline's thickness, in points. @default 2 */
  strokeWidth?: number
  /** A square of 6 at every vertex. Off by default. */
  hasPoints?: boolean
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** Its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type RadarChartProps<
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
> = RadarChartOwnProps<Data, AK, YK> &
  Omit<ViewProps, keyof RadarChartOwnProps<Data, AK, YK>> &
  Omit<ViewStyleProps, keyof RadarChartOwnProps<Data, AK, YK> | keyof ViewProps>
