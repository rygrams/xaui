import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextHostProps,
  TextStyle,
  TextStyleProps,
} from '../../system'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-xs'
  | 'code'

export type TypographySlot = 'root'

type TypographyOwnProps = {
  variant?: TypographyVariant
  color?: string
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

export type TypographyProps = TextHostProps &
  TypographyOwnProps &
  Omit<TextStyleProps, keyof TypographyOwnProps | keyof TextHostProps>

type TextSpanOwnProps = {
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

export type TextSpanProps = TextHostProps &
  TextSpanOwnProps &
  Omit<TextStyleProps, keyof TextSpanOwnProps | keyof TextHostProps>
