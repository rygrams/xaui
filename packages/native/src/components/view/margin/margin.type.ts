import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type MarginProps = {
  /**
   * Content to render inside the margin container.
   */
  children: ReactNode
  /**
   * Margin on all sides.
   */
  all?: number
  /**
   * Horizontal margin.
   */
  horizontal?: number
  /**
   * Vertical margin.
   */
  vertical?: number
  /**
   * Top margin.
   */
  top?: number
  /**
   * Right margin.
   */
  right?: number
  /**
   * Bottom margin.
   */
  bottom?: number
  /**
   * Left margin.
   */
  left?: number
  /**
   * Custom style for the margin container.
   */
  style?: StyleProp<ViewStyle>
}
