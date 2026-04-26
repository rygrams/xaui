import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type BoxConstraints = {
  /**
   * Minimum width in logical pixels.
   */
  minWidth?: number
  /**
   * Maximum width in logical pixels.
   */
  maxWidth?: number
  /**
   * Minimum height in logical pixels.
   */
  minHeight?: number
  /**
   * Maximum height in logical pixels.
   */
  maxHeight?: number
}

export type ConstrainedBoxProps = {
  /**
   * Size constraints to impose on the child — Flutter BoxConstraints equivalent.
   */
  constraints: BoxConstraints
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
