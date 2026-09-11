import { useSyncExternalStore } from 'react'
import { defaultTheme } from '../theme/create-theme'
import { ThemeContext } from '../theme/theme-context'
import type { ColorMode } from '../theme/theme.type'
import type { XAUIProviderProps } from './xaui-provider.type'

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

function subscribeToColorMode(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined
  const query = window.matchMedia(DARK_MODE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function colorModeSnapshot(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light'
}

function serverColorModeSnapshot(): ColorMode {
  return 'light'
}

export function XAUIProvider({
  children,
  theme = defaultTheme,
  colorMode = 'system',
  hasPortalHost: _hasPortalHost = true,
}: XAUIProviderProps) {
  const systemMode = useSyncExternalStore(
    subscribeToColorMode,
    colorModeSnapshot,
    serverColorModeSnapshot
  )
  const resolved: ColorMode = colorMode === 'system' ? systemMode : colorMode

  return (
    <ThemeContext.Provider value={theme[resolved]}>{children}</ThemeContext.Provider>
  )
}
