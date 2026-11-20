import type { ReactNode } from 'react'
import type {
  ColorValue,
  StatusBarProps,
  StatusBarStyle,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'

export type ScaffoldSlot = 'root' | 'header' | 'headerTitle' | 'content'

/**
 * Native's ladder, kept: it says **how much the app's header separates from the page**,
 * which is already a way of drawing a box rather than an intent.
 *
 * | Variant     | The header                                         |
 * | ----------- | -------------------------------------------------- |
 * | `primary`   | a flat fill of the accent, its ink `onAccent`      |
 * | `secondary` | the discreet surface                               |
 * | `tertiary`  | the page's ground, closed by a line of 2 in `muted` |
 * | `ghost`     | the page's ground, no edge — the default           |
 *
 * Metro had no bar at all — the app's name and the page's giant title sat on the ground —
 * which is why `ghost` stays the default.
 */
export type ScaffoldVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

type ScaffoldOwnProps = {
  children?: ReactNode
  variant?: ScaffoldVariant
  /**
   * One of the twenty named accents. It fills the bar of a `primary` or a `secondary`
   * with its true colour, and is the title's ink — read on the page — on a `tertiary`
   * or a `ghost`.
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It lands where `accent` does, and wins over it. */
  color?: string
  asChild?: boolean
}

/**
 * R14 — the ground is a view like any other, so its own `ViewStyle` keys are props. That
 * is how an app that paints its page from an image gets out of the way of the flat ground.
 */
export type ScaffoldProps = ScaffoldOwnProps &
  Omit<ViewProps, keyof ScaffoldOwnProps> &
  Omit<ViewStyleProps, keyof ScaffoldOwnProps | keyof ViewProps>

/** React Native's own `StatusBar` props; what the caller writes wins. */
export type ScaffoldStatusBarProps = StatusBarProps

export type ScaffoldNavigatorProps = {
  /** The app's navigator — exactly one element. See `Scaffold.Navigator`. */
  children?: ReactNode
}

/**
 * The keys a navigator is dressed with, in React Navigation's spelling, declared
 * structurally so Tram depends on no navigator.
 *
 * Native's five, and a sixth: `headerTitleAlign`, `'left'` — the Metro title sits at the
 * start of its line, never in the middle. React Navigation mirrors it in a right-to-left
 * layout; iOS's native stack ignores it and keeps its centred title.
 */
export type ScaffoldScreenOptions = {
  headerStyle: ViewStyle
  /** The back arrow and the header's icons. Follows the title's ink. */
  headerTintColor?: string
  headerTitleStyle: TextStyle
  headerTitleAlign: 'left' | 'center'
  headerShadowVisible: boolean
  /** The screen under the header, so a route that paints no ground does not flash. */
  contentStyle: ViewStyle
}

/** R5 — resolved values, never props for a slot to resolve a second time. */
export type ScaffoldContextValue = {
  statusBar: {
    /** The ink that reads on the **header's** ground — light on a dark bar. */
    barStyle: StatusBarStyle
    /** Android only — iOS takes the ink alone. */
    backgroundColor: ColorValue | undefined
  }
  screenOptions: ScaffoldScreenOptions
}
