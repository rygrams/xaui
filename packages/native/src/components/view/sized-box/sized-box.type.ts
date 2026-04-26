import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type SizedBoxProps = {
  /**
   * Width in logical pixels.
   */
  width?: number
  /**
   * Height in logical pixels.
   */
  height?: number
  /**
   * Fills all available space — equivalent to Flutter's Expanded (flex: 1, alignSelf: 'stretch').
   * @default false
   */
  expand?: boolean
  /**
   * Collapses to zero size — equivalent to Flutter's SizedBox.shrink().
   * @default false
   */
  shrink?: boolean
  /**
   * Content to render inside the box.
   */
  children?: ReactNode
  /**
   * Style override applied to the underlying View.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test identifier for e2e tests.
   */
  testID?: string
}
