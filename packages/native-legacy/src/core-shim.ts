/**
 * What `@xaui/core` used to be, for the frozen tree only.
 *
 * `@xaui/core` is dissolved in v1: its palette moved into `@xaui/native/theme`, its
 * declarative types were copied into `src/types/`, and its MD3 colour object no longer
 * exists anywhere — it is projected from the v1 theme on demand (`toLegacyTheme`).
 *
 * This module holds **no theme state**: there is exactly one `XAUIProvider`, it lives in
 * `@xaui/native`, and legacy reads its context like any v1 component would. Two providers
 * would mean two React contexts and no screen-by-screen migration.
 */

export { palette as colors } from '@xaui/native/theme'

export {
  getSafeThemeColor,
  withOpacity,
  withPaletteNumber,
} from './shim/colors-utils'

export { defaultDarkTheme, defaultTheme } from './shim/default-theme'
export { toLegacyTheme } from './shim/to-legacy-theme'

export type {
  ColorScheme,
  PartialXUITheme,
  ThemeColors,
  XUITheme,
} from './shim/legacy-theme'
