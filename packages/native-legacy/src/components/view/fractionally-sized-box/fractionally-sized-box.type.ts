import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { Alignment } from '../../../types'

export type FractionallySizedBoxProps = {
  /**
   * Fraction of the parent's width (0–1). When undefined, the child chooses its own width.
   */
  widthFactor?: number
  /**
   * Fraction of the parent's height (0–1). When undefined, the child chooses its own height.
   */
  heightFactor?: number
  /**
   * How to align the child within the remaining space.
   * @default 'topLeft'
   */
  alignment?: Alignment
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
