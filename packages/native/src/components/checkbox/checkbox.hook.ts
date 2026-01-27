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
import { XUITheme } from '@xaui/core/theme'

const useSizeStyles = (size: CheckboxSize, theme: XUITheme, variant: CheckboxVariant) => {
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
}

const useRadiusStyles = (radius: CheckboxRadius, theme: XUITheme) => {
  const radii = {
    none: theme.borderRadius.none,
    sm: theme.borderRadius.sm,
    md: theme.borderRadius.md,
    lg: theme.borderRadius.lg,
    full: theme.borderRadius.full,
  }

  return { borderRadius: radii[radius] }
}

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

  const sizeStyles = useSizeStyles(size, theme, variant)
  const radiusStyles = useRadiusStyles(radius, theme)
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

  const checkmarkColors = useMemo(() => {
    if (variant === 'filled') {
      return {
        checked: colorScheme.foreground,
        unchecked: undefined,
      }
    }

    if (isActive) {
      return {
        checked: colorScheme.main,
        unchecked: undefined,
      }
    }

    if (themeColor !== 'default') {
      return {
        checked: colorScheme.foreground,
        unchecked: colorScheme.background,
      }
    }

    return {
      checked: theme.colors.foreground,
      unchecked: theme.colors.background,
    }
  }, [variant, colorScheme, isActive, themeColor, theme.colors])

  const containerStyles = useMemo(() => {
    const isJustified =
      labelAlignment === 'justify-left' || labelAlignment === 'justify-right'

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
    checkmarkColors,
    containerStyles,
  }
}
