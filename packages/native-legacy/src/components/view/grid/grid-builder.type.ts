import type { ComponentType, ReactElement } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

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
   * Enable or disable scrolling.
   */
  scrollEnabled?: boolean
  /**
   * Called when the scroll reaches the end.
   */
  onEndReached?: () => void
  /**
   * Distance from end (as a fraction of the viewport height).
   * @default 0.1
   */
  onEndReachedThreshold?: number
  /**
   * Content container style for the list.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Optional header element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: ReactElement | ComponentType<any> | null
  /**
   * Optional footer element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: ReactElement | ComponentType<any> | null
}
