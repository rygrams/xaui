import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { ToolbarVariant } from './toolbar.type'

type ToolbarVariantStyles = {
  containerMinHeight: number
  topRowMinHeight: number
  headlinePaddingBottom: number
  titleSize: number
  subtitleSize: number
  actionSize: number
  iconSize: number
  centeredTitle: boolean
  headlineWeight: '600' | '700'
}

const variantMap: Record<ToolbarVariant, ToolbarVariantStyles> = {
  small: {
    containerMinHeight: 64,
    topRowMinHeight: 64,
    headlinePaddingBottom: 0,
    titleSize: 22,
    subtitleSize: 14,
    actionSize: 40,
    iconSize: 24,
    centeredTitle: false,
    headlineWeight: '600',
  },
  centered: {
    containerMinHeight: 64,
    topRowMinHeight: 64,
    headlinePaddingBottom: 0,
    titleSize: 22,
    subtitleSize: 14,
    actionSize: 40,
    iconSize: 24,
    centeredTitle: true,
    headlineWeight: '600',
  },
  medium: {
    containerMinHeight: 112,
    topRowMinHeight: 64,
    headlinePaddingBottom: 14,
    titleSize: 28,
    subtitleSize: 15,
    actionSize: 40,
    iconSize: 24,
    centeredTitle: false,
    headlineWeight: '700',
  },
  large: {
    containerMinHeight: 152,
    topRowMinHeight: 64,
    headlinePaddingBottom: 18,
    titleSize: 34,
    subtitleSize: 16,
    actionSize: 40,
    iconSize: 24,
    centeredTitle: false,
    headlineWeight: '700',
  },
}

export const useToolbarVariantStyles = (variant: ToolbarVariant) => {
  return useMemo(() => variantMap[variant], [variant])
}

export const useToolbarColors = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]

  return useMemo(() => {
    return {
      background: theme.colors.background,
      divider: withOpacity(theme.colors.foreground, 0.1),
      title: theme.colors.foreground,
      subtitle: withOpacity(theme.colors.foreground, 0.72),
      action: colorScheme.main,
      pressed: withOpacity(colorScheme.main, 0.16),
      shadow: withOpacity(theme.colors.foreground, 0.35),
    }
  }, [colorScheme.main, theme.colors.background, theme.colors.foreground])
}
