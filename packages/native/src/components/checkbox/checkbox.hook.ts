import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Radius, Size, ThemeColor } from '../../types'
import type {
  CheckboxVariant,
  CheckboxLabelAlignment,
} from './checkbox.type'

type CheckboxSizeStyles = {
  checkboxSize: number
  fontSize: number
  iconSize: number
}

export function useSizeStyles(
  size: Size,
  variant: CheckboxVariant
): CheckboxSizeStyles {
  const theme = useXUITheme()

  const sizeStyles = useMemo(() => {
    const sizes: Record<Size, CheckboxSizeStyles> = {
      xs: {
        checkboxSize: 14,
        fontSize: theme.fontSizes.xs,
        iconSize: variant === 'light' ? 10 : 8,
      },
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
  }, [size, variant, theme])

  return sizeStyles
}

export function useRadiusStyles(radius: Radius) {
  const theme = useXUITheme()

  const radiusStyles = useMemo(() => {
    const radii: Record<Radius, number> = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radii[radius] }
  }, [radius, theme])

  return radiusStyles
}

export function useCheckmarkColors(
  themeColor: ThemeColor,
  variant: CheckboxVariant,
  isActive: boolean
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

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
      unchecked: colorScheme.background,
    }
  }, [variant, colorScheme, isActive, themeColor, theme.colors])

  return checkmarkColors
}

export function useVariantStyles(
  themeColor: ThemeColor,
  variant: CheckboxVariant,
  isActive: boolean
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const variantStyles = useMemo(() => {
    if (variant === 'filled') {
      return {
        backgroundColor: 'transparent',
        borderWidth: isActive ? 0 : theme.borderWidth.md,
        borderColor: isActive ? 'transparent' : colorScheme.main,
      }
    }

    return {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
    }
  }, [variant, isActive, colorScheme, theme])

  return variantStyles
}

export function useContainerStyles(labelAlignment: CheckboxLabelAlignment) {
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

  return containerStyles
}
