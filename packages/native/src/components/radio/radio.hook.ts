import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Radius, Size, ThemeColor } from '../../types'
import type { RadioLabelAlignment, RadioVariant } from './radio.type'

type RadioSizeStyles = {
  radioSize: number
  fontSize: number
  dotSize: number
}

export function useSizeStyles(size: Size, variant: RadioVariant): RadioSizeStyles {
  const theme = useXUITheme()

  const sizeStyles = useMemo(() => {
    const sizes: Record<Size, RadioSizeStyles> = {
      xs: {
        radioSize: 14,
        fontSize: theme.fontSizes.xs,
        dotSize: variant === 'light' ? 5 : 4,
      },
      sm: {
        radioSize: 18,
        fontSize: theme.fontSizes.sm,
        dotSize: variant === 'light' ? 7 : 6,
      },
      md: {
        radioSize: 22,
        fontSize: theme.fontSizes.md,
        dotSize: variant === 'light' ? 9 : 8,
      },
      lg: {
        radioSize: 26,
        fontSize: theme.fontSizes.lg,
        dotSize: variant === 'light' ? 11 : 10,
      },
    }

    return sizes[size]
  }, [size, theme, variant])

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

export function useDotColors(
  themeColor: ThemeColor,
  variant: RadioVariant,
  isActive: boolean
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const dotColors = useMemo(() => {
    if (!isActive) {
      return {
        checked: 'transparent',
      }
    }

    if (variant === 'filled') {
      return {
        checked: colorScheme.onMain,
      }
    }

    return {
      checked: colorScheme.main,
    }
  }, [colorScheme, isActive, variant])

  return dotColors
}

export function useVariantStyles(
  themeColor: ThemeColor,
  variant: RadioVariant,
  isActive: boolean
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const variantStyles = useMemo(() => {
    if (variant === 'filled') {
      return {
        backgroundColor: isActive ? colorScheme.main : 'transparent',
        borderWidth: isActive ? 0 : theme.borderWidth.md,
        borderColor: isActive ? 'transparent' : colorScheme.main,
      }
    }

    return {
      backgroundColor: 'transparent',
      borderWidth: theme.borderWidth.md,
      borderColor: colorScheme.main,
    }
  }, [colorScheme.main, isActive, theme.borderWidth.md, variant])

  return variantStyles
}

export function useContainerStyles(labelAlignment: RadioLabelAlignment) {
  const containerStyles = useMemo(() => {
    const isJustified =
      labelAlignment === 'justify-left' || labelAlignment === 'justify-right'

    return {
      flexDirection:
        labelAlignment === 'left' || labelAlignment === 'justify-left'
          ? ('row-reverse' as const)
          : ('row' as const),
      justifyContent: isJustified
        ? ('space-between' as const)
        : ('flex-start' as const),
    }
  }, [labelAlignment])

  return containerStyles
}
