import type { ReactElement } from 'react'
import type { FlatListProps, StyleProp, ViewStyle } from 'react-native'

export type GridBuilderRenderItem<T> = (info: {
  item: T
  index: number
}) => ReactElement | null

export type GridBuilderItemBuilder<T> = (info: {
  item?: T
  index: number
}) => ReactElement | null

export type GridBuilderProps<T> = {
  /**
   * Data to render in the grid.
   */
  data?: readonly T[]
  /**
   * Number of items to render (Flutter-style).
   */
  itemCount?: number
  /**
   * Render function for each item.
   */
  renderItem?: GridBuilderRenderItem<T>
  /**
   * Builder function for each item (Flutter-style).
   */
  itemBuilder?: GridBuilderItemBuilder<T>
  /**
   * Extract a stable key for each item.
   */
  keyExtractor?: (item: T, index: number) => string
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
   * Custom style for each grid item container.
   */
  itemStyle?: StyleProp<ViewStyle>
  /**
   * Additional props forwarded to the FlatList.
   */
  listProps?: Omit<
    FlatListProps<T>,
    'data' | 'renderItem' | 'numColumns' | 'keyExtractor'
  >
  /**
   * Enable or disable scrolling.
   */
  scrollEnabled?: boolean
}
