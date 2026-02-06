import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { ButtonVariant, ButtonSize, ButtonRadius } from './button.type'
import type { ThemeColor } from '../../types'

type ButtonSizeStyles = {
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string
  minHeight: string
  fontSize: string
  lineHeight: string
}

export const useVariantSizesStyles = (
  themeColor: ThemeColor,
  variant: ButtonVariant,
  size: ButtonSize
): {
  sizeStyles: ButtonSizeStyles
  variantStyles: Record<string, string>
  textColor: string
  spinnerSize: number
} => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    const sizes: Record<ButtonSize, ButtonSizeStyles> = {
      xs: {
        paddingLeft: `${theme.spacing.sm}px`,
        paddingRight: `${theme.spacing.sm}px`,
        paddingTop: `${theme.spacing.xs}px`,
        paddingBottom: `${theme.spacing.xs}px`,
        minHeight: '28px',
        fontSize: `${theme.fontSizes.xs}px`,
        lineHeight: '1',
      },
      sm: {
        paddingLeft: `${theme.spacing.md}px`,
        paddingRight: `${theme.spacing.md}px`,
        paddingTop: `${theme.spacing.xs}px`,
        paddingBottom: `${theme.spacing.xs}px`,
        minHeight: '32px',
        fontSize: `${theme.fontSizes.sm}px`,
        lineHeight: '1',
      },
      md: {
        paddingLeft: `${theme.spacing.md}px`,
        paddingRight: `${theme.spacing.md}px`,
        paddingTop: `${theme.spacing.sm}px`,
        paddingBottom: `${theme.spacing.sm}px`,
        minHeight: '40px',
        fontSize: `${theme.fontSizes.md}px`,
        lineHeight: '1',
      },
      lg: {
        paddingLeft: `${theme.spacing.lg}px`,
        paddingRight: `${theme.spacing.lg}px`,
        paddingTop: `${theme.spacing.md}px`,
        paddingBottom: `${theme.spacing.md}px`,
        minHeight: '48px',
        fontSize: `${theme.fontSizes.lg}px`,
        lineHeight: '1',
      },
    }
    return sizes[size]
  }, [size, theme])

  const variantStyles = useMemo(() => {
    const styles = {
      solid: {
        backgroundColor: colorScheme.main,
        borderWidth: '0',
        color: colorScheme.foreground,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: `${theme.borderWidth.md}px`,
        borderStyle: 'solid',
        borderColor: colorScheme.main,
        color: colorScheme.main,
      },
      flat: {
        backgroundColor: colorScheme.background,
        borderWidth: '0',
        color: colorScheme.main,
      },
      light: {
        backgroundColor: 'transparent',
        borderWidth: '0',
        color: colorScheme.main,
      },
      elevated: {
        backgroundColor: colorScheme.main,
        borderWidth: '0',
        color: colorScheme.foreground,
        boxShadow:
          typeof theme.shadows.md === 'string'
            ? theme.shadows.md
            : '0 2px 4px rgba(0,0,0,0.1)',
      },
      faded: {
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: `${theme.borderWidth.md}px`,
        borderStyle: 'solid',
        borderColor: colorScheme.main,
        color: colorScheme.main,
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
    variantStyles,
    textColor,
    spinnerSize,
  }
}

export const useButtonStyles = (
  themeColor: ThemeColor,
  variant: ButtonVariant,
  size: ButtonSize,
  radius: ButtonRadius
) => {
  const theme = useXUITheme()

  const { sizeStyles, variantStyles, textColor, spinnerSize } =
    useVariantSizesStyles(themeColor, variant, size)

  const radiusStyles = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: `${radii[radius]}px` }
  }, [radius, theme])

  return {
    sizeStyles,
    radiusStyles,
    variantStyles,
    textColor,
    spinnerSize,
  }
}
