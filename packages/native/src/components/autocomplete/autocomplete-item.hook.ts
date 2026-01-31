import { useContext, useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { colors } from '@xaui/core/palette'
import { useXUITheme } from '../../core'
import { AutocompleteContext } from './autocomplete-context'

export const useAutocompleteItemStyles = (isSelected: boolean, isDisabled: boolean) => {
  const theme = useXUITheme()
  const context = useContext(AutocompleteContext)

  const safeThemeColor = getSafeThemeColor(context.themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const backgroundColor = useMemo(() => {
    if (isDisabled) {
      return 'transparent'
    }

    if (isSelected) {
      return colorScheme.background
    }

    return 'transparent'
  }, [isSelected, isDisabled, colorScheme.background])

  const labelColor = useMemo(() => {
    if (isDisabled) {
      return colors.gray[500]
    }

    if (isSelected) {
      return colorScheme.main
    }

    return theme.colors.foreground
  }, [isSelected, isDisabled, colorScheme.main, theme.colors.foreground])

  const descriptionColor = useMemo(() => {
    if (isDisabled) {
      return colors.gray[400]
    }

    return colors.gray[600]
  }, [isDisabled])

  return {
    backgroundColor,
    labelColor,
    descriptionColor,
  }
}
