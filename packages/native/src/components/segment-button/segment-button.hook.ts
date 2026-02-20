import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import { getSafeThemeColor, withOpacity, withPaletteNumber } from '@xaui/core'
import type { SegmentButtonVariant, ElevationLevel } from './segment-button.type'
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
        minHeight: theme.componentSizes.xs,
        fontSize: theme.fontSizes.xs,
        iconSize: 14,
      },
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: theme.componentSizes.sm,
        fontSize: theme.fontSizes.sm,
        iconSize: 16,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: theme.componentSizes.md,
        fontSize: theme.fontSizes.md,
        iconSize: 18,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: theme.componentSizes.lg,
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
  variant: SegmentButtonVariant,
  elevation: ElevationLevel = 0
): SegmentVariantStyles {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]
  const selectedBackgroundColor = withPaletteNumber(colorScheme.main, 400)

  return useMemo(() => {
    const variants: Record<SegmentButtonVariant, SegmentVariantStyles> = {
      outlined: {
        containerBackground: 'transparent',
        containerBorderWidth: theme.borderWidth.md,
        containerBorderColor: colorScheme.main,
        selectedBackground: selectedBackgroundColor,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
      flat: {
        containerBackground: colorScheme.background,
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: withOpacity(colorScheme.main, 0.2),
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.main,
        unselectedTextColor: colorScheme.main,
      },
      light: {
        containerBackground: 'transparent',
        containerBorderWidth: 0,
        containerBorderColor: 'transparent',
        selectedBackground: selectedBackgroundColor,
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.foreground,
        unselectedTextColor: colorScheme.main,
      },
      faded: {
        containerBackground: `${colorScheme.background}95`,
        containerBorderWidth: theme.borderWidth.md,
        containerBorderColor: `${colorScheme.main}90`,
        selectedBackground: withOpacity(colorScheme.main, 0.2),
        unselectedBackground: 'transparent',
        selectedTextColor: colorScheme.main,
        unselectedTextColor: colorScheme.main,
      },
    }

    const baseStyle = variants[variant] ?? variants.outlined
    const shouldApplyElevation = variant !== 'outlined' && variant !== 'light'

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
      ...baseStyle,
      containerShadow:
        shouldApplyElevation && elevation > 0
          ? shadowStyles
          : baseStyle.containerShadow,
    }
  }, [variant, colorScheme, theme, elevation])
}
