import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type PaddingProps = {
  /**
   * Content to render inside the padding container.
   */
  children: ReactNode
  /**
   * Padding on all sides.
   */
  all?: number
  /**
   * Horizontal padding.
   */
  horizontal?: number
  /**
   * Vertical padding.
   */
  vertical?: number
  /**
   * Top padding.
   */
  top?: number
  /**
   * Right padding.
   */
  right?: number
  /**
   * Bottom padding.
   */
  bottom?: number
  /**
   * Left padding.
   */
  left?: number
  /**
   * Whether the padding container should take the full width of its parent.
   * @default false
   */
  fullWidth?: boolean
  /**
   * If true, the padding container will grow to fill available space.
   * @default false
   */
  noGrowth?: boolean
  /**
   * Custom style for the padding container.
   */
  style?: StyleProp<ViewStyle>
}
