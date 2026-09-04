import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'

type AxisOwnProps = {
  /** R12 — the child element becomes the axis, keeping its direction. */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * Everything a `View` can be styled with, as props (R14), **minus `flexDirection`** — that
 * one is the component's identity, and a `Row` that could be told to lay out as a column
 * would only be a `View` with a longer name. Reversal and the rest go through `style`,
 * which is the escape hatch for what has no readable prop.
 *
 * Note what is *not* declared here: no `mainAxisAlignment`, no `crossAxisAlignment`, no
 * `gap` prop of our own. They are `justifyContent`, `alignItems` and `gap` — React
 * Native's own names, carrying React Native's own values, and R14 already exposes every
 * one of them. A vocabulary of ours would be a second set of words for the same thing.
 */
export type AxisProps = Omit<ViewProps, 'style'> &
  AxisOwnProps &
  Omit<ViewStyleProps, keyof AxisOwnProps | keyof ViewProps | 'flexDirection'>

export type RowProps = AxisProps

export type ColumnProps = AxisProps
