import { createTheme } from '@xaui/native/theme'
import type { XAUIThemeSet } from '@xaui/native/theme'
import { registerThemeSet } from './theme-in-contrast'
import { buildTramThemeConfig } from './tram-theme-config'
import type { TramThemeOptions } from './tram-theme-config'

/**
 * Build it once, at module level, like any XAUI theme:
 *
 * ```ts
 * export const appTheme = createTramTheme({ accent: 'magenta' })
 * ```
 *
 * The result is a plain `XAUIThemeSet`: the recipe engine and its cache are Native's.
 * With a base of 2, `radius.lg` and `radius.field` are the Tram corner and nothing in
 * this package reads a larger key, except `radius.full` for a circle. The set is also
 * registered, so a band in the theme's contrast can find its other mode
 * (`themeInContrast`).
 */
export function createTramTheme(options: TramThemeOptions = {}): XAUIThemeSet {
  const set = createTheme(buildTramThemeConfig(options))
  registerThemeSet(set)
  return set
}

export const tramTheme = createTramTheme()
