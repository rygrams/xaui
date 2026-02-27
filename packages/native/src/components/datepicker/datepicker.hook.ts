import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { colors } from '@xaui/core/palette'
import { useXUITheme } from '../../core'
import type { Radius, Size, ThemeColor } from '../../types'
import type { DatePickerVariant } from './datepicker.type'

type DatePickerSizeStyles = {
  minHeight: number
  paddingHorizontal: number
  paddingVertical: number
  fontSize: number
  labelSize: number
}

const useDatePickerColorScheme = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return { theme, colorScheme }
}

export const useDatePickerSizeStyles = (size: Size): DatePickerSizeStyles => {
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

export const useDatePickerRadiusStyles = (radius: Radius) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }

    return { borderRadius: radii[radius] }
  }, [radius, theme])
}

export const useDatePickerVariantStyles = (
  themeColor: ThemeColor,
  variant: DatePickerVariant,
  isInvalid: boolean
) => {
  const { theme, colorScheme } = useDatePickerColorScheme(themeColor)

  return useMemo(() => {
    let borderColor = isInvalid ? theme.colors.danger.main : colorScheme.main

    if (
      (variant === 'outlined' || variant === 'faded') &&
      themeColor === 'default'
    ) {
      borderColor = colors.gray[300]
    }

    const variantStyles = {
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      flat: {
        backgroundColor: colorScheme.container,
        borderWidth: 0,
      },
      light: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      faded: {
        backgroundColor: withOpacity(colorScheme.container, 0.56),
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      underlined: {
        backgroundColor: 'transparent',
        borderBottomWidth: theme.borderWidth.md,
        borderColor,
      },
    }

    return variantStyles[variant]
  }, [variant, theme, colorScheme, isInvalid, themeColor])
}

export const useDatePickerLabelStyle = (
  themeColor: ThemeColor,
  isInvalid: boolean,
  labelSize: number
) => {
  const { theme, colorScheme } = useDatePickerColorScheme(themeColor)

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

export const useDatePickerHelperColor = (isInvalid: boolean) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    return colors.gray[600]
  }, [isInvalid, theme])
}
