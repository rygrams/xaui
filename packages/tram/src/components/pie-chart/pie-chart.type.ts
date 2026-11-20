import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ChartDatum, ChartSize } from '../chart'

export type PieChartSlot = 'root' | 'center'

/** The ring's diameter: 140, 200, 260. */
export type PieChartSize = ChartSize

type PieChartOwnProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
> = {
  data: ReadonlyArray<Data>
  /** Which key names each slice — what a legend would print. */
  labelKey: LK
  /** Which key is the quantity. The slices are its shares of the total. */
  valueKey: VK
  /** One of the twenty named accents: the palette's seed. `color` wins. */
  accent?: TramAccentName
  /** The ring's diameter. */
  size?: PieChartSize
  /** A raw tint. The palette is walked out of it, a shade per slice. */
  color?: string
  /** The hole, as a fraction of the radius. `0` is a pie. @default 0.62 */
  innerRadius?: number
  /** The gap between two slices, in degrees. `0` leaves them touching. @default 1.5 */
  gap?: number
  /** What sits in the hole — React Native laid over the canvas, taking no touches. */
  children?: ReactNode
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** Its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type PieChartProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
> = PieChartOwnProps<Data, LK, VK> &
  Omit<ViewProps, keyof PieChartOwnProps<Data, LK, VK>> &
  Omit<ViewStyleProps, keyof PieChartOwnProps<Data, LK, VK> | keyof ViewProps>
