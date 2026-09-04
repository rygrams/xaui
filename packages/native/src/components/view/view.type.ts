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

/**
 * `Stack` and `Stack.Item` take the full R14 set: unlike the axes, neither claims a style
 * key as its identity. `position` is set by each of them and remains overridable, because
 * a layer that has to be `relative` for one screen should not need a different component.
 */
export type StackProps = Omit<ViewProps, 'style'> &
  AxisOwnProps &
  Omit<ViewStyleProps, keyof AxisOwnProps | keyof ViewProps>

export type StackItemProps = StackProps

type GridOwnProps = {
  /** How many columns. Floored, and never below one. @default 2 */
  columns?: number
  /**
   * The space between cells, in points — React Native's `gap`, taken as a prop because the
   * root has to read it to size the columns. @default 0
   */
  gap?: number
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * No `asChild`: the root measures itself through `onLayout` and publishes the result, so
 * it has to be the node it renders. `flexDirection`, `flexWrap` and the three gap keys are
 * withheld for the same reason — they are the grid's mechanism, not its decoration.
 */
export type GridProps = Omit<ViewProps, 'style'> &
  GridOwnProps &
  Omit<
    ViewStyleProps,
    | keyof GridOwnProps
    | keyof ViewProps
    | 'flexDirection'
    | 'flexWrap'
    | 'columnGap'
    | 'rowGap'
  >

type GridItemOwnProps = {
  /** How many columns the cell covers. Clamped to the grid's count. @default 1 */
  span?: number
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** `width` is the grid's answer, so it is not a prop here. */
export type GridItemProps = Omit<ViewProps, 'style'> &
  GridItemOwnProps &
  Omit<ViewStyleProps, keyof GridItemOwnProps | keyof ViewProps | 'width'>
