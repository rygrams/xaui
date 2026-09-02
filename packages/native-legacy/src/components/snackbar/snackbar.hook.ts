import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { SnackbarPosition } from './snackbar.type'

const M3_LIGHT_INVERSE_SURFACE = '#322F35'
const M3_LIGHT_INVERSE_ON_SURFACE = '#F5EFF7'
const M3_LIGHT_INVERSE_PRIMARY = '#D0BCFF'

const M3_DARK_INVERSE_SURFACE = '#E6E1E5'
const M3_DARK_INVERSE_ON_SURFACE = '#322F35'
const M3_DARK_INVERSE_PRIMARY = '#6750A4'

export const useSnackbarColors = (themeColor: ThemeColor = 'default') => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)

  return useMemo(() => {
    if (safeThemeColor === 'default') {
      const isDarkMode = theme.mode === 'dark'
      const containerColor = isDarkMode
        ? M3_DARK_INVERSE_SURFACE
        : M3_LIGHT_INVERSE_SURFACE
      const textColor = isDarkMode
        ? M3_DARK_INVERSE_ON_SURFACE
        : M3_LIGHT_INVERSE_ON_SURFACE
      const actionColor = isDarkMode
        ? M3_DARK_INVERSE_PRIMARY
        : M3_LIGHT_INVERSE_PRIMARY

      return {
        containerColor,
        textColor,
        actionColor,
        pressedOverlayColor: withOpacity(textColor, 0.16),
      }
    }

    const colorScheme = theme.colors[safeThemeColor]
    return {
      containerColor: colorScheme.main,
      textColor: colorScheme.onMain,
      actionColor: withOpacity(colorScheme.onMain, 0.82),
      pressedOverlayColor: withOpacity(colorScheme.onMain, 0.16),
    }
  }, [safeThemeColor, theme])
}

export const useSnackbarStackPositionStyles = (
  position: SnackbarPosition,
  insetHorizontal: number,
  insetVertical: number,
  maxWidth: number
) => {
  return useMemo(
    () => ({
      container:
        position === 'top'
          ? {
              top: insetVertical,
              paddingHorizontal: insetHorizontal,
            }
          : {
              bottom: insetVertical,
              paddingHorizontal: insetHorizontal,
            },
      content: {
        maxWidth,
      },
    }),
    [position, insetHorizontal, insetVertical, maxWidth]
  )
}
