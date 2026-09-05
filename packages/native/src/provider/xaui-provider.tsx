import { useColorScheme } from 'react-native'
import { PortalHost } from '../system/portal'
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
 *
 * It also mounts the `PortalHost` every overlay renders into. That is here rather than in
 * the app because forgetting it is silent: `Portal` renders nothing outside a host, so a
 * select would open onto an empty screen with no error to read. An app that needs the
 * host somewhere else — under a gesture root, or inside its own navigation container —
 * sets `hasPortalHost={false}` and mounts one itself.
 */
export function XAUIProvider({
  children,
  theme = defaultTheme,
  colorMode = 'system',
  hasPortalHost = true,
}: XAUIProviderProps) {
  const scheme = useColorScheme()
  const resolved: ColorMode =
    colorMode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : colorMode

  return (
    <ThemeContext.Provider value={theme[resolved]}>
      {hasPortalHost ? <PortalHost>{children}</PortalHost> : children}
    </ThemeContext.Provider>
  )
}
