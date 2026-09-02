import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type GridItemProps = {
  /**
   * The content to render inside the grid item.
   */
  children: ReactNode
  /**
   * Number of columns to span.
   * @default 1
   */
  span?: number
  /**
   * Custom style for the grid item.
   */
  style?: StyleProp<ViewStyle>
}
