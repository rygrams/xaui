import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Size, ThemeColor } from '../../types'

type SelectItemSizeStyles = {
  paddingVertical: number
  paddingHorizontal: number
  titleSize: number
  descriptionSize: number
}

export const useSelectItemSizeStyles = (size: Size): SelectItemSizeStyles => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes = {
      xs: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.xs,
        titleSize: theme.fontSizes.xs,
        descriptionSize: theme.fontSizes.xs,
      },
      sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.sm,
        descriptionSize: theme.fontSizes.xs,
      },
      md: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.md,
        descriptionSize: theme.fontSizes.xs,
      },
      lg: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        titleSize: theme.fontSizes.lg,
        descriptionSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])
}

export const useSelectItemBackgroundColor = (
  themeColor: ThemeColor,
  isSelected: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    if (isSelected) {
      return colorScheme.container
    }

    return 'transparent'
  }, [isSelected, colorScheme])
}

export const useSelectItemTextColors = () => {
  const theme = useXUITheme()

  return useMemo(() => {
    return {
      textColor: theme.colors.foreground,
      descriptionColor: theme.colors.foreground,
    }
  }, [theme])
}

export const useSelectItemCheckmarkColor = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    if (themeColor === 'default') {
      return theme.colors.primary.main
    }

    return colorScheme.main
  }, [themeColor, colorScheme, theme])
}
