import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { colors } from '@xaui/core/palette'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { SelectRadius, SelectSize, SelectVariant } from './select.type'

export const useSelectStyles = (
  themeColor: ThemeColor,
  variant: SelectVariant,
  size: SelectSize,
  radius: SelectRadius,
  isInvalid: boolean,
  shouldShowPlaceholder: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
      xs: {
        minHeight: 34,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.xs,
        labelSize: theme.fontSizes.xs,
      },
      sm: {
        minHeight: 38,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
        labelSize: theme.fontSizes.xs,
      },
      md: {
        minHeight: 42,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        labelSize: theme.fontSizes.sm,
      },
      lg: {
        minHeight: 46,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.lg,
        labelSize: theme.fontSizes.md,
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

  const listboxRadius = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }

    return Math.min(radii[radius], theme.borderRadius.lg)
  }, [radius, theme])

  const variantStyles = useMemo(() => {
    let borderColor = isInvalid ? theme.colors.danger.main : colorScheme.main

    if ((variant === 'outlined' || variant === 'faded') && themeColor === 'default') {
      borderColor = colors.gray[300]
    }

    const styles = {
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor,
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
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      underlined: {
        backgroundColor: 'transparent',
        borderBottomWidth: theme.borderWidth.md,
        borderColor,
      },
    }

    return styles[variant]
  }, [variant, theme, colorScheme, isInvalid, themeColor])

  const labelStyle = useMemo(() => {
    let baseColor = theme.colors.foreground

    if (isInvalid) {
      baseColor = theme.colors.danger.main
    } else if (themeColor !== 'default') {
      baseColor = colorScheme.main
    }

    return {
      fontSize: sizeStyles.labelSize,
      color: baseColor,
    }
  }, [isInvalid, sizeStyles.labelSize, theme, themeColor, colorScheme])

  const valueColor = useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    if (shouldShowPlaceholder) {
      return colors.gray[500]
    }

    return theme.colors.foreground
  }, [isInvalid, shouldShowPlaceholder, theme])

  const helperColor = useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    return colors.gray[600]
  }, [isInvalid, theme])

  const selectorColor = useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    if (shouldShowPlaceholder) {
      return colors.gray[600]
    }

    return theme.colors.foreground
  }, [isInvalid, shouldShowPlaceholder, theme])

  return {
    theme,
    colorScheme,
    sizeStyles,
    radiusStyles,
    listboxRadius,
    variantStyles,
    labelStyle,
    valueColor,
    helperColor,
    selectorColor,
  }
}
