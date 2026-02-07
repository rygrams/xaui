import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type AspectRatioProps = {
  /**
   * Content to be displayed inside the aspect ratio container
   */
  children: ReactNode
  /**
   * Aspect ratio as a number (width / height)
   * Examples: 16/9, 4/3, 1, 2/1
   */
  ratio: number
  /**
   * Custom style for the container
   */
  style?: ViewStyle
}
