import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  SectionList,
  SectionListProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { PressableFeedbackProps, ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'
import type { JumpListLayout, JumpListSection } from './jump-list.sections'

export type JumpListSlot =
  | 'root'
  | 'section'
  | 'header'
  | 'headerLabel'
  | 'overlay'
  | 'grid'
  | 'row'
  | 'cell'
  | 'key'
  | 'keyLabel'
  | 'emptyKey'
  | 'emptyKeyLabel'

export type JumpListSize = TramSize

/** The list itself: `SectionList`'s props, its `sections` typed as the jump list's. */
type JumpListListProps<ItemT> = Omit<
  SectionListProps<ItemT, JumpListSection<ItemT>>,
  'sections' | 'renderSectionHeader' | 'children'
>

type JumpListOwnProps<ItemT> = {
  /** The groups, in the order they are listed — `groupByInitial` for a list of names. */
  sections: readonly JumpListSection<ItemT>[]
  /**
   * The keys of the grid, in order. A key with no section, or with an empty one, is
   * drawn grey and does not respond. @default the sections' keys
   */
  keys?: readonly string[]
  /**
   * Squares four across, or bars one under the other.
   * @default `grid` when every key is one character, `list` otherwise
   */
  layout?: JumpListLayout
  /** The headers' side and letters: 40 / 48 / 56. @default 'md' */
  size?: JumpListSize
  /** One of the twenty named accents, for headers and keys not in the theme's. */
  accent?: TramAccentName
  /** A raw `#RRGGBB` fill, never a token. Wins over `accent`. */
  color?: string
  /** Whether the grid is up. Controlled with `onOpenChange`, or left to the list. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** A key was pressed: the list lands on that group once the grid has gone. */
  onJump?: (key: string) => void
  /** The headers are dimmed and open nothing. */
  isDisabled?: boolean
  /**
   * A `JumpList.Header` to draw every header from, and a `JumpList.Overlay` to dress the
   * grid. Both optional: left out, they are drawn as they are.
   */
  children?: ReactNode
}

export type JumpListProps<ItemT> = JumpListOwnProps<ItemT> &
  Omit<JumpListListProps<ItemT>, keyof JumpListOwnProps<ItemT>> &
  Omit<
    ViewStyleProps,
    keyof JumpListOwnProps<ItemT> | keyof JumpListListProps<ItemT>
  >

/** The list's ref: the `SectionList` it renders. */
export type JumpListRef<ItemT> = SectionList<ItemT, JumpListSection<ItemT>>

/** What a header or a key is drawing, for children written as a function. */
export type JumpListGroup = {
  key: string
  /** The section's `title`, or its key. */
  title: string
  /** No row under it: a key drawn grey. Never true for a header — an empty group has none. */
  isEmpty: boolean
}

type JumpListPressableOwnProps = {
  /** Text is set in the role of its size; a function is handed the group it draws. */
  children?: ReactNode | ((group: JumpListGroup) => ReactNode)
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

type JumpListPressableProps = JumpListPressableOwnProps &
  Omit<
    PressableFeedbackProps,
    'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
  > &
  Omit<ViewStyleProps, keyof JumpListPressableOwnProps>

/**
 * Written once, as a child of the list: every header is drawn from it. Pressed, it puts
 * the grid up. Its text is the section's `title`, or its key.
 */
export type JumpListHeaderProps = JumpListPressableProps

/**
 * Written once, inside `JumpList.Overlay`: every key is drawn from it. Pressed, the grid
 * leaves and the list lands on its group.
 */
export type JumpListKeyProps = JumpListPressableProps

type JumpListOverlayOwnProps = {
  /** A `JumpList.Key` to draw every key from. */
  children?: ReactNode
}

/**
 * The grid's ground, over the whole screen. Its padding is the keys': the safe area is
 * added to it from `TramProvider`'s `safeArea`.
 */
export type JumpListOverlayProps = JumpListOverlayOwnProps &
  Omit<ViewProps, keyof JumpListOverlayOwnProps> &
  Omit<ViewStyleProps, keyof JumpListOverlayOwnProps | keyof ViewProps>

/** Where the grid is in its way in and out. */
export type JumpListPhase = 'closed' | 'arriving' | 'leaving'

export type JumpListLanding = { key: string; count: number; at: number }

/** Resolved styles and the grid's state — nothing a slot resolves again. */
export type JumpListContextValue = {
  sectionStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<ViewStyle>
  headerLabelStyle: StyleProp<TextStyle>
  overlayStyle: StyleProp<ViewStyle>
  gridStyle: StyleProp<ViewStyle>
  rowStyle: StyleProp<ViewStyle>
  cellStyle: StyleProp<ViewStyle>
  keyStyle: StyleProp<ViewStyle>
  keyLabelStyle: StyleProp<TextStyle>
  emptyKeyStyle: StyleProp<ViewStyle>
  emptyKeyLabelStyle: StyleProp<TextStyle>
  /** How far a header's `hitSlop` reaches, for one drawn under 48. */
  headerReach: number
  layout: JumpListLayout
  columns: number
  /** The grid's padding and the space between two keys: where the hinge is. */
  inset: number
  gap: number
  keys: readonly string[]
  /** The key of each group with rows. */
  filled: ReadonlySet<string>
  titleOf: (key: string) => string
  isOpen: boolean
  /** The grid is drawn: open, or on its way out. */
  isMounted: boolean
  isDisabled: boolean
  isStill: boolean
  phase: JumpListPhase
  /** The index of the key pressed, -1 while none is. */
  picked: number
  /** The grid's ground, 0 gone to 1 up. */
  veil: SharedValue<number>
  /** The group the list last landed on: a count that changes with every landing, and when. */
  landing: JumpListLanding | null
  open: () => void
  close: () => void
  jump: (key: string) => void
  /** The `JumpList.Header` written as a child, or the default one. */
  header: ReactNode
}
