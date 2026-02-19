import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { ButtonVariant, ElevationLevel } from './button.type'
import type { Size, ThemeColor } from '../../types'
import { getSafeThemeColor } from '@xaui/core'

type ButtonSizeStyles = {
  paddingHorizontal: number
  paddingVertical: number
  minHeight: number
  fontSize: number
}

export const useTextStyles = (themeColor: ThemeColor, variant: ButtonVariant) => {
  const theme = useXUITheme()

  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const textColor = useMemo(() => {
    if (variant === 'solid') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  return {
    textColor,
  }
}

export function useSizesStyles(size: Size): {
  sizeStyles: ButtonSizeStyles
  spinnerSize: number
} {
  const theme = useXUITheme()

  const sizeStyles = useMemo(() => {
    const sizes: Record<Size, ButtonSizeStyles> = {
      xs: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        minHeight: theme.componentSizes.xs,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: theme.componentSizes.sm,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: theme.componentSizes.md,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: theme.componentSizes.lg,
        fontSize: theme.fontSizes.lg,
      },
    }
    return sizes[size]
  }, [size, theme])

  const spinnerSize = useMemo(() => {
    const sizes = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
    }
    return sizes[size] as number
  }, [size])

  return { sizeStyles, spinnerSize }
}

export function useVariantSizesStyles(
  themeColor: ThemeColor,
  variant: ButtonVariant,
  elevation: ElevationLevel = 0
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const variantStyles = useMemo(() => {
    const styles = {
      solid: {
        backgroundColor: colorScheme.main,
        borderWidth: 0,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
      flat: {
        backgroundColor: colorScheme.background,
        borderWidth: 0,
      },
      light: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      faded: {
        backgroundColor: `${colorScheme.background}95`,
        borderWidth: theme.borderWidth.md,
        borderColor: `${colorScheme.main}90`,
      },
    } as const

    const baseStyle = styles[variant]
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
      ...(shouldApplyElevation ? shadowStyles : {}),
      ...(shouldApplyElevation && elevation > 0 ? { elevation } : {}),
    }
  }, [variant, colorScheme, theme, elevation])

  return variantStyles
}
