import type { ReactNode } from 'react'
import type { TextStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type TypographyAlign = 'center' | 'justify' | 'left' | 'right'

export type TypographyVariant =
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
  style?: TextStyle
}
