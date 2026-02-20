import type { ReactNode } from 'react'
import type { StyleProp, TextStyle } from 'react-native'
import type { TypographyAlign } from './typography.type'

export type TextSpanAlign = TypographyAlign

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
   * Spacing between children.
   */
  spacing?: number
  /**
   * Text alignment for all nested typography unless overridden.
   */
  align?: TextSpanAlign
  /**
   * Background color for the text span container.
   */
  backgroundColor?: TextStyle['backgroundColor']
  /**
   * Custom styles for the text span container.
   */
  style?: StyleProp<TextStyle>
}
