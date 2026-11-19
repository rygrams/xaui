import type { XAUITheme, XAUIThemeSet } from '@xaui/native/theme'

/**
 * Each mode a Tram set resolves to, pointing back at its set. The provider hands a
 * component one mode and nothing else, so a band drawn in the theme's contrast finds the
 * other mode here. Weak: a set the app drops goes with its entries.
 */
const SETS = new WeakMap<XAUITheme, XAUIThemeSet>()

/** Called by `createTramTheme` on every set it builds. */
export function registerThemeSet(set: XAUIThemeSet): void {
  SETS.set(set.light, set)
  SETS.set(set.dark, set)
}

/**
 * The other mode of the set `theme` came from: the light theme for the dark one, and the
 * other way round. A band in the theme's contrast — white on the dark theme, black on the
 * light one — is that mode's page, so what is put on it reads that mode.
 *
 * `undefined` for a theme `createTramTheme` did not build: there is no set to look in.
 */
export function themeInContrast(theme: XAUITheme): XAUITheme | undefined {
  const set = SETS.get(theme)
  if (!set) return undefined
  return theme === set.dark ? set.light : set.dark
}
