import type { ColorMode, XAUITheme } from './theme.type'

/**
 * What an app's chrome needs from the theme — the status bar, the navigation bar, a
 * navigation header — and nothing about who is going to render them.
 *
 * The library depends on React Native and nothing else, so it cannot reach for
 * `expo-status-bar`, React Navigation's `screenOptions` or an Android nav-bar module. What
 * it can do is answer the question all three ask, in the two spellings they ask it in, so
 * an app wires four values instead of re-deriving them.
 */
export type XAUIAppearance = {
  /** The resolved mode — never `'system'`. */
  colorMode: ColorMode
  /**
   * The ink on the system bars, which is **the opposite of the mode**: a dark app draws
   * light text up there.
   *
   * That inversion is the whole reason this exists. `barContent === colorMode` is the bug
   * everyone writes once, and it is invisible on a simulator whose bar happens to be
   * white — it ships as a status bar nobody can read.
   */
  barContent: ColorMode
  /** `barContent` in React Native's own `StatusBar` spelling. */
  statusBarStyle: 'light-content' | 'dark-content'
  /** A bar or a header's ground, and the ink that reads on it. */
  background: string
  foreground: string
  /** The hairline under a header, for a chrome that wants an edge. */
  border: string
}

/**
 * The theme, read as app chrome.
 *
 * ```tsx
 * // React Native's own status bar — no extra dependency.
 * const { statusBarStyle, background } = useAppearance()
 * <StatusBar barStyle={statusBarStyle} backgroundColor={background} />
 *
 * // expo-status-bar, which takes the one-word form.
 * <StatusBar style={barContent} />
 *
 * // Expo Router or React Navigation.
 * <Stack screenOptions={{
 *   headerStyle: { backgroundColor: background },
 *   headerTintColor: foreground,
 *   contentStyle: { backgroundColor: background },
 * }} />
 * ```
 *
 * It is a plain function over a theme rather than a hook so the mapping can be tested —
 * the inversion above is the one line worth pinning down — and so a navigator built
 * outside the provider can be handed a theme directly. `useAppearance` is the hook over it.
 *
 * **`background` rather than `surface`.** A header painted in the page's own colour
 * disappears into it, which is the arrangement almost every app now wants; a header that
 * is a raised bar reads `surface` off the theme itself.
 */
export function appearanceFor(theme: XAUITheme): XAUIAppearance {
  const barContent: ColorMode = theme.mode === 'dark' ? 'light' : 'dark'

  return {
    colorMode: theme.mode,
    barContent,
    statusBarStyle: barContent === 'light' ? 'light-content' : 'dark-content',
    background: theme.colors.background,
    foreground: theme.colors.foreground,
    border: theme.colors.border,
  }
}
