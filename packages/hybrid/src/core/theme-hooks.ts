import { useContext, useMemo } from 'react'
import { XUIThemeContext } from './theme-provider'
import type { XUITheme } from '@xaui/core/theme'
import type { Radius } from '../types'

type ColorMode = 'light' | 'dark'

export function useColorMode(): ColorMode {
  const theme = useContext(XUIThemeContext)
  return theme?.mode ?? 'light'
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

export function useXUIPalette(): XUITheme['palette'] {
  const theme = useXUITheme()
  return useMemo(() => theme.palette, [theme])
}

export function useBorderRadiusStyles(radius: Radius): {
  borderRadius: number
} {
  const theme = useXUITheme()
  return useMemo(() => {
    const radiusMap = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radiusMap[radius] }
  }, [radius, theme])
}
