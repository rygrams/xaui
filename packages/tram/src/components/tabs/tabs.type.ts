import type { ReactNode } from 'react'
import type {
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TabSpan, TabStop, TabTravel } from '../../system/tab-row'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type TabsSlot =
  | 'root'
  | 'list'
  | 'trigger'
  | 'label'
  | 'indicator'
  | 'content'

export type TabsSize = TramSize

type TabsOwnProps = {
  children?: ReactNode
  /** The titles' type — `subtitle`, `title`, `section` — and a tab's height: 40, 48, 56. */
  size?: TabsSize
  /** The corner of `Tabs.Indicator`'s rule, under the Tram ceiling. Nothing else has one. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, for `Tabs.Indicator` alone: the rule is that accent
   * read as ink. Without an indicator no accent shows anywhere in the tabs.
   */
  accent?: TramAccentName
  /** A raw tint for `Tabs.Indicator`, never a token. Wins over `accent`, never corrected. */
  color?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Greys the whole row — and the rule, when one is written — and stops every press. */
  isDisabled?: boolean
}

export type TabsProps = TabsOwnProps &
  Omit<ViewProps, keyof TabsOwnProps> &
  Omit<ViewStyleProps, keyof TabsOwnProps | keyof ViewProps>

type TabsListOwnProps = { children?: ReactNode }

/**
 * The row scrolls, so it takes a `ScrollView`'s props where Native's takes a `View`'s —
 * `contentContainerStyle` is where the titles are padded or spaced.
 */
export type TabsListProps = TabsListOwnProps &
  Omit<ScrollViewProps, keyof TabsListOwnProps | 'horizontal'> &
  Omit<ViewStyleProps, keyof TabsListOwnProps | keyof ScrollViewProps>

/** What a trigger's render function is handed. */
export type TabsTriggerRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type TabsTriggerOwnProps = {
  value: string
  isDisabled?: boolean
  children?: ReactNode | ((state: TabsTriggerRenderState) => ReactNode)
  asChild?: boolean
}

export type TabsTriggerProps = TabsTriggerOwnProps &
  Omit<PressableProps, keyof TabsTriggerOwnProps> &
  Omit<ViewStyleProps, keyof TabsTriggerOwnProps | keyof PressableProps>

type TabsLabelOwnProps = { children?: ReactNode }

export type TabsLabelProps = TabsLabelOwnProps &
  Omit<TextProps, keyof TabsLabelOwnProps> &
  Omit<TextStyleProps, keyof TabsLabelOwnProps | keyof TextProps>

/** The indicator takes no props of its own — where it goes is the root's business. */
export type TabsIndicatorProps = Omit<ViewProps, 'children'> & ViewStyleProps

type TabsContentOwnProps = { value: string; children?: ReactNode }

export type TabsContentProps = TabsContentOwnProps &
  Omit<ViewProps, keyof TabsContentOwnProps> &
  Omit<ViewStyleProps, keyof TabsContentOwnProps | keyof ViewProps>

/** Where the rule lies under a tab: how far from the row's start, and how wide. */
export type TabRule = { start: number; width: number }

/** What a trigger tells the row about itself. Mutable: `isDisabled` follows the prop. */
export type TabEntry = { isDisabled: boolean; focus: () => void }

/**
 * The row's own record of its tabs — their order, where they lie, what can be chosen.
 * Outside React state: a tab that is laid out re-renders nothing, and only the indicator
 * subscribes.
 */
export type TabRow = {
  /** Adds a tab at the end of the row; the function it returns takes it out. */
  register: (value: string, entry: TabEntry) => () => void
  order: () => string[]
  stops: () => TabStop[]
  focus: (value: string) => void
  setSpan: (value: string, span: TabSpan) => void
  /** The label's span inside its trigger — only reported while an indicator is written. */
  setLabel: (value: string, span: TabSpan) => void
  setContent: (width: number) => void
  span: (value: string) => TabSpan | undefined
  content: () => number
  isReversed: () => boolean
  /** How far from the row's start its first tab rests: the page's margin. */
  margin: () => number
  /** Where the rule goes for a tab. The same object until it moves. */
  rule: (value: string) => TabRule | undefined
  subscribe: (listener: () => void) => () => void
}

/** R5 — resolved styles and the state the slots read. */
export type TabsContextValue = {
  listStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  /** A tab that cannot be chosen and is not the chosen one: dimmed as well as grey. */
  triggerDisabledStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  /** The two ends of a title's fade: every tab but the chosen one, and the chosen one. */
  tones: { rest: string; chosen: string }
  /** How far a trigger's `hitSlop` reaches, above and below, for a tab drawn under 48. */
  reach: number
  value: string | undefined
  /** The tab whose panel is on screen: `value`, once the panel before it has faded out. */
  shown: string | undefined
  isDisabled: boolean
  /** An ancestor's `disable-all`: everything is set, nothing moves. */
  isStill: boolean
  select: (value: string) => void
  /**
   * The way the last change of tab went: 1 toward the end of the row, -1 toward its
   * start, 0 before any change. For a content that cascades by hand.
   */
  travel: TabTravel
  /** The sign of "toward the end" along the x axis: -1 in a row that runs from the right. */
  towardEnd: 1 | -1
  /** The opacity of the panel on its way out. */
  leaving: SharedValue<number>
  row: TabRow
  /** Whether a `Tabs.Indicator` is written: labels measure themselves only then. */
  hasIndicator: boolean
  /** Called by the indicator as it mounts; the function it returns is for its unmount. */
  claimIndicator: () => () => void
  tabId: (value: string) => string
  panelId: (value: string) => string
}

/** One trigger's own state, for the label inside it. */
export type TabsTriggerContextValue = TabsTriggerRenderState & {
  value: string
  /** 0 at rest, 1 chosen: what the title's colour follows. */
  chosen: SharedValue<number>
}
