import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { SelectSize } from './select.type'

export const useSelectItemStyles = (
  size: SelectSize,
  themeColor: ThemeColor,
  isSelected: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
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
        descriptionSize: theme.fontSizes.sm,
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

  const backgroundColor = useMemo(() => {
    if (isSelected) {
      return colorScheme.background
    }

    return 'transparent'
  }, [isSelected, colorScheme])

  const checkmarkColor = useMemo(() => {
    if (themeColor === 'default') {
      return theme.colors.primary.main
    }

    return colorScheme.main
  }, [themeColor, colorScheme, theme])

  return {
    sizeStyles,
    backgroundColor,
    textColor: theme.colors.foreground,
    descriptionColor: theme.colors.foreground,
    checkmarkColor,
  }
}
