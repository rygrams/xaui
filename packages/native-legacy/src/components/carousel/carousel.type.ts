import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Radius } from '../../types'

/**
 * Carousel layout variants
 * - multi-browse: Shows multiple items with the main item centered
 * - uncontained: Items can be scrolled freely without constraints
 * - hero: Single large item display
 * - full-screen: Items take the full width of the screen
 */
export type CarouselLayout = 'multi-browse' | 'uncontained' | 'hero' | 'full-screen'

/**
 * Custom appearance styles for carousel components
 */
export type CarouselCustomAppearance = {
  /**
   * Custom style for the carousel container
   */
  container?: ViewStyle
  /**
   * Custom style for each carousel item
   */
  item?: ViewStyle
  /**
   * Custom style for the indicator container
   */
  indicatorContainer?: ViewStyle
  /**
   * Custom style for inactive indicators
   */
  indicator?: ViewStyle
  /**
   * Custom style for the active indicator
   */
  activeIndicator?: ViewStyle
}

export type CarouselProps<T> = {
  /**
   * Array of data items to be displayed in the carousel
   */
  data: T[]
  /**
   * Function to render each carousel item
   */
  renderItem: (info: { item: T; index: number }) => ReactNode
  /**
   * Function to extract unique keys for each item
   */
  keyExtractor?: (item: T, index: number) => string
  /**
   * The layout variant of the carousel
   * @default 'multi-browse'
   */
  layout?: CarouselLayout
  /**
   * Width of each carousel item in pixels
   */
  itemWidth?: number
  /**
   * Height of each carousel item in pixels
   */
  itemHeight?: number
  /**
   * Spacing between carousel items in pixels
   * @default 4 for 'multi-browse', 8 for other layouts
   */
  itemSpacing?: number
  /**
   * Padding around the carousel content in pixels
   * @default 16
   */
  contentPadding?: number
  /**
   * Border radius of carousel items
   * @default 'md'
   */
  radius?: Radius
  /**
   * Whether to show the indicator dots below the carousel
   * @default true
   */
  showIndicator?: boolean
  /**
   * Whether to enable auto-play functionality
   * @default false
   */
  autoPlay?: boolean
  /**
   * Interval in milliseconds between auto-play transitions
   * @default 3000
   */
  autoPlayInterval?: number
  /**
   * Initial index to display when the carousel mounts
   * @default 0
   */
  initialIndex?: number
  /**
   * Callback fired when the active item changes
   */
  onActiveItemChange?: (index: number) => void
  /**
   * Custom appearance styles for carousel components
   */
  customAppearance?: CarouselCustomAppearance
}

/**
 * Props for individual carousel item wrapper
 */
export type CarouselItemProps = {
  /**
   * Content to be displayed inside the carousel item
   */
  children: ReactNode
  /**
   * Width of the carousel item in pixels
   */
  width: number
  /**
   * Height of the carousel item in pixels
   */
  height: number
  /**
   * Border radius of the carousel item in pixels
   */
  radius: number
  /**
   * Spacing to apply after the item (margin right)
   */
  spacing: number
  /**
   * Whether this is the last item in the carousel
   */
  isLast: boolean
  /**
   * Custom style to be applied to the item container
   */
  customStyle?: ViewStyle
}

/**
 * Configuration object for carousel layout calculations
 */
export type CarouselLayoutConfig = {
  /**
   * The layout variant of the carousel
   */
  layout: CarouselLayout
  /**
   * Total width of the carousel container in pixels
   */
  containerWidth: number
  /**
   * Preferred width for carousel items in pixels
   */
  preferredItemWidth: number
  /**
   * Spacing between items in pixels
   */
  itemSpacing: number
  /**
   * Padding around the content in pixels
   */
  contentPadding: number
}

/**
 * Result of carousel layout calculations
 */
export type CarouselLayoutResult = {
  /**
   * Computed width for each carousel item in pixels
   */
  computedItemWidth: number
  /**
   * Snap interval for scrolling in pixels
   */
  snapInterval: number
  /**
   * Whether paging is enabled for the ScrollView
   */
  pagingEnabled: boolean
}
