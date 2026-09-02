import { useContext } from 'react'
import { ThemeContext } from './theme-context'
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

export function useThemeColor(token: keyof XAUIColors): string
export function useThemeColor(tokens: Array<keyof XAUIColors>): string[]
export function useThemeColor(
  token: keyof XAUIColors | Array<keyof XAUIColors>
): string | string[] {
  const { colors } = useXAUITheme()
  return Array.isArray(token) ? token.map(key => colors[key]) : colors[token]
}
