import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type CenterProps = {
  /**
   * Content to render inside the centered container.
   */
  children: ReactNode
  /**
   * Force the container to take the full width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Additional style for the container.
   */
  style?: StyleProp<ViewStyle>
}
