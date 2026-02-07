import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type RoundedViewProps = {
  /**
   * Content to be displayed inside the rounded view
   */
  children: ReactNode
  /**
   * Border radius for all corners in pixels
   */
  all?: number
  /**
   * Border radius for top corners (topLeft and topRight) in pixels
   */
  top?: number
  /**
   * Border radius for bottom corners (bottomLeft and bottomRight) in pixels
   */
  bottom?: number
  /**
   * Border radius for left corners (topLeft and bottomLeft) in pixels
   */
  left?: number
  /**
   * Border radius for right corners (topRight and bottomRight) in pixels
   */
  right?: number
  /**
   * Border radius for top-left corner in pixels
   */
  topLeft?: number
  /**
   * Border radius for top-right corner in pixels
   */
  topRight?: number
  /**
   * Border radius for bottom-left corner in pixels
   */
  bottomLeft?: number
  /**
   * Border radius for bottom-right corner in pixels
   */
  bottomRight?: number
  /**
   * Whether the view should take full width
   * @default false
   */
  fullWidth?: boolean
  /**
   * Background color of the view
   */
  backgroundColor?: string
  /**
   * Custom style for the view
   */
  style?: ViewStyle
}
