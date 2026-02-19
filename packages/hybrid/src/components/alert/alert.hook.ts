import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { AlertVariant } from './alert.type'

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
): CSSProperties => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const isDark = theme.mode === 'dark'

    const backgroundColor =
      variant === 'solid'
        ? isDark
          ? colorScheme.background
          : colorScheme.main
        : variant === 'flat'
          ? isDark
            ? withOpacity(colorScheme.background, 0.5)
            : colorScheme.background
          : variant === 'faded'
            ? withOpacity(colorScheme.background, 0.75)
            : 'transparent'

    const hasBorder = variant === 'bordered' || variant === 'faded'

    const borderColor =
      variant === 'bordered'
        ? withOpacity(colorScheme.main, 0.75)
        : variant === 'faded'
          ? withOpacity(isDefault ? theme.colors.foreground : colorScheme.main, 0.25)
          : undefined

    return {
      backgroundColor,
      borderStyle: hasBorder ? 'solid' : undefined,
      borderWidth: hasBorder ? theme.borderWidth.md : undefined,
      borderColor: hasBorder ? borderColor : undefined,
      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    }
  }, [colorScheme, isDefault, theme, variant])
}

export const useAlertIconWrapperStyles = (
  themeColor: ThemeColor,
  variant: AlertVariant
): CSSProperties => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const isDark = theme.mode === 'dark'

    const backgroundColor =
      variant === 'solid'
        ? withOpacity(isDark ? colorScheme.main : colorScheme.foreground, 0.16)
        : withOpacity(isDefault ? theme.colors.foreground : colorScheme.main, 0.12)

    const hasBorder = variant === 'bordered' || variant === 'faded'
    const borderColor = withOpacity(
      isDefault ? theme.colors.foreground : colorScheme.main,
      0.2
    )

    return {
      backgroundColor,
      borderStyle: hasBorder ? 'solid' : undefined,
      borderWidth: hasBorder ? theme.borderWidth.xs : undefined,
      borderColor: hasBorder ? borderColor : undefined,
    }
  }, [colorScheme, isDefault, theme, variant])
}

export const useAlertTextStyles = (
  themeColor: ThemeColor,
  variant: AlertVariant
) => {
  const { theme, colorScheme, isDefault } = useAlertColorScheme(themeColor)

  return useMemo(() => {
    const isDark = theme.mode === 'dark'

    const baseTextColor =
      variant === 'solid'
        ? isDark
          ? colorScheme.main
          : colorScheme.foreground
        : isDefault
          ? theme.colors.foreground
          : colorScheme.main

    return {
      titleStyles: {
        color: baseTextColor,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
      } as CSSProperties,
      descriptionStyles: {
        color: withOpacity(baseTextColor, 0.75),
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.normal,
      } as CSSProperties,
      iconColor: baseTextColor,
      closeButtonColor: baseTextColor,
    }
  }, [colorScheme, isDefault, theme, variant])
}
