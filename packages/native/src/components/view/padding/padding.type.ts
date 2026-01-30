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
  value?: number
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
   * Custom style for the padding container.
   */
  style?: StyleProp<ViewStyle>
}
