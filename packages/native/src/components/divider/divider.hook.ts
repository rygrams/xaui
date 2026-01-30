import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { DividerOrientation } from './divider.type'
import { getSafeThemeColor } from '@xaui/core'

export const useDividerColor = (
  themeColor: ThemeColor,
  customColor: string | undefined
) => {
  const theme = useXUITheme()

  const dividerColor = useMemo(() => {
    if (customColor) {
      return customColor
    }

    const safeThemeColor = getSafeThemeColor(themeColor)
    return theme.colors[safeThemeColor].main
  }, [customColor, themeColor, theme])

  return dividerColor
}

export const useDividerSize = (size: number, orientation: DividerOrientation) => {
  const sizeStyles = useMemo(() => {
    if (orientation === 'horizontal') {
      return {
        height: size,
      }
    }

    return {
      width: size,
    }
  }, [size, orientation])

  return sizeStyles
}
