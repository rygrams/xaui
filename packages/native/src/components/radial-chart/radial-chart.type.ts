import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { ChartDatum, ChartSize, ChartVariant } from '../chart'

export type RadialChartSlot = 'root' | 'canvas' | 'center'

/** The cartesian family's five, unchanged: a ring is the same ink as a bar. */
export type RadialChartVariant = ChartVariant
export type RadialChartSize = ChartSize

type RadialChartOwnProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
> = {
  /** The rows. **The first is the outermost ring**, and the palette walks them in order. */
  data: ReadonlyArray<Data>
  /** Which key names each ring — what a legend would print. */
  labelKey: LK
  /** Which key is the quantity. */
  valueKey: VK
  /**
   * Which key holds that row's **own** target, for rings that are each a share of a
   * different goal — 1 623 of 2 000 kcal beside 5 400 of 10 000 steps.
   *
   * It wins over `maxValue` wherever a row carries one, which is what lets a chart mix a
   * per-row goal with a shared fallback.
   */
  maxKey?: MK
  /**
   * One target for every ring, for rings that are shares of the same thing.
   *
   * Unset and with no `maxKey`, it is the **largest value in the data**, so the biggest
   * ring closes and the rest are read against it. That makes a figure honest about itself
   * and says nothing about any other, exactly as the `RadarChart`'s `maxValue` does: a
   * dashboard of radial charts should give all of them the same top.
   */
  maxValue?: number
  variant?: RadialChartVariant
  /** The outermost ring's diameter. */
  size?: RadialChartSize
  /** A raw tint (R7). The palette is walked out of it, a shade per ring. */
  color?: string
  /**
   * How thick every ring is, in points. A **raw value** that wins over `size`, the way
   * `ProgressCircle`'s `strokeWidth` does — a figure that has to line up with something
   * already on the screen is not a vocabulary question.
   *
   * Every ring shares it: rings of different weights read as different charts.
   * @default the size's own
   */
  thickness?: number
  /** The bare ground between two rings, in points. @default half the thickness */
  gap?: number
  /**
   * Whether the whole of each ring's distance is drawn behind it. Without it a ring at a
   * fifth is an arc floating in space, with nothing saying how far it had to go.
   * @default true
   */
  hasTrack?: boolean
  /**
   * What sits in the middle — a total, a label, an icon. It is **React Native laid over the
   * canvas**, not SVG text, so it takes the theme's font and its scaling like any other
   * `Text` on the screen, and it takes no touches.
   */
  children?: ReactNode
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/** R14 — its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type RadialChartProps<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
> = RadialChartOwnProps<Data, LK, VK, MK> &
  Omit<ViewProps, keyof RadialChartOwnProps<Data, LK, VK, MK>> &
  Omit<ViewStyleProps, keyof RadialChartOwnProps<Data, LK, VK, MK> | keyof ViewProps>
