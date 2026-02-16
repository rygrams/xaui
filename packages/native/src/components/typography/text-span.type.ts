import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type TextSpanAlign = 'baseline' | 'center' | 'end' | 'start' | 'stretch'

export type TextSpanProps = {
  /**
   * The content to display inside the text span.
   */
  children: ReactNode
  /**
   * Inherited text color for nested Typography.
   */
  color?: TextStyle['color']
  /**
   * Inherited text weight for nested Typography.
   */
  fontWeight?: TextStyle['fontWeight']
  /**
   * Inherited text style for nested Typography.
   */
  fontStyle?: TextStyle['fontStyle']
  /**
   * Inherited text transform for nested Typography.
   */
  textTransform?: TextStyle['textTransform']
  /**
   * Spacing between children in the container.
   */
  spacing?: number
  /**
   * Cross-axis alignment for children.
   * @default 'start'
   */
  align?: TextSpanAlign
  /**
   * Background color for the text span container.
   */
  backgroundColor?: ViewStyle['backgroundColor']
  /**
   * Custom styles for the text span container.
   */
  style?: StyleProp<ViewStyle>
}
