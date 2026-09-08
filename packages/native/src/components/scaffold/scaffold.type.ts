import type { ReactNode } from 'react'
import type {
  ColorValue,
  StatusBarProps,
  StatusBarStyle,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'

export type ScaffoldSlot = 'root' | 'header' | 'headerTitle' | 'content'

/**
 * A ladder rather than an intent, like `Surface`'s: it says **how much the app's header
 * separates from the page**, from a bar you cannot miss down to no bar at all.
 *
 * `primary` is the accent bar, `secondary` the raised one the theme's `surface` draws,
 * `tertiary` the page's own ground closed by a hairline, and `ghost` that same ground with
 * no edge — the arrangement almost every app now wants, and the default.
 *
 * There is no `success` / `warning` / `danger` here: chrome reports nothing. An app whose
 * bar is its brand colour passes the tint instead — `<Scaffold color="#7c3aed">`.
 */
export type ScaffoldVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

type ScaffoldOwnProps = {
  children?: ReactNode
  variant?: ScaffoldVariant
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant, as
   * it does everywhere else: the bar of a `primary` or a `secondary`, the title and the
   * hairline of a `tertiary`, the title alone of a `ghost`.
   */
  color?: string
  asChild?: boolean
}

/**
 * R14 — the ground is a view like any other, so its own `ViewStyle` keys are props. That
 * is how an app that paints its page from an image or a gradient gets out of the way of
 * the theme's flat ground.
 */
export type ScaffoldProps = ScaffoldOwnProps &
  Omit<ViewProps, keyof ScaffoldOwnProps> &
  Omit<ViewStyleProps, keyof ScaffoldOwnProps | keyof ViewProps>

/**
 * React Native's own `StatusBar` props. Everything is optional and what the caller writes
 * wins over what the scaffold resolved — `translucent` and `hidden` are the app's call,
 * and nothing about them is in the theme.
 */
export type ScaffoldStatusBarProps = StatusBarProps

export type ScaffoldNavigatorProps = {
  /** The app's navigator — exactly one element. See `Scaffold.Navigator`. */
  children?: ReactNode
}

/**
 * The five keys a navigator is dressed with, in React Navigation's spelling — which Expo
 * Router, `@react-navigation/native-stack` and the bottom tabs all share.
 *
 * Declared structurally, so the library depends on **none** of them: this is an object of
 * styles and one flag, and the app's navigator is the thing that knows what to do with it.
 * That is what keeps `@xaui/native` free of `expo-router` even here.
 */
export type ScaffoldScreenOptions = {
  headerStyle: ViewStyle
  /** The back arrow and the header's icons. Follows the title's ink. */
  headerTintColor?: string
  headerTitleStyle: TextStyle
  headerShadowVisible: boolean
  /** The screen under the header, so a route that paints no ground does not flash white. */
  contentStyle: ViewStyle
}

/** R5 — resolved values, never props for a slot to resolve a second time. */
export type ScaffoldContextValue = {
  /**
   * Values rather than a style: `StatusBar` takes props, so the root flattens its slice
   * once here instead of in the slot.
   */
  statusBar: {
    barStyle: StatusBarStyle
    /** Android only — iOS takes the ink alone. */
    backgroundColor: ColorValue | undefined
  }
  screenOptions: ScaffoldScreenOptions
}
