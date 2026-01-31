import { ReactNode } from 'react'
import type { ColorValue, DimensionValue, StyleProp, ViewStyle } from 'react-native'

export type SkeletonProps = {
  /**
   * The content to display when loading completes.
   */
  children: ReactNode
  /**
   * Whether the content is loaded.
   * @default false
   */
  isLoaded: boolean
  /**
   * Whether to disable the animation.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Custom background color for the skeleton.
   */
  skeletonColor?: ColorValue
  /**
   * Width of the skeleton.
   */
  width?: DimensionValue
  /**
   * Height of the skeleton.
   */
  height?: DimensionValue
  /**
   * Custom style for the skeleton container.
   */
  style?: StyleProp<ViewStyle>
}
