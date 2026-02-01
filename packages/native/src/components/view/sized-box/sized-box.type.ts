import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type SizedBoxProps = {
  /**
   * Content to render inside the box.
   */
  children?: ReactNode
  /**
   * Width of the box.
   */
  width?: number
  /**
   * Height of the box.
   */
  height?: number
  /**
   * Custom style for the box.
   */
  style?: StyleProp<ViewStyle>
}
