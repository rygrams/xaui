import { StyleSheet } from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ScaffoldScreenOptions } from './scaffold.type'

/**
 * A navigator's `screenOptions`, from the outside: the object, or a function of the route
 * that returns one. Both spellings are React Navigation's, and neither type is imported —
 * see `ScaffoldScreenOptions`.
 */
export type NavigatorScreenOptions = Record<string, unknown>

export type ScreenOptionsProp =
  | NavigatorScreenOptions
  | ((props: Record<string, unknown>) => NavigatorScreenOptions)

/** The keys whose value is a style, and therefore blends instead of choosing. */
const STYLE_KEYS = ['headerStyle', 'headerTitleStyle', 'contentStyle'] as const

/**
 * The scaffold's options under the navigator's own, so **the app has the last word on
 * every key it wrote** and inherits the theme on every key it did not.
 *
 * It is the one merge `mergeProps` cannot do. That helper gives the child the whole value
 * of a key it declares, which is right for a `style` or a handler and wrong here: an app
 * writing `screenOptions={{ headerRight }}` means "add a button", not "drop the theme's
 * header". So the three style keys are flattened rather than replaced — a
 * `headerStyle={{ height: 96 }}` keeps its ground — and everything else is a plain
 * override.
 *
 * The function form is preserved as a function: React Navigation calls it per route, and
 * resolving it here would freeze the first route's options onto every screen.
 */
export function mergeScreenOptions(
  ours: ScaffoldScreenOptions,
  theirs: ScreenOptionsProp | undefined
): ScreenOptionsProp {
  if (typeof theirs === 'function') {
    return (props: Record<string, unknown>) => blend(ours, theirs(props))
  }

  return blend(ours, theirs)
}

function blend(
  ours: ScaffoldScreenOptions,
  theirs: NavigatorScreenOptions | undefined
): NavigatorScreenOptions {
  if (!theirs) return { ...ours }

  const merged: NavigatorScreenOptions = { ...ours, ...theirs }

  for (const key of STYLE_KEYS) {
    if (!(key in theirs)) continue
    // Flattened rather than left as an array: `headerStyle` is a `StyleProp` in every
    // navigator, but the flat object is what a navigator reading `backgroundColor` off it
    // directly — the Android status bar, a custom header — can still see.
    // Cast, because a navigator's options arrive from outside and are typed as such: the
    // value under a style key is whatever the app wrote there.
    const stack = [ours[key], theirs[key]] as StyleProp<ViewStyle & TextStyle>
    merged[key] = StyleSheet.flatten(stack)
  }

  return merged
}
