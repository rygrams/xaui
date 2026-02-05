import { useContext, useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Size, ThemeColor } from '../../types'
import { AutocompleteContext } from './autocomplete-context'

type AutocompleteItemSizeStyles = {
  paddingVertical: number
  paddingHorizontal: number
  titleSize: number
  descriptionSize: number
}

export const useAutocompleteItemSizeStyles = (
  size: Size
): AutocompleteItemSizeStyles => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes = {
      xs: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        titleSize: theme.fontSizes.xs,
        descriptionSize: theme.fontSizes.xs,
      },
      sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        titleSize: theme.fontSizes.sm,
        descriptionSize: theme.fontSizes.xs,
      },
      md: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        titleSize: theme.fontSizes.md,
        descriptionSize: theme.fontSizes.xs,
      },
      lg: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        titleSize: theme.fontSizes.lg,
        descriptionSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])
}

export const useAutocompleteItemBackgroundColor = (
  themeColor: ThemeColor,
  isSelected: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    return 'transparent'
  }, [isSelected, colorScheme])
}

export const useAutocompleteItemTextColors = () => {
  const theme = useXUITheme()

  return useMemo(() => {
    return {
      textColor: theme.colors.foreground,
      descriptionColor: theme.colors.foreground,
    }
  }, [theme])
}

export const useAutocompleteItemCheckmarkColor = (themeColor: ThemeColor) => {
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

export const useAutocompleteItemStyles = (
  isSelected: boolean,
  _isDisabled: boolean
) => {
  const context = useContext(AutocompleteContext)

  const backgroundColor = useAutocompleteItemBackgroundColor(
    context.themeColor,
    isSelected
  )
  const { textColor, descriptionColor } = useAutocompleteItemTextColors()
  const checkmarkColor = useAutocompleteItemCheckmarkColor(context.themeColor)

  return {
    backgroundColor,
    labelColor: textColor,
    descriptionColor,
    checkmarkColor,
  }
}
