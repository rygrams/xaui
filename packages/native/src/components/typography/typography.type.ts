import type { ReactNode } from 'react'
import type { StyleProp, TextProps, TextStyle } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'

/**
 * The ten roles, aligned with HeroUI Native's `text` — six headings, three body steps and
 * inline code. Each one fixes **size, line height, weight and family together**, which is
 * what removes the separate `size` and `weight` props the legacy component carried, and
 * with them the illegal combinations they allowed: a heading in `weight="light"`, a
 * caption in `lg`.
 *
 * `h1`–`h6` name a level, not an HTML tag — React Native has no document outline, so the
 * number is the step on the scale and nothing more. Announcing a heading to a screen
 * reader stays explicit: `accessibilityRole="header"`.
 */
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
  /** The role. It fixes size, line height, weight and family at once. */
  variant?: TypographyVariant
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). In a text component there is only one
   * thing to tint, so it lands on the text itself.
   */
  color?: string
  /** R12 — the child element becomes the text node, keeping this variant's style. */
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

/**
 * R14 — the role's own vocabulary, then every `TextStyle` key it does not already claim.
 * `color` is the component's, so it keeps its R7 meaning here rather than becoming the
 * style key of the same name; `fontSize` and `fontWeight` stay available, which is how a
 * one-off deviation is written without inventing a prop for it.
 */
export type TypographyProps = Omit<TextProps, 'style'> &
  TypographyOwnProps &
  Omit<TextStyleProps, keyof TypographyOwnProps | keyof TextProps>

type TextSpanOwnProps = {
  /** R12 — the child element becomes the span. */
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

export type TextSpanProps = Omit<TextProps, 'style'> &
  TextSpanOwnProps &
  Omit<TextStyleProps, keyof TextSpanOwnProps | keyof TextProps>
