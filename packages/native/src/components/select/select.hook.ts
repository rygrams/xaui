import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { colors } from '@xaui/core/palette'
import { useXUITheme } from '../../core'
import type { Radius, Size, ThemeColor } from '../../types'
import type { SelectVariant } from './select.type'

type SelectSizeStyles = {
  minHeight: number
  paddingHorizontal: number
  paddingVertical: number
  fontSize: number
  labelSize: number
}

const useSelectColorScheme = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return { theme, colorScheme }
}

export const useSelectSizeStyles = (size: Size): SelectSizeStyles => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes = {
      xs: {
        minHeight: theme.componentSizes.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.xs,
        labelSize: theme.fontSizes.xs,
      },
      sm: {
        minHeight: theme.componentSizes.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        labelSize: theme.fontSizes.xs,
      },
      md: {
        minHeight: theme.componentSizes.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        labelSize: theme.fontSizes.sm,
      },
      lg: {
        minHeight: theme.componentSizes.lg,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.lg,
        labelSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])
}

export const useSelectRadiusStyles = (radius: Radius) => {
  const theme = useXUITheme()

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

  return { radiusStyles, listboxRadius }
}

export const useSelectVariantStyles = (
  themeColor: ThemeColor,
  variant: SelectVariant,
  isInvalid: boolean
) => {
  const { theme, colorScheme } = useSelectColorScheme(themeColor)

  return useMemo(() => {
    const isDark = theme.mode === 'dark'
    let borderColor = isInvalid ? theme.colors.danger.main : colorScheme.main

    if (
      variant === 'bordered' &&
      themeColor === 'default'
    ) {
      borderColor = colors.gray[300]
    }

    const styles = {
      bordered: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      colored: {
        backgroundColor: withOpacity(colorScheme.container, isDark ? 0.25 : 0.45),
        borderWidth: 0,
      },
      light: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      underlined: {
        backgroundColor: 'transparent',
        borderBottomWidth: theme.borderWidth.md,
        borderColor,
      },
    }

    return styles[variant]
  }, [variant, theme, colorScheme, isInvalid, themeColor])
}

export const useSelectLabelStyle = (
  themeColor: ThemeColor,
  isInvalid: boolean,
  labelSize: number
) => {
  const { theme, colorScheme } = useSelectColorScheme(themeColor)

  return useMemo(() => {
    let baseColor = theme.colors.foreground

    if (isInvalid) {
      baseColor = theme.colors.danger.main
    } else if (themeColor !== 'default') {
      baseColor = colorScheme.main
    }

    return {
      fontSize: labelSize,
      color: baseColor,
    }
  }, [isInvalid, labelSize, theme, themeColor, colorScheme])
}

export const useSelectValueColor = (
  isInvalid: boolean,
  shouldShowPlaceholder: boolean
) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    if (shouldShowPlaceholder) {
      return colors.gray[500]
    }

    return theme.colors.foreground
  }, [isInvalid, shouldShowPlaceholder, theme])
}

export const useSelectHelperColor = (isInvalid: boolean) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    return colors.gray[600]
  }, [isInvalid, theme])
}

export const useSelectSelectorColor = (
  isInvalid: boolean,
  shouldShowPlaceholder: boolean
) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    if (shouldShowPlaceholder) {
      return colors.gray[600]
    }

    return theme.colors.foreground
  }, [isInvalid, shouldShowPlaceholder, theme])
}
