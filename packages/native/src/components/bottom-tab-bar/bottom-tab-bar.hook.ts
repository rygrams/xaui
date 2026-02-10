import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { BottomTabBarSize } from './bottom-tab-bar.type'

type BottomTabBarSizeStyles = {
  minHeight: number
  iconSize: number
  indicatorWidth: number
  indicatorHeight: number
  indicatorRadius: number
  itemPaddingTop: number
  itemPaddingBottom: number
  labelSize: number
  labelSpacing: number
}

const sizeMap: Record<BottomTabBarSize, BottomTabBarSizeStyles> = {
  sm: {
    minHeight: 68,
    iconSize: 20,
    indicatorWidth: 58,
    indicatorHeight: 30,
    indicatorRadius: 15,
    itemPaddingTop: 8,
    itemPaddingBottom: 6,
    labelSize: 11,
    labelSpacing: 4,
  },
  md: {
    minHeight: 78,
    iconSize: 24,
    indicatorWidth: 64,
    indicatorHeight: 32,
    indicatorRadius: 16,
    itemPaddingTop: 10,
    itemPaddingBottom: 8,
    labelSize: 12,
    labelSpacing: 4,
  },
  lg: {
    minHeight: 86,
    iconSize: 26,
    indicatorWidth: 70,
    indicatorHeight: 36,
    indicatorRadius: 18,
    itemPaddingTop: 11,
    itemPaddingBottom: 10,
    labelSize: 13,
    labelSpacing: 5,
  },
}

export const useBottomTabBarSizeStyles = (size: BottomTabBarSize) => {
  return useMemo(() => sizeMap[size], [size])
}

export const useBottomTabBarColors = (
  themeColor: ThemeColor,
  activeColor?: string,
  inactiveColor?: string,
  indicatorColor?: string
) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]

  return useMemo(() => {
    return {
      activeColor: activeColor ?? colorScheme.main,
      inactiveColor: inactiveColor ?? withOpacity(theme.colors.foreground, 0.66),
      indicatorColor:
        indicatorColor ??
        withOpacity(colorScheme.main, theme.mode === 'dark' ? 0.28 : 0.16),
      containerColor: theme.colors.background,
      borderColor: withOpacity(theme.colors.foreground, 0.08),
    }
  }, [activeColor, colorScheme.main, indicatorColor, inactiveColor, theme])
}
