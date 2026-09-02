import { useColorScheme } from 'react-native'
import { defaultTheme } from '../theme/create-theme'
import { ThemeContext } from '../theme/theme-context'
import type { ColorMode } from '../theme/theme.type'
import type { XAUIProviderProps } from './xaui-provider.type'

/**
 * Wraps the app once.
 *
 * `theme` is expected to come from `createTheme` at module level. The provider selects a
 * mode from an already-resolved set rather than memoizing on the prop's identity — which
 * is what the v0 provider did, rebuilding every style in the app on each parent render.
 */
export function XAUIProvider({
  children,
  theme = defaultTheme,
  colorMode = 'system',
}: XAUIProviderProps) {
  const scheme = useColorScheme()
  const resolved: ColorMode =
    colorMode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : colorMode

  return (
    <ThemeContext.Provider value={theme[resolved]}>{children}</ThemeContext.Provider>
  )
}
