import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type GridProps = {
  /**
   * The grid items to render.
   */
  children: ReactNode
  /**
   * Number of columns in the grid.
   * @default 2
   */
  columns?: number
  /**
   * Spacing between rows and columns.
   */
  spacing?: number
  /**
   * Spacing between rows.
   */
  rowSpacing?: number
  /**
   * Spacing between columns.
   */
  columnSpacing?: number
  /**
   * Custom style for the grid container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom style for each grid item.
   */
  itemStyle?: StyleProp<ViewStyle>
}
