import type { ReactNode } from 'react'
import type { TextStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type TypographyAlign = 'center' | 'justify' | 'left' | 'right'

export type TypographyVariant =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
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
   * @default 'body1'
   */
  variant?: TypographyVariant
  /**
   * Custom styles for the text.
   */
  style?: TextStyle
}
