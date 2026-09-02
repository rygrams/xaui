import { useMemo } from 'react'
import { useXAUITheme } from '@xaui/native/theme'
import { toLegacyTheme } from '../shim/to-legacy-theme'
import type { XUITheme } from '../shim/legacy-theme'
import { Radius } from '../types'

type ColorMode = 'light' | 'dark'

/**
 * The resolved mode of the single v1 provider — no longer a second read of
 * `useColorScheme`, so `<XAUIProvider colorMode="dark">` now darkens legacy screens too.
 */
export function useColorMode(): ColorMode {
  return useXAUITheme().mode
}

export function useXUITheme(): XUITheme {
  return toLegacyTheme(useXAUITheme())
}

export function useXUIColors(): XUITheme['colors'] {
  const theme = useXUITheme()

  return theme.colors
}

export function useXUIPalette(): XUITheme['palette'] {
  const theme = useXUITheme()

  return useMemo(() => theme.palette, [theme])
}

export function useBorderRadiusStyles(radius: Radius): { borderRadius: number } {
  const theme = useXUITheme()
  const borderRadius = useMemo(() => {
    const radiusMap = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radiusMap[radius] }
  }, [radius, theme])

  return borderRadius
}
