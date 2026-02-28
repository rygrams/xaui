import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type CenterProps = {
  /**
   * Content to render inside the centered container.
   */
  children: ReactNode
  /**
   * Whether the centered container should take the full width of its parent.
   * @default false
   */
  fullWidth?: boolean
  /**
   * If true, the centered container will grow to fill available space.
   * @default false
   */
  noGrowth?: boolean
  /**
   * Additional style for the container.
   */
  style?: StyleProp<ViewStyle>
}
