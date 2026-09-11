import type { ReactNode } from 'react'
import type { XAUIThemeSet } from '../theme/theme.type'

export type ColorModePreference = 'light' | 'dark' | 'system'

export type XAUIProviderProps = {
  children: ReactNode
  theme?: XAUIThemeSet
  colorMode?: ColorModePreference
  hasPortalHost?: boolean
}
