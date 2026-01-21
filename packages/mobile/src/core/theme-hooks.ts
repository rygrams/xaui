import { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { XUIThemeContext } from './theme-context'
import type { XUITheme } from '@xaui/core'

type ColorMode = 'light' | 'dark'

export function useColorMode(): ColorMode {
  const nativeScheme = useColorScheme()
  return (nativeScheme as ColorMode) ?? 'light'
}

export function useXUITheme(): XUITheme {
  const theme = useContext(XUIThemeContext)

  if (!theme) {
    throw new Error('useXUITheme must be used within XUIProvider')
  }

  return theme
}

export function useXUIColors(): XUITheme['colors'] {
  const theme = useXUITheme()

  return theme.colors
}
