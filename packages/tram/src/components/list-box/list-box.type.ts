import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  IconContextValue,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type ListBoxSlot =
  | 'root'
  | 'item'
  | 'separator'
  | 'prefix'
  | 'square'
  | 'content'
  | 'title'
  | 'description'
  | 'suffix'
  | 'suffixText'

export type ListBoxSize = TramSize

type ListBoxOwnProps = {
  children?: ReactNode
  /** The rows' height, the type of their title and description, the prefix. Never width. */
  size?: ListBoxSize
  /**
   * One of the twenty named accents, for the squares of the prefixes — `accent="lime"`.
   * Nothing else on a row is the accent. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint, never a token: the squares of the prefixes. Never corrected. */
  color?: string
  /**
   * A line of the soft grey between two rows. Off by default: a Metro list reads by the
   * space between its rows. Falls back to the `ListBoxGroup`'s.
   */
  hasSeparator?: boolean
  /** Greys every row and stops every press. */
  isDisabled?: boolean
  /**
   * Whether the rows arrive in a cascade when the list mounts. In a `ListBoxGroup`, the
   * group's says. @default true
   */
  hasEntrance?: boolean
  asChild?: boolean
}

export type ListBoxProps = ListBoxOwnProps &
  Omit<ViewProps, keyof ListBoxOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxOwnProps | keyof ViewProps>

type ListBoxItemOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

/** A plain row: no press, no movement, a `listitem` to a screen reader. */
export type ListBoxItemProps = ListBoxItemOwnProps &
  Omit<ViewProps, keyof ListBoxItemOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxItemOwnProps | keyof ViewProps>

type ListBoxItemButtonOwnProps = {
  children?: ReactNode
  /** Greys the row and its square, and stops the press. */
  isDisabled?: boolean
  asChild?: boolean
}

/** A row you can press, used in place of `ListBox.Item` rather than inside it. */
export type ListBoxItemButtonProps = ListBoxItemButtonOwnProps &
  Omit<PressableProps, keyof ListBoxItemButtonOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxItemButtonOwnProps | keyof PressableProps>

/**
 * How the prefix is drawn: as it is given (`bare`), or on a square of the accent
 * (`square`), its glyph in the ink that reads on it.
 */
export type ListBoxItemPrefixVariant = 'bare' | 'square'

type ListBoxSlotOwnProps = {
  children?: ReactNode
}

export type ListBoxItemPrefixProps = ListBoxSlotOwnProps & {
  /** @default 'bare' */
  variant?: ListBoxItemPrefixVariant
} & Omit<ViewProps, keyof ListBoxSlotOwnProps | 'variant'> &
  Omit<ViewStyleProps, keyof ListBoxSlotOwnProps | keyof ViewProps | 'variant'>

export type ListBoxItemContentProps = ListBoxSlotOwnProps &
  Omit<ViewProps, keyof ListBoxSlotOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxSlotOwnProps | keyof ViewProps>

export type ListBoxItemSuffixProps = ListBoxItemContentProps

export type ListBoxItemTitleProps = ListBoxSlotOwnProps &
  Omit<TextProps, keyof ListBoxSlotOwnProps> &
  Omit<TextStyleProps, keyof ListBoxSlotOwnProps | keyof TextProps>

export type ListBoxItemDescriptionProps = ListBoxItemTitleProps

/** What a row's slots read: its styles, live or grey, and its glyphs. R5 — resolved. */
export type ListBoxRowStyles = {
  itemStyle: StyleProp<ViewStyle>
  prefixStyle: StyleProp<ViewStyle>
  squareStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  suffixStyle: StyleProp<ViewStyle>
  suffixTextStyle: StyleProp<TextStyle>
  /** What an `Icon` in a bare prefix takes. */
  glyph: IconContextValue
  /** What an `Icon` on the prefix's square takes: the ink that reads on the accent. */
  squareGlyph: IconContextValue
  /** What an `Icon` in the suffix takes: the muted grey. */
  suffixGlyph: IconContextValue
}

/** R5 — the two sets a row picks from, resolved once by the root. */
export type ListBoxContextValue = {
  live: ListBoxRowStyles
  grey: ListBoxRowStyles
  isDisabled: boolean
}
