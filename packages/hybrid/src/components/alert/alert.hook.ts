'use client'

import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { AlertVariant } from './alert.type'
import { toEm } from '../../utils/to-em'

export const useAlertColorScheme = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)

  return {
    theme,
    colorScheme: theme.colors[safeThemeColor],
    isDefault: safeThemeColor === 'default',
  }
}

export const useAlertContainerStyles = (
  themeColor: ThemeColor,
  variant: AlertVariant
) => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const backgroundColor =
      variant === 'solid'
        ? colorScheme.main
        : variant === 'flat'
          ? colorScheme.container
          : variant === 'faded'
            ? withOpacity(colorScheme.container, 0.75)
            : 'transparent'

    const borderWidth =
      variant === 'bordered' || variant === 'faded' ? toEm(theme.borderWidth.md) : 0

    const borderColor =
      variant === 'bordered'
        ? withOpacity(colorScheme.main, 0.75)
        : variant === 'faded'
          ? withOpacity(isDefault ? theme.colors.foreground : colorScheme.main, 0.25)
          : 'transparent'

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle: borderWidth !== 0 ? ('solid' as const) : undefined,
      paddingTop: toEm(theme.spacing.sm),
      paddingBottom: toEm(theme.spacing.sm),
      paddingLeft: toEm(theme.spacing.md),
      paddingRight: toEm(theme.spacing.md),
    }
  }, [colorScheme, isDefault, theme, variant])
}

export const useAlertIconWrapperStyles = (
  themeColor: ThemeColor,
  variant: AlertVariant
) => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const backgroundColor =
      variant === 'solid'
        ? withOpacity(colorScheme.onMain, 0.16)
        : withOpacity(isDefault ? theme.colors.foreground : colorScheme.main, 0.12)

    const borderWidth =
      variant === 'bordered' || variant === 'faded' ? toEm(theme.borderWidth.xs) : 0

    const borderColor = withOpacity(
      isDefault ? theme.colors.foreground : colorScheme.main,
      0.2
    )

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle: borderWidth !== 0 ? ('solid' as const) : undefined,
    }
  }, [colorScheme, isDefault, theme, variant])
}

export const useAlertTextStyles = (
  themeColor: ThemeColor,
  variant: AlertVariant
) => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const baseTextColor =
      variant === 'solid'
        ? colorScheme.onMain
        : variant === 'flat' || variant === 'faded'
          ? isDefault
            ? theme.colors.foreground
            : colorScheme.onContainer
          : isDefault
            ? theme.colors.foreground
            : colorScheme.main

    return {
      titleStyles: {
        color: baseTextColor,
        fontSize: toEm(theme.fontSizes.sm),
        fontWeight: theme.fontWeights.semibold,
      },
      descriptionStyles: {
        color: withOpacity(baseTextColor, 0.75),
        fontSize: toEm(theme.fontSizes.xs),
        fontWeight: theme.fontWeights.normal,
      },
      iconColor: baseTextColor,
      closeButtonColor: baseTextColor,
    }
  }, [colorScheme, isDefault, theme, variant])
}
