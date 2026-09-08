import { useContext } from 'react'
import { appearanceFor } from './appearance'
import { ThemeContext } from './theme-context'
import type { XAUIAppearance } from './appearance'
import type { ColorMode, XAUIColors, XAUITheme } from './theme.type'

export function useXAUITheme(): XAUITheme {
  const theme = useContext(ThemeContext)
  if (theme === null) {
    throw new Error('XAUI: useXAUITheme must be used within <XAUIProvider>.')
  }
  return theme
}

/** The resolved mode — never `'system'`. */
export function useColorMode(): ColorMode {
  return useXAUITheme().mode
}

/**
 * The theme, read as app chrome: the status bar, the navigation bar, a header.
 *
 * The provider dresses everything the library renders and nothing above it, because a
 * status bar belongs to the platform and a header belongs to whatever navigator the app
 * chose. This is what an app hands to those — see `appearanceFor` for the three wirings.
 */
export function useAppearance(): XAUIAppearance {
  return appearanceFor(useXAUITheme())
}

export function useThemeColor(token: keyof XAUIColors): string
export function useThemeColor(tokens: Array<keyof XAUIColors>): string[]
export function useThemeColor(
  token: keyof XAUIColors | Array<keyof XAUIColors>
): string | string[] {
  const { colors } = useXAUITheme()
  return Array.isArray(token) ? token.map(key => colors[key]) : colors[token]
}
