import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { ButtonVariant } from './button.type'
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
    if (variant === 'solid' || variant === 'elevated') {
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
        minHeight: 34,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: 38,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 42,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 50,
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

export function useVariantSizesStyles(themeColor: ThemeColor, variant: ButtonVariant) {
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
      elevated: {
        backgroundColor: colorScheme.main,
        borderWidth: 0,
        ...theme.shadows.md,
      },
      faded: {
        backgroundColor: `${colorScheme.background}95`,
        borderWidth: theme.borderWidth.md,
        borderColor: `${colorScheme.main}90`,
      },
    }
    return styles[variant]
  }, [variant, colorScheme, theme])

  return variantStyles
}
