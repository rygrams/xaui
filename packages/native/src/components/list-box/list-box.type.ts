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

export type ListBoxSlot =
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
export type ListBoxVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type ListBoxSize = Size

type ListBoxOwnProps = {
  children?: ReactNode
  variant?: ListBoxVariant
  size?: ListBoxSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  /**
   * Whether a hairline is drawn between the rows. Falls back to the `ListBoxGroup`'s, and
   * to `true` outside one.
   */
  hasSeparator?: boolean
  isDisabled?: boolean
  asChild?: boolean
}

export type ListBoxProps = ListBoxOwnProps &
  Omit<ViewProps, keyof ListBoxOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxOwnProps | keyof ViewProps>

type ListBoxItemOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

/** A plain row: a `View`, with no press state and nothing to announce. */
export type ListBoxItemProps = ListBoxItemOwnProps &
  Omit<ViewProps, keyof ListBoxItemOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxItemOwnProps | keyof ViewProps>

type ListBoxItemButtonOwnProps = {
  children?: ReactNode
  isDisabled?: boolean
  asChild?: boolean
}

/** A row you can press, used in place of `ListBox.Item` rather than inside it. */
export type ListBoxItemButtonProps = ListBoxItemButtonOwnProps &
  Omit<PressableProps, keyof ListBoxItemButtonOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxItemButtonOwnProps | keyof PressableProps>

type ListBoxSlotOwnProps = {
  children?: ReactNode
}

export type ListBoxItemPrefixProps = ListBoxSlotOwnProps &
  Omit<ViewProps, keyof ListBoxSlotOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxSlotOwnProps | keyof ViewProps>

export type ListBoxItemContentProps = ListBoxItemPrefixProps
export type ListBoxItemSuffixProps = ListBoxItemPrefixProps

export type ListBoxItemTitleProps = ListBoxSlotOwnProps &
  Omit<TextProps, keyof ListBoxSlotOwnProps> &
  Omit<TextStyleProps, keyof ListBoxSlotOwnProps | keyof TextProps>

export type ListBoxItemDescriptionProps = ListBoxItemTitleProps

/** R5 — resolved style ids, never a token for a slot to resolve again. */
export type ListBoxContextValue = {
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
