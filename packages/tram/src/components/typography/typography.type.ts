import type { ReactNode } from 'react'
import type { StyleProp, TextProps, TextStyle } from 'react-native'
import type { TextStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramTypeRole } from '../../theme/tram-tokens'

/**
 * The eight roles of the Tram scale, `caption` (13) to `hero` (120). Each one fixes
 * **size, weight and face together** — which is why there is no `size` and no `weight`
 * prop: a `hero` in Regular or a `caption` in Light is not on the scale.
 *
 * **Not Native's names, deliberately.** Native counts heading levels, `h1` to `h6`; Metro
 * names what the text is on the page — a pivot header, a page title. There is no `code`
 * role either: the Tram scale has no monospace step.
 *
 * Announcing a heading to a screen reader stays explicit: `accessibilityRole="header"`.
 */
export type TypographyVariant = TramTypeRole

export type TypographySlot = 'root'

type TypographyOwnProps = {
  /** The role. It fixes size, weight and face at once. */
  variant?: TypographyVariant
  /**
   * One of the twenty named accents — `accent="magenta"`. Text is ink, not a fill, so the
   * accent is drawn as the mode's ink: the same hue, moved until it reads at 4.5:1 on the
   * theme's ground. `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token. In a text component there is one thing to tint,
   * so it lands on the text itself — as given, never corrected.
   */
  color?: string
  /** The child element becomes the text node, keeping this role's style. */
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

/**
 * The role's own vocabulary, then every `TextStyle` key it does not already claim.
 * `color` is the component's, so it keeps its tint meaning rather than becoming the style
 * key of the same name; `fontSize` and `textAlign` stay available for the one-off.
 */
export type TypographyProps = Omit<TextProps, 'style'> &
  TypographyOwnProps &
  Omit<TextStyleProps, keyof TypographyOwnProps | keyof TextProps>

type TextSpanOwnProps = {
  /** The child element becomes the span. */
  asChild?: boolean
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

export type TextSpanProps = Omit<TextProps, 'style'> &
  TextSpanOwnProps &
  Omit<TextStyleProps, keyof TextSpanOwnProps | keyof TextProps>
