import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { ChartDatum, ChartSize, ChartVariant } from '../chart'

export type PieChartSlot = 'root' | 'center'

/** The cartesian family's five, unchanged: a slice is the same ink as a bar. */
export type PieChartVariant = ChartVariant
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
  variant?: PieChartVariant
  /** The ring's diameter. */
  size?: PieChartSize
  /** A raw tint (R7). The palette is walked out of it, a shade per slice. */
  color?: string
  /**
   * The hole, as a fraction of the radius. `0` is a pie, anything above it is a donut.
   *
   * A **fraction**, not points: the hole has to stay in proportion at every size, and a
   * caller who writes 40 points gets a donut on a phone and a pie on a tablet.
   * @default 0.62
   */
  innerRadius?: number
  /** The gap between two slices, in degrees. `0` leaves them touching. @default 1.5 */
  gap?: number
  /**
   * What sits in the hole — a total, a count, an icon. It is **React Native laid over the
   * canvas**, not SVG text, so it takes the theme's font and its scaling like any other
   * `Text` on the screen.
   */
  children?: ReactNode
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** R14 — its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type PieChartProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
> = PieChartOwnProps<Data, LK, VK> &
  Omit<ViewProps, keyof PieChartOwnProps<Data, LK, VK>> &
  Omit<ViewStyleProps, keyof PieChartOwnProps<Data, LK, VK> | keyof ViewProps>
