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
import type { IconContextValue } from '../../system/icon'
import type {
  ImageStyleProps,
  TextStyleProps,
  ViewStyleProps,
} from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type AvatarSlot = 'root' | 'fallback' | 'initials' | 'icon'

/**
 * The full vocabulary (§1 bis), and the `Chip`'s eleven names exactly — an avatar is a
 * token *about* a person or a thing, which is the category the `Chip` established, so a
 * name means here what it means there.
 *
 * They colour the **frame**, which is all that shows when there is no image: `primary` is
 * the accent fill with its contrasted initials, `secondary` the soft slice, `tertiary` a
 * border and nothing else. The three status families are here because an avatar reports as
 * often as it identifies — a red frame for the account that failed to sync, a green one for
 * the person who is online.
 *
 * It is HeroUI's `variant × color` matrix said once: their `default` is this `default`, and
 * their `soft` crossed with five colours is `secondary` plus the five `-soft` names.
 */
export type AvatarVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export type AvatarSize = Size

/**
 * What the `Avatar` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the avatar's diameter and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type AvatarOwnProps = {
  variant?: AvatarVariant
  /** The diameter, and the type inside it. It sets both sides, never a width alone. */
  size?: AvatarSize
  /**
   * Overrides the circle. An avatar is round at every size — that is the shape the name
   * means — so this is the prop for the logo or the cover that wants a square.
   */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant: the
   * fill of a `primary`, the border of a `tertiary`, the initials of a `ghost`. Its
   * contrasted and soft slices are derived in OKLab, so it behaves exactly like `accent` —
   * which is also why it must be a hex value.
   */
  color?: string
  /** R12 — the child element becomes the frame and keeps this variant's style. */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type AvatarProps = Omit<ViewProps, 'style'> &
  AvatarOwnProps &
  Omit<ViewStyleProps, keyof AvatarOwnProps | keyof ViewProps>

type AvatarImageOwnProps = {
  /**
   * `false` shows the image the moment it decodes, with no fade. The frame does not change
   * either way, so a list switched off with this does not reflow.
   */
  animation?: boolean
  style?: StyleProp<ImageStyle>
}

/**
 * `Image`'s own props win over the `ImageStyle` keys of the same name (R14). `source`
 * stays required, as `Image` declares it: an `Avatar.Image` with nothing to show is an
 * `Avatar.Fallback`.
 */
export type AvatarImageProps = Omit<ImageProps, 'style'> &
  AvatarImageOwnProps &
  Omit<ImageStyleProps, keyof AvatarImageOwnProps | keyof ImageProps>

type AvatarFallbackOwnProps = {
  /**
   * Initials, an `Icon`, anything. A stringifiable tree becomes `Avatar.Initials` (R3); an
   * element is centred and left alone — and an `Icon` among them needs no props, because
   * the fallback publishes the frame's size and colour to it.
   */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export type AvatarFallbackProps = Omit<ViewProps, 'style'> &
  AvatarFallbackOwnProps &
  Omit<ViewStyleProps, keyof AvatarFallbackOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type AvatarInitialsProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type AvatarContextValue = {
  fallbackStyle: StyleProp<ViewStyle>
  initialsStyle: StyleProp<TextStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
}
