import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ChartDatum, ChartSize } from '../chart'

export type RadialChartSlot = 'root' | 'canvas' | 'center'

/** The outermost ring's diameter — 140, 200, 260 — and its thickness — 10, 14, 18. */
export type RadialChartSize = ChartSize

type RadialChartOwnProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
> = {
  /** The rows. The first is the outermost ring, and the palette walks them in order. */
  data: ReadonlyArray<Data>
  /** Which key names each ring — what a legend would print. */
  labelKey: LK
  /** Which key is the quantity. */
  valueKey: VK
  /** Which key holds that row's own target. It wins over `maxValue`. */
  maxKey?: MK
  /** One target for every ring. @default the largest value in the data */
  maxValue?: number
  /** One of the twenty named accents: the palette's seed. `color` wins. */
  accent?: TramAccentName
  /** The outermost ring's diameter. */
  size?: RadialChartSize
  /** A raw tint. The palette is walked out of it, a shade per ring. */
  color?: string
  /** How thick every ring is, in points. It wins over `size`. @default the size's own */
  thickness?: number
  /** The bare ground between two rings, in points. @default half the thickness */
  gap?: number
  /** Whether the whole of each ring's distance is drawn behind it, in grey. @default true */
  hasTrack?: boolean
  /** What sits in the middle — React Native laid over the canvas, taking no touches. */
  children?: ReactNode
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** Its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type RadialChartProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
> = RadialChartOwnProps<Data, LK, VK, MK> &
  Omit<ViewProps, keyof RadialChartOwnProps<Data, LK, VK, MK>> &
  Omit<ViewStyleProps, keyof RadialChartOwnProps<Data, LK, VK, MK> | keyof ViewProps>
