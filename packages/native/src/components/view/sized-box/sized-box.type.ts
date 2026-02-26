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
  width?: ViewStyle['width']
  /**
   * Height of the box.
   */
  height?: ViewStyle['height']
  /**
   * Whether the box should take the full width of its parent.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Custom style for the box.
   */
  style?: StyleProp<ViewStyle>
}
