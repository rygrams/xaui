import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { IconContextValue } from '../../system/icon'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type ListSlot =
  | 'root'
  | 'container'
  | 'separator'
  | 'item'
  | 'itemPressed'
  | 'prefix'
  | 'content'
  | 'title'
  | 'description'
  | 'suffix'

/**
 * The `Accordion`'s ladder, because a list is the same container with rows that do not
 * open. `tertiary` drops the fill for a border and `ghost` drops that too, for a list on a
 * surface that is already the level below.
 */
export type ListVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type ListSize = Size

type ListOwnProps = {
  children?: ReactNode
  variant?: ListVariant
  size?: ListSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  /** Whether a hairline is drawn between the rows. */
  hasSeparator?: boolean
  isDisabled?: boolean
  asChild?: boolean
}

export type ListProps = ListOwnProps &
  Omit<ViewProps, keyof ListOwnProps> &
  Omit<ViewStyleProps, keyof ListOwnProps | keyof ViewProps>

type ListItemOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

/** A plain row: a `View`, with no press state and nothing to announce. */
export type ListItemProps = ListItemOwnProps &
  Omit<ViewProps, keyof ListItemOwnProps> &
  Omit<ViewStyleProps, keyof ListItemOwnProps | keyof ViewProps>

type ListItemButtonOwnProps = {
  children?: ReactNode
  isDisabled?: boolean
  asChild?: boolean
}

/** A row you can press, used in place of `List.Item` rather than inside it. */
export type ListItemButtonProps = ListItemButtonOwnProps &
  Omit<PressableProps, keyof ListItemButtonOwnProps> &
  Omit<ViewStyleProps, keyof ListItemButtonOwnProps | keyof PressableProps>

type ListSlotOwnProps = {
  children?: ReactNode
}

export type ListItemPrefixProps = ListSlotOwnProps &
  Omit<ViewProps, keyof ListSlotOwnProps> &
  Omit<ViewStyleProps, keyof ListSlotOwnProps | keyof ViewProps>

export type ListItemContentProps = ListItemPrefixProps
export type ListItemSuffixProps = ListItemPrefixProps

export type ListItemTitleProps = ListSlotOwnProps &
  Omit<TextProps, keyof ListSlotOwnProps> &
  Omit<TextStyleProps, keyof ListSlotOwnProps | keyof TextProps>

export type ListItemDescriptionProps = ListItemTitleProps

/** R5 — resolved style ids, never a token for a slot to resolve again. */
export type ListContextValue = {
  separatorStyle: StyleProp<TextStyle>
  itemStyle: StyleProp<TextStyle>
  itemPressedStyle: StyleProp<TextStyle>
  prefixStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<TextStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  suffixStyle: StyleProp<TextStyle>
  /** What an `Icon` in a prefix or a suffix inherits, so a row's glyphs match its type. */
  glyph: IconContextValue
  isDisabled: boolean
}
