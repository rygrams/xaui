import { useMemo } from 'react'
import type { ViewStyle } from 'react-native'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { DrawerPosition } from './drawer.type'

export const useDrawerStyles = (
  themeColor: ThemeColor,
  position: DrawerPosition,
  width: number,
  height: number
) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const safeThemeColor = getSafeThemeColor(themeColor)
    const colorScheme = theme.colors[safeThemeColor]
    const isDefaultThemeColor = safeThemeColor === 'default'
    const defaultBackgroundColor =
      theme.mode === 'dark' ? theme.colors.default.background : '#FFFFFF'

    const backgroundColor = isDefaultThemeColor
      ? defaultBackgroundColor
      : colorScheme.background

    const sizeStyle: ViewStyle =
      position === 'left' || position === 'right' ? { width } : { height }

    return {
      backgroundColor,
      ...sizeStyle,
    }
  }, [height, position, theme, themeColor, width])
}

export const getTranslateValue = (position: DrawerPosition, size: number) => {
  switch (position) {
    case 'left':
      return { x: -size, y: 0 }
    case 'right':
      return { x: size, y: 0 }
    case 'top':
      return { x: 0, y: -size }
    case 'bottom':
      return { x: 0, y: size }
    default:
      return { x: -size, y: 0 }
  }
}
