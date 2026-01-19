import { useContext } from 'react'
import { XUIThemeContext } from './theme-provider'
import type { XUITheme } from './theme-config'

export function useXUITheme(): XUITheme {
  const theme = useContext(XUIThemeContext)

  if (!theme) {
    throw new Error('useXUITheme must be used within XUIProvider')
  }

  return theme
}
