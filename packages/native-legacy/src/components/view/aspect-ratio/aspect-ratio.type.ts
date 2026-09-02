import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { Alignment } from '../../../types'

export type AspectRatioProps = {
  /**
   * Content to be displayed inside the aspect ratio container.
   */
  children?: ReactNode
  /**
   * Aspect ratio as a number (width / height).
   * Examples: 16/9, 4/3, 1, 2/1
   */
  ratio: number
  /**
   * How to align the child within the container.
   */
  alignment?: Alignment
  /**
   * Whether to clip content that overflows the container.
   * @default false
   */
  clip?: boolean
  /**
   * Style override applied to the underlying View.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test identifier for e2e tests.
   */
  testID?: string
}
