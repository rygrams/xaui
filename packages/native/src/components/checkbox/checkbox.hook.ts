import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxRadius,
  CheckboxLabelAlignment,
} from './checkbox.type'

export const useCheckboxStyles = (
  themeColor: ThemeColor,
  variant: CheckboxVariant,
  size: CheckboxSize,
  radius: CheckboxRadius,
  labelAlignment: CheckboxLabelAlignment,
  isActive: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
      sm: {
        checkboxSize: 18,
        fontSize: theme.fontSizes.sm,
        iconSize: variant === 'light' ? 14 : 12,
      },
      md: {
        checkboxSize: 22,
        fontSize: theme.fontSizes.md,
        iconSize: variant === 'light' ? 18 : 14,
      },
      lg: {
        checkboxSize: 26,
        fontSize: theme.fontSizes.lg,
        iconSize: variant === 'light' ? 22 : 16,
      },
    }

    return sizes[size]
  }, [size, theme, variant])

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

  const checkboxStyles = useMemo(() => {
    const baseStyle = {
      width: sizeStyles.checkboxSize,
      height: sizeStyles.checkboxSize,
      ...radiusStyles,
    }

    if (variant === 'filled') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: isActive ? 0 : theme.borderWidth.md,
        borderColor: isActive ? 'transparent' : colorScheme.main,
      }
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
    }
  }, [variant, isActive, colorScheme, sizeStyles, radiusStyles, theme])

  const checkmarkColor = useMemo(() => {
    if (variant === 'filled') {
      return colorScheme.foreground
    }

    if (isActive) {
      return colorScheme.main
    }

    if (themeColor !== 'default') {
      return colorScheme.background
    }

    return theme.colors.foreground
  }, [variant, colorScheme, isActive, themeColor, theme.colors.foreground])

  const containerStyles = useMemo(() => {
    const isJustified = labelAlignment === 'justify-left' || labelAlignment === 'justify-right'

    return {
      flexDirection:
        labelAlignment === 'left' || labelAlignment === 'justify-left'
          ? ('row-reverse' as const)
          : ('row' as const),
      justifyContent: isJustified ? ('space-between' as const) : ('flex-start' as const),
    }
  }, [labelAlignment])

  return {
    colorScheme,
    sizeStyles,
    radiusStyles,
    checkboxStyles,
    checkmarkColor,
    containerStyles,
  }
}
