import type { ReactNode } from 'react'
import type { StyleProp, TextStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type TypographyAlign = 'center' | 'justify' | 'left' | 'right'

export type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'caption'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'subtitleLarge'
  | 'subtitleMedium'
  | 'subtitleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | string

export type TypographyProps = {
  /**
   * The content to display inside the typography component.
   */
  children: ReactNode
  /**
   * The text alignment.
   */
  align?: TypographyAlign
  /**
   * The theme color for the text.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The typography variant.
   * @default 'bodyMedium'
   */
  variant?: TypographyVariant
  /**
   * Maximum number of lines to display.
   */
  maxLines?: number
  /**
   * How to handle text overflow when maxLines is set.
   * @default 'clip'
   */
  overflow?: 'clip' | 'ellipsis'
  /**
   * Custom styles for the text.
   */
  style?: StyleProp<TextStyle>
  /**
   * Custom text color override.
   */
  color?: TextStyle['color']
  /**
   * The spacing between characters.
   */
  letterSpacing?: number
  /**
   * Line height for the text.
   */
  lineHeight?: TextStyle['lineHeight']
  /**
   * The text weight.
   */
  fontWeight?: TextStyle['fontWeight']
  /**
   * The text style.
   */
  fontStyle?: TextStyle['fontStyle']
  /**
   * Text decoration line.
   */
  textDecorationLine?: TextStyle['textDecorationLine']
  /**
   * Text transform mode.
   */
  textTransform?: TextStyle['textTransform']
}
