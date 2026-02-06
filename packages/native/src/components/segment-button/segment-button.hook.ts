import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import { getSafeThemeColor } from '@xaui/core'
import type { SegmentButtonVariant } from './segment-button.type'
import type { Size, ThemeColor } from '../../types'

type SegmentSizeStyles = {
  paddingHorizontal: number
  paddingVertical: number
  minHeight: number
  fontSize: number
  iconSize: number
}

export function useSegmentSizeStyles(size: Size): SegmentSizeStyles {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes: Record<Size, SegmentSizeStyles> = {
      xs: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
        fontSize: theme.fontSizes.xs,
        iconSize: 14,
      },
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: 36,
        fontSize: theme.fontSizes.sm,
        iconSize: 16,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 40,
        fontSize: theme.fontSizes.md,
        iconSize: 18,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
        fontSize: theme.fontSizes.lg,
        iconSize: 20,
      },
    }
    return sizes[size]
  }, [size, theme])
}

type SegmentVariantStyles = {
  containerBackground: string
  containerBorderWidth: number
  containerBorderColor: string
  selectedBackground: string
  unselectedBackground: string
  selectedTextColor: string
  unselectedTextColor: string
  containerShadow?: Record<string, unknown>
}

export function useSegmentVariantStyles(
  themeColor: ThemeColor,
  variant: SegmentButtonVariant
): SegmentVariantStyles {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    const variants: Record<SegmentButtonVariant, SegmentVariantStyles> = {
      outlined: {
        containerBackground: 'transparent',
        containerBorderWidth: theme.borderWidth.sm,
        containerBorderColor: colorScheme.main,
        selectedBackground: colorScheme.main,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
      solid: {
        containerBackground: colorScheme.background,
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: colorScheme.main,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
      flat: {
        containerBackground: colorScheme.background,
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: colorScheme.main,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
      light: {
        containerBackground: 'transparent',
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: colorScheme.background,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.main,
        unselectedTextColor: colorScheme.main,
      },
      elevated: {
        containerBackground: colorScheme.background,
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: colorScheme.main,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
        containerShadow: theme.shadows.md,
      },
      faded: {
        containerBackground: `${colorScheme.background}95`,
        containerBorderWidth: theme.borderWidth.sm,
        containerBorderColor: `${colorScheme.main}90`,
        selectedBackground: colorScheme.main,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
    }
    return variants[variant]
  }, [variant, colorScheme, theme])
}
