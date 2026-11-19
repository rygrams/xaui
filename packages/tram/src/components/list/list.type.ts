import type { ReactElement, ReactNode, RefAttributes } from 'react'
import type {
  FlatList,
  FlatListProps,
  GestureResponderEvent,
  ListRenderItem,
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
import type { XAUITheme } from '@xaui/native/theme'
import type { TramAccentName } from '../../theme/tram-tokens'

export type ListSlot =
  | 'root'
  | 'item'
  | 'leading'
  | 'content'
  | 'title'
  | 'bareTitle'
  | 'subtitle'
  | 'description'
  | 'action'
  | 'actionText'
  | 'swipe'
  | 'swipeAction'
  | 'swipeActionLabel'

type ListOwnProps<ItemT> = {
  /** Renders the compound row for one item. */
  renderItem: ListRenderItem<ItemT>
  /**
   * One of the twenty named accents — `accent="crimson"` — for the squares of
   * `List.Leading`, the line of `List.Subtitle` and the swipe actions. `color` wins when
   * both are set.
   */
  accent?: TramAccentName
  /**
   * A raw tint, never a token: the squares, the subtitles read in it, the swipe actions.
   * Never corrected — not even kept apart from the grey of the descriptions.
   */
  color?: string
  /**
   * Whether the first rows arrive in a cascade, one after the other, as the list first
   * shows some. @default true
   */
  hasEntrance?: boolean
  /** Merge the list props into a custom `FlatList`-compatible root. */
  asChild?: boolean
  children?: ReactElement
}

/**
 * Native's own lock, kept: the separator is Tram's space between the rows, and the list
 * is one column, read from the top.
 */
type LockedFlatListProp =
  | 'ItemSeparatorComponent'
  | 'horizontal'
  | 'inverted'
  | 'numColumns'

export type ListProps<ItemT> = ListOwnProps<ItemT> &
  Omit<FlatListProps<ItemT>, keyof ListOwnProps<ItemT> | LockedFlatListProp> &
  Omit<ViewStyleProps, keyof ListOwnProps<ItemT> | keyof FlatListProps<ItemT>>

type ListItemOwnProps = {
  children?: ReactNode
  /**
   * Makes the row a button: pressed, it leans toward the finger and shrinks a little,
   * felt as a `press`. Left out, the row does not move — as in Native, where a row's
   * press belongs to the control the app puts in it.
   */
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
  /** Greys the row and stops its press and its swipe. */
  isDisabled?: boolean
  asChild?: boolean
}

export type ListItemProps = ListItemOwnProps &
  Omit<ViewProps, keyof ListItemOwnProps> &
  Omit<ViewStyleProps, keyof ListItemOwnProps | keyof ViewProps>

type ListViewSlotOwnProps = { children?: ReactNode }

export type ListContentProps = ListViewSlotOwnProps &
  Omit<ViewProps, keyof ListViewSlotOwnProps> &
  Omit<ViewStyleProps, keyof ListViewSlotOwnProps | keyof ViewProps>

export type ListActionProps = ListContentProps

export type ListSwipeProps = ListContentProps

type ListLeadingOwnProps = {
  children?: ReactNode
  /** Merge the square into the one child — an `Image`, which then fills it. */
  asChild?: boolean
}

export type ListLeadingProps = ListLeadingOwnProps &
  Omit<ViewProps, keyof ListLeadingOwnProps> &
  Omit<ViewStyleProps, keyof ListLeadingOwnProps | keyof ViewProps>

type ListTextSlotOwnProps = { children?: ReactNode }

export type ListTitleProps = ListTextSlotOwnProps &
  Omit<TextProps, keyof ListTextSlotOwnProps> &
  Omit<TextStyleProps, keyof ListTextSlotOwnProps | keyof TextProps>

export type ListSubtitleProps = ListTitleProps
export type ListDescriptionProps = ListTitleProps

type ListSwipeActionOwnProps = {
  /** Its label — a string is set on the caption role — and an `Icon`, in its ink. */
  children?: ReactNode
  onPress?: (event: GestureResponderEvent) => void
  /** This action's own accent: its fill. `color` wins when both are set. */
  accent?: TramAccentName
  /** A raw fill, never a token. Never corrected. */
  color?: string
}

export type ListSwipeActionProps = ListSwipeActionOwnProps &
  Omit<ViewProps, keyof ListSwipeActionOwnProps> &
  Omit<ViewStyleProps, keyof ListSwipeActionOwnProps | keyof ViewProps>

/** The styles of one row — live or grey — for the slots inside it. */
export type ListRowStyles = {
  itemStyle: StyleProp<ViewStyle>
  leadingStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  bareTitleStyle: StyleProp<TextStyle>
  subtitleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  actionStyle: StyleProp<ViewStyle>
  actionTextStyle: StyleProp<TextStyle>
  /** A glyph on the square of `Leading`. */
  leadingGlyph: IconContextValue
  /** A glyph in `Action`, drawn as its text. */
  actionGlyph: IconContextValue
}

/** Resolved values shared by every virtualized row. */
export type ListContextValue = {
  theme: XAUITheme
  live: ListRowStyles
  grey: ListRowStyles
  swipeStyle: StyleProp<ViewStyle>
  /** The list's own fill for a swipe action, when it is not the theme's accent. */
  actionFill?: string
  /** Whether the first rows arrive in a cascade, or — motion reduced — fade in. */
  hasEntrance: boolean
  /** Whether the list has shown rows: a row rendered after that is placed, not cascaded. */
  hasEntered: () => boolean
  /** The row whose actions are out — at most one; opening another closes it. */
  openRow: ListOpenRow
}

export type ListOpenRow = {
  /** This row's actions are out: the one that was open closes. */
  claim: (close: () => void) => void
  /** This row closed, or left the list. */
  release: (close: () => void) => void
  /** Closes whichever row is open — the list started scrolling. */
  closeAll: () => void
}

/** A row's place in the list, and whether it is drawn without a `Leading`. */
export type ListItemContextValue = { index: number }

export type ListRowContextValue = {
  styles: ListRowStyles
  /** No `List.Leading`: the title is the mail list's, larger. */
  isBare: boolean
}

/** What a swipe action reaches: the row it is under, to close it once pressed. */
export type ListSwipeContextValue = {
  close: () => void
  /** The width of the actions together: how far the row opens. */
  onSpan: (span: number) => void
  isDisabled: boolean
}

export type ListRootComponent = {
  <ItemT>(
    props: ListProps<ItemT> & RefAttributes<FlatList<ItemT>>
  ): ReactElement | null
  displayName?: string
}
