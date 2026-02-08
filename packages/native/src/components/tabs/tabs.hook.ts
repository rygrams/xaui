import { useMemo } from 'react'
import { getSafeThemeColor, withPaletteNumber } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Size, ThemeColor } from '../../types'
import type { TabsVariant } from './tabs.type'

type TabsSizeStyles = {
  minHeight: number
  paddingHorizontal: number
  paddingVertical: number
  fontSize: number
}

type TabsVariantStyles = {
  listBackgroundColor: string
  listBorderColor: string
  listBorderWidth: number
  listPaddingHorizontal: number
  cursorColor: string
  textColor: string
  selectedTextColor: string
  cursorHeight: number | undefined
  cursorTop: number | undefined
  cursorBottom: number
  cursorShadow: boolean
}

export function useTabsSizeStyles(size: Size): TabsSizeStyles {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes: Record<Size, TabsSizeStyles> = {
      xs: {
        minHeight: 32,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        minHeight: 36,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        minHeight: 42,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        minHeight: 50,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.lg,
      },
    }

    return sizes[size]
  }, [size, theme])
}

export function useTabsVariantStyles(
  color: ThemeColor,
  variant: TabsVariant
): TabsVariantStyles {
  const theme = useXUITheme()
  const safeColor = getSafeThemeColor(color)
  const palette = theme.colors[safeColor]
  const cursorSolidColor = withPaletteNumber(palette.main, 400)

  return useMemo(() => {
    const variants: Record<TabsVariant, TabsVariantStyles> = {
      solid: {
        listBackgroundColor: palette.background,
        listBorderColor: 'transparent',
        listBorderWidth: 0,
        listPaddingHorizontal: 4,
        cursorColor: cursorSolidColor,
        textColor: palette.main,
        selectedTextColor: palette.foreground,
        cursorHeight: undefined,
        cursorTop: 4,
        cursorBottom: 4,
        cursorShadow: true,
      },
      bordered: {
        listBackgroundColor: 'transparent',
        listBorderColor: `${palette.main}30`,
        listBorderWidth: theme.borderWidth.md,
        listPaddingHorizontal: 0,
        cursorColor: cursorSolidColor,
        textColor: palette.main,
        selectedTextColor: palette.foreground,
        cursorHeight: undefined,
        cursorTop: 0,
        cursorBottom: 0,
        cursorShadow: false,
      },
      light: {
        listBackgroundColor: 'transparent',
        listBorderColor: 'transparent',
        listBorderWidth: 0,
        listPaddingHorizontal: 0,
        cursorColor: `${cursorSolidColor}25`,
        textColor: palette.main,
        selectedTextColor: palette.main,
        cursorHeight: undefined,
        cursorTop: 0,
        cursorBottom: 0,
        cursorShadow: false,
      },
      underlined: {
        listBackgroundColor: 'transparent',
        listBorderColor: `${palette.main}45`,
        listBorderWidth: 0,
        listPaddingHorizontal: 0,
        cursorColor: cursorSolidColor,
        textColor: `${palette.main}B0`,
        selectedTextColor: palette.main,
        cursorHeight: 2,
        cursorTop: undefined,
        cursorBottom: 0,
        cursorShadow: false,
      },
    }

    return variants[variant]
  }, [cursorSolidColor, palette, theme.borderWidth.md, variant])
}
