import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type MasonryGridItemProps = {
  /**
   * The content to render inside the masonry item.
   */
  children: ReactNode
  /**
   * Custom style for the masonry item container.
   */
  style?: StyleProp<ViewStyle>
}
