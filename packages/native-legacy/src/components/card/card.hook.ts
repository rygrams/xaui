import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { ElevationLevel } from '../button/button.type'

export const useCardContainerStyles = (
  themeColor: ThemeColor,
  isBlurred: boolean
) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const safeThemeColor = getSafeThemeColor(themeColor)
    const colorScheme = theme.colors[safeThemeColor]
    const isDefaultThemeColor = safeThemeColor === 'default'
    const defaultBackgroundColor =
      theme.mode === 'dark' ? theme.colors.default.container : '#FFFFFF'

    return {
      backgroundColor: isBlurred
        ? theme.mode === 'dark'
          ? 'rgba(24, 24, 27, 0.82)'
          : 'rgba(255, 255, 255, 0.82)'
        : isDefaultThemeColor
          ? defaultBackgroundColor
          : colorScheme.container,
      borderColor: withOpacity(colorScheme.main, 0.05),
    }
  }, [isBlurred, theme, themeColor])
}

export const useCardElevationStyles = (elevation: ElevationLevel = 0) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const shadowStyles =
      elevation === 0
        ? {}
        : elevation === 1
          ? theme.shadows.sm
          : elevation === 2
            ? theme.shadows.md
            : elevation === 3
              ? theme.shadows.lg
              : theme.shadows.xl

    return {
      ...shadowStyles,
      ...(elevation > 0 ? { elevation } : {}),
    }
  }, [elevation, theme])
}

export const useCardTextStyles = (themeColor: ThemeColor) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const safeThemeColor = getSafeThemeColor(themeColor)
    const colorScheme = theme.colors[safeThemeColor]

    return {
      titleColor: colorScheme.main,
      descriptionColor:
        theme.mode === 'dark'
          ? withOpacity(theme.colors.foreground, 0.8)
          : withOpacity(theme.colors.foreground, 0.72),
    }
  }, [theme, themeColor])
}

export const useCardFooterStyles = (
  themeColor: ThemeColor,
  isFooterBlurred: boolean
) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const safeThemeColor = getSafeThemeColor(themeColor)
    const colorScheme = theme.colors[safeThemeColor]

    if (!isFooterBlurred) {
      return {}
    }

    return {
      backgroundColor:
        theme.mode === 'dark'
          ? 'rgba(24, 24, 27, 0.68)'
          : 'rgba(255, 255, 255, 0.72)',
      borderTopWidth: theme.borderWidth.sm,
      borderTopColor:
        theme.mode === 'dark'
          ? withOpacity(colorScheme.main, 0.4)
          : withOpacity(colorScheme.main, 0.18),
    }
  }, [isFooterBlurred, theme, themeColor])
}
