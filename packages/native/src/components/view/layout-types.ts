import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type MainAxisAlignment =
  | 'start'
  | 'end'
  | 'center'
  | 'spaceBetween'
  | 'spaceAround'
  | 'spaceEvenly'

export type CrossAxisAlignment = 'start' | 'end' | 'center' | 'stretch'

/** Controls how much space the flex widget occupies in its main axis. */
export type MainAxisSize = 'min' | 'max'

export type Direction = 'horizontal' | 'vertical'

export type FlexProps = {
  /** Content to render inside the flex container. */
  children?: ReactNode
  /** Axis direction — `'horizontal'` for row, `'vertical'` for column. */
  direction: Direction
  /** How to place children along the main axis. @default 'start' */
  mainAxisAlignment?: MainAxisAlignment
  /** How to place children along the cross axis. @default 'center' */
  crossAxisAlignment?: CrossAxisAlignment
  /** Whether the flex takes max or min space in the main axis. @default 'max' */
  mainAxisSize?: MainAxisSize
  /** Wrap children onto multiple lines when they overflow. @default false */
  wrap?: boolean
  /** Gap in logical pixels between children. */
  gap?: number
  /** Reverse the layout direction. @default false */
  reversed?: boolean
  /** Flex factor applied to the container itself. */
  flex?: number
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
  /** Test identifier for e2e tests. */
  testID?: string
}

export type RowProps = Omit<FlexProps, 'direction'>

export type ColumnProps = Omit<FlexProps, 'direction'>

/** Controls how a `Flexible` child sizes itself within available space. */
export type FlexFit = 'tight' | 'loose'

export type FlexibleProps = {
  /** Content to render inside the flexible container. */
  children?: ReactNode
  /** Flex factor — how much space to claim relative to siblings. @default 1 */
  flex?: number
  /**
   * Sizing behaviour:
   * - `'tight'` — force the child to fill all allotted space (like `Expanded`).
   * - `'loose'` — allow the child to be at most the allotted size but no larger.
   * @default 'loose'
   */
  fit?: FlexFit
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
  /** Test identifier for e2e tests. */
  testID?: string
}

export type WrapProps = {
  /** Content to render inside the wrap container. */
  children?: ReactNode
  /** Primary axis direction. @default 'horizontal' */
  direction?: Direction
  /** Alignment of children along the main axis within each run. @default 'start' */
  alignment?: MainAxisAlignment
  /** Alignment of runs along the cross axis. @default 'start' */
  runAlignment?: MainAxisAlignment
  /** Space between children along the main axis. @default 0 */
  spacing?: number
  /** Space between runs along the cross axis. @default 0 */
  runSpacing?: number
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
  /** Test identifier for e2e tests. */
  testID?: string
}
