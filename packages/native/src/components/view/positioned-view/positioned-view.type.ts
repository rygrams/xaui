import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type PositionedViewProps = {
  /**
   * Content to render inside the positioned container.
   */
  children: ReactNode
  /**
   * Top offset.
   */
  top?: number
  /**
   * Right offset.
   */
  right?: number
  /**
   * Bottom offset.
   */
  bottom?: number
  /**
   * Left offset.
   */
  left?: number
  /**
   * Z-index for stacking context.
   */
  zIndex?: number
  /**
   * Custom style for the positioned container.
   */
  style?: StyleProp<ViewStyle>
}
