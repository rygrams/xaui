import type { ReactNode } from 'react'
import type {
  ImageProps,
  ImageStyle,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  IconContextValue,
  ImageStyleProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type AvatarSlot = 'root' | 'fallback' | 'initials' | 'icon'

/**
 * The Metro thumbnail, a square, drawn three ways — the `Button`'s vocabulary, since an
 * avatar is a box in the accent:
 *
 * | Variant     | Drawn as                                       |
 * | ----------- | ---------------------------------------------- |
 * | `contained` | filled with the true colour, initials cut in   |
 * | `flat`      | filled with its soft slice                     |
 * | `outline`   | the `Button`'s line and the initials, as ink   |
 *
 * Not Native's eleven names: the three status families are a `color`, as on the `Button`.
 * No `text`: initials with no box are not a thumbnail.
 */
export type AvatarVariant = 'contained' | 'flat' | 'outline'

export type AvatarSize = TramSize

type AvatarOwnProps = {
  variant?: AvatarVariant
  /** The side — 40, 56, 72 — and the type inside it. */
  size?: AvatarSize
  /**
   * Overrides the square. Up to the Tram corner of 2, or `full` for a circle — a face in a
   * round frame, where the app wants one.
   */
  radius?: RadiusKey
  /** One of the twenty named accents, painted as the `Button` paints it. */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type AvatarProps = Omit<ViewProps, 'style'> &
  AvatarOwnProps &
  Omit<ViewStyleProps, keyof AvatarOwnProps | keyof ViewProps>

type AvatarImageOwnProps = {
  /** `false` shows the image the moment it decodes, with no fade. */
  animation?: boolean
  style?: StyleProp<ImageStyle>
}

export type AvatarImageProps = Omit<ImageProps, 'style'> &
  AvatarImageOwnProps &
  Omit<ImageStyleProps, keyof AvatarImageOwnProps | keyof ImageProps>

type AvatarFallbackOwnProps = {
  /** Initials, an `Icon`, anything. A stringifiable tree becomes `Avatar.Initials`. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export type AvatarFallbackProps = Omit<ViewProps, 'style'> &
  AvatarFallbackOwnProps &
  Omit<ViewStyleProps, keyof AvatarFallbackOwnProps | keyof ViewProps>

export type AvatarInitialsProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** Resolved styles, not props for a slot to resolve a second time. */
export type AvatarContextValue = {
  fallbackStyle: StyleProp<ViewStyle>
  initialsStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
}
