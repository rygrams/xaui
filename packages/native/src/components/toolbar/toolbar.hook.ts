import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { ToolbarVariant, ToolbarPosition } from './toolbar.type'

type ToolbarVariantStyles = {
  containerHeight: number | 'auto'
  containerWidth: number | 'auto'
  iconSize: number
  actionSize: number
  borderRadius: number
  paddingHorizontal: number
  paddingVertical: number
  gap: number
  isElevated: boolean
}

const variantMap: Record<ToolbarVariant, ToolbarVariantStyles> = {
  floating: {
    containerHeight: 72,
    containerWidth: 'auto',
    iconSize: 26,
    actionSize: 40,
    borderRadius: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 0,
    isElevated: true,
  },
  docked: {
    containerHeight: 72,
    containerWidth: 'auto',
    iconSize: 26,
    actionSize: 40,
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 0,
    isElevated: false,
  },
  vertical: {
    containerHeight: 'auto',
    containerWidth: 80,
    iconSize: 26,
    actionSize: 40,
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 0,
    isElevated: false,
  },
}

export const useToolbarVariantStyles = (
  variant: ToolbarVariant,
  position: ToolbarPosition
) => {
  return useMemo(() => {
    const baseStyles = variantMap[variant]
    const isVertical = variant === 'vertical'

    return {
      ...baseStyles,
      isVertical,
      position,
    }
  }, [variant, position])
}

export const useToolbarColors = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]

  return useMemo(() => {
    return {
      background:
        theme.mode === 'dark'
          ? theme.colors.default.background
          : theme.colors.background,
      divider: withOpacity(theme.colors.foreground, 0.1),
      title: theme.colors.foreground,
      subtitle: withOpacity(theme.colors.foreground, 0.72),
      action: colorScheme.main,
      pressed: withOpacity(colorScheme.main, 0.16),
      shadow: withOpacity(theme.colors.foreground, 0.35),
    }
  }, [colorScheme.main, theme.colors, theme.mode])
}
