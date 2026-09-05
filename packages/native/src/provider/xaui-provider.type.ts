import type { ReactNode } from 'react'
import type { XAUIThemeSet } from '../theme/theme.type'

/** `'system'` follows the device; the resolved value is never `'system'`. */
export type ColorModePreference = 'light' | 'dark' | 'system'

export type XAUIProviderProps = {
  children: ReactNode
  /** Build it once with `createTheme`, at module level. */
  theme?: XAUIThemeSet
  /** Controlled: the library owns neither the state nor its persistence. */
  colorMode?: ColorModePreference
  /**
   * Mounts the `PortalHost` overlays render into. Set false only to mount one yourself,
   * somewhere the provider cannot reach — under a gesture root, say. Without a host
   * anywhere, `Portal` renders nothing and overlays are silently absent.
   *
   * @default true
   */
  hasPortalHost?: boolean
}
