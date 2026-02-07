import type { ReactElement, ReactNode } from 'react'
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native'

export type MasonryGridBuilderRenderItem<T> = (info: {
  item: T
  index: number
}) => ReactElement | null

export type MasonryGridBuilderItemBuilder<T> = (info: {
  item?: T
  index: number
}) => ReactElement | null

export type MasonryGridBuilderProps<T> = {
  /**
   * Data to render in the masonry grid.
   */
  data?: readonly T[]
  /**
   * Number of items to render (Flutter-style).
   */
  itemCount?: number
  /**
   * Render function for each item.
   */
  renderItem?: MasonryGridBuilderRenderItem<T>
  /**
   * Builder function for each item (Flutter-style).
   */
  itemBuilder?: MasonryGridBuilderItemBuilder<T>
  /**
   * Extract a stable key for each item.
   */
  keyExtractor?: (item: T, index: number) => string
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
   * Custom style for the masonry container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom style for each column container.
   */
  columnStyle?: StyleProp<ViewStyle>
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
   * Optional header element.
   */
  header?: ReactNode
  /**
   * Optional footer element.
   */
  footer?: ReactNode
  /**
   * Content container style for the ScrollView.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Enable or disable scrolling.
   */
  scrollEnabled?: boolean
  /**
   * Show the vertical scroll indicator.
   */
  showsVerticalScrollIndicator?: boolean
  /**
   * Show the horizontal scroll indicator.
   */
  showsHorizontalScrollIndicator?: boolean
  /**
   * Enable or disable bouncing.
   */
  bounces?: boolean
  /**
   * Scroll handler called alongside internal infinite-scroll logic.
   */
  onScroll?: ScrollViewProps['onScroll']
}
