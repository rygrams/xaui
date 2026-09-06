import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

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
 * Three grounds and an outline, narrowed as the `Card`'s are (§1 bis). An empty state
 * **reports nothing** — it is what is left when there is nothing to report — so `success`,
 * `warning` and `danger` would be an intent it cannot have.
 *
 * `outlined` is the one that is not a fill: a dashed edge round the space where the content
 * would be, which is what says "this is a container, and it is empty" rather than "there is
 * nothing here". It is the arrangement a drop target and an empty list column want.
 */
export type EmptyStateVariant = 'plain' | 'surface' | 'outlined'

export type EmptyStateSize = Size

/**
 * How the media is drawn.
 *
 * `plain` renders it as it is, which is what an avatar, an illustration or a photograph
 * wants. `icon` puts it in a circle of muted surface — the treatment a single glyph needs,
 * because a 24pt mark alone in the middle of a screen reads as a loading failure.
 */
export type EmptyStateMediaVariant = 'plain' | 'icon'

type EmptyStateOwnProps = {
  variant?: EmptyStateVariant
  /** The media's box, the gaps and the type. Never a height — it is as tall as its content. */
  size?: EmptyStateSize
  /** The outlined variant's corner. */
  radius?: RadiusKey
  /** A raw tint (R7). It lands on the icon's circle and on the outline. */
  color?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the component's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type EmptyStateProps = EmptyStateOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof EmptyStateOwnProps> &
  Omit<ViewStyleProps, keyof EmptyStateOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type EmptyStateViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
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

/** R5 — resolved style ids, never a token for a slot to resolve again. */
export type EmptyStateContextValue = {
  headerStyle: StyleProp<ViewStyle>
  mediaStyle: StyleProp<ViewStyle>
  mediaIconStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: a glyph inside the media is a third party's component, and `size`
   * and `color` are props it takes. Flattened once here, as the `Chip` and the `Alert` do.
   */
  icon: { size: number | undefined; color: string | undefined }
}
