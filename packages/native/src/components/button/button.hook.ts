import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { ButtonVariant, ButtonSize, ButtonRadius } from './button.type'
import type { ThemeColor } from '../../types'

export const useButtonStyles = (
  themeColor: ThemeColor,
  variant: ButtonVariant,
  size: ButtonSize,
  radius: ButtonRadius
) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
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

  const radiusStyles = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radii[radius] }
  }, [radius, theme])

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
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
    }
    return styles[variant]
  }, [variant, colorScheme, theme])

  const textColor = useMemo(() => {
    if (variant === 'solid' || variant === 'elevated') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  const spinnerSize = useMemo(() => {
    const sizes = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
    }
    return sizes[size]
  }, [size])

  return {
    sizeStyles,
    radiusStyles,
    variantStyles,
    textColor,
    spinnerSize,
  }
}
