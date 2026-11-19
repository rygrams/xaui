import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  AsChildProps,
  IconContextValue,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type EmptyStateSlot =
  | 'root'
  | 'header'
  | 'media'
  | 'mediaIcon'
  | 'mediaGlyph'
  | 'title'
  | 'description'
  | 'content'

/**
 * Native's three grounds, kept by name — an empty state reports nothing, so it has no
 * drawing to choose in the `Button`'s sense, only where it sits:
 *
 * | Variant    | Ground                                                  |
 * | ---------- | ------------------------------------------------------- |
 * | `plain`    | the page (default)                                      |
 * | `surface`  | the discreet surface, the `Card`'s                      |
 * | `outlined` | the page inside a solid line of 2 in `muted` — no dash  |
 */
export type EmptyStateVariant = 'plain' | 'surface' | 'outlined'

export type EmptyStateSize = TramSize

/**
 * How the media is drawn. `plain` renders it as it is — an avatar, an illustration, a
 * photo. `icon` puts a glyph on a square of the accent: a small tile, where Native draws
 * a muted circle.
 */
export type EmptyStateMediaVariant = 'plain' | 'icon'

type EmptyStateOwnProps = {
  variant?: EmptyStateVariant
  /** The media's square, the gaps and the type. Never a height. */
  size?: EmptyStateSize
  /** Overrides the Tram corner of 2; the scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /** One of the twenty named accents: it repaints the media's square. */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`, and lands on the square too. */
  color?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type EmptyStateProps = EmptyStateOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof EmptyStateOwnProps> &
  Omit<ViewStyleProps, keyof EmptyStateOwnProps | keyof ViewProps>

export type EmptyStateViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

export type EmptyStateTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type EmptyStateMediaOwnProps = {
  /** @default 'plain' */
  variant?: EmptyStateMediaVariant
  children?: ReactNode
}

export type EmptyStateMediaProps = EmptyStateMediaOwnProps &
  Omit<ViewProps, keyof EmptyStateMediaOwnProps> &
  Omit<ViewStyleProps, keyof EmptyStateMediaOwnProps | keyof ViewProps>

/** Resolved styles, not props for a slot to resolve a second time. */
export type EmptyStateContextValue = {
  headerStyle: StyleProp<ViewStyle>
  mediaStyle: StyleProp<ViewStyle>
  mediaIconStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<ViewStyle>
  /** Values, not a style: a glyph on the square, in the ink that reads on the accent. */
  icon: IconContextValue
  /** A glyph left on the page, in `plain` media: the page's `muted`. */
  plainIcon: IconContextValue
}
