import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import { getSafeThemeColor } from '@xaui/core'
import type { FabVariant, FabSize } from './fab.type'
import type { ThemeColor } from '../../types'
import type { ButtonRadius, ElevationLevel } from '../button/button.type'

type FabSizeStyles = {
  width: number
  height: number
  borderRadius: number
  iconSize: number
  fontSize: number
}

type ExtendedFabSizeStyles = {
  height: number
  borderRadius: number
  paddingHorizontal: number
  iconSize: number
  fontSize: number
}

export function useFabSizeStyles(size: FabSize): {
  sizeStyles: FabSizeStyles
  extendedSizeStyles: ExtendedFabSizeStyles
} {
  const theme = useXUITheme()

  const sizeStyles = useMemo(() => {
    const sizes: Record<FabSize, FabSizeStyles> = {
      sm: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.lg,
        iconSize: 24,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        width: 56,
        height: 56,
        borderRadius: theme.borderRadius.xl,
        iconSize: 24,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        width: 96,
        height: 96,
        borderRadius: theme.borderRadius['2xl'],
        iconSize: 36,
        fontSize: theme.fontSizes.lg,
      },
    }
    return sizes[size]
  }, [size, theme])

  const extendedSizeStyles = useMemo(() => {
    const sizes: Record<FabSize, ExtendedFabSizeStyles> = {
      sm: {
        height: 40,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        iconSize: 20,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        height: 56,
        borderRadius: theme.borderRadius.xl,
        paddingHorizontal: theme.spacing.lg,
        iconSize: 24,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        height: 80,
        borderRadius: theme.borderRadius['2xl'],
        paddingHorizontal: theme.spacing.xl,
        iconSize: 28,
        fontSize: theme.fontSizes.lg,
      },
    }
    return sizes[size]
  }, [size, theme])

  return { sizeStyles, extendedSizeStyles }
}

export function useFabVariantStyles(
  themeColor: ThemeColor,
  variant: FabVariant,
  elevation: ElevationLevel = 0
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const variantStyles = useMemo(() => {
    const variantMap = {
      solid: {
        backgroundColor: colorScheme.main,
        borderWidth: 0,
      },
      flat: {
        backgroundColor: colorScheme.background,
        borderWidth: 0,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
    } as const

    const baseStyle = variantMap[variant]
    const shouldApplyElevation = variant !== 'outlined'

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
      ...(shouldApplyElevation ? shadowStyles : {}),
      ...(shouldApplyElevation && elevation > 0 ? { elevation } : {}),
    }
  }, [variant, colorScheme, theme, elevation])

  return variantStyles
}

export function useFabIconColor(themeColor: ThemeColor, variant: FabVariant) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const iconColor = useMemo(() => {
    if (variant === 'solid') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  return { iconColor }
}

export function useFabRadiusValue(
  radius: ButtonRadius | undefined,
  fallback: number
) {
  const theme = useXUITheme()

  return useMemo(() => {
    if (!radius) return fallback

    const radiusMap: Record<ButtonRadius, number> = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }

    return radiusMap[radius]
  }, [fallback, radius, theme])
}
