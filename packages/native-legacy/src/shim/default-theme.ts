import { defaultTheme as v1DefaultTheme } from '@xaui/native/theme'
import { toLegacyTheme } from './to-legacy-theme'
import type { XUITheme } from './legacy-theme'

/**
 * The unthemed defaults, in MD3 shape. They are a projection of v1's own defaults, not a
 * second source of truth — which is why changing a token in `tooling/tokens` moves these
 * too.
 */
export const defaultTheme: XUITheme = toLegacyTheme(v1DefaultTheme.light)
export const defaultDarkTheme: XUITheme = toLegacyTheme(v1DefaultTheme.dark)
