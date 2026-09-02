import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type MasonryGridProps = {
  /**
   * Items to render inside the masonry grid.
   */
  children: ReactNode
  /**
   * Number of columns.
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
   * Custom style for each column container.
   */
  columnStyle?: StyleProp<ViewStyle>
}
