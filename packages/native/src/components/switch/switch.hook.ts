import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type {
  SwitchLabelAlignment,
  SwitchRadius,
  SwitchSize,
  SwitchVariant,
} from './switch.type'

export const useSwitchStyles = (
  themeColor: ThemeColor,
  variant: SwitchVariant,
  size: SwitchSize,
  radius: SwitchRadius,
  labelAlignment: SwitchLabelAlignment,
  isSelected: boolean
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const sizeStyles = useMemo(() => {
    if (variant === 'overlap') {
      const sizes = {
        sm: {
          trackWidth: 40,
          trackHeight: 16,
          thumbSize: 22,
          fontSize: theme.fontSizes.sm,
          padding: 0,
        },
        md: {
          trackWidth: 48,
          trackHeight: 18,
          thumbSize: 26,
          fontSize: theme.fontSizes.md,
          padding: 0,
        },
        lg: {
          trackWidth: 56,
          trackHeight: 20,
          thumbSize: 30,
          fontSize: theme.fontSizes.lg,
          padding: 0,
        },
      }
      return sizes[size]
    }

    const sizes = {
      sm: {
        trackWidth: 40,
        trackHeight: 24,
        thumbSize: 18,
        fontSize: theme.fontSizes.sm,
        padding: 3,
      },
      md: {
        trackWidth: 48,
        trackHeight: 28,
        thumbSize: 22,
        fontSize: theme.fontSizes.md,
        padding: 3,
      },
      lg: {
        trackWidth: 56,
        trackHeight: 32,
        thumbSize: 26,
        fontSize: theme.fontSizes.lg,
        padding: 3,
      },
    }
    return sizes[size]
  }, [size, theme, variant])

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

  const thumbRadius = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return radii[radius]
  }, [radius, theme])

  const trackStyles = useMemo(() => {
    const backgroundColor = isSelected
      ? variant === 'overlap'
        ? colorScheme.background
        : colorScheme.main
      : theme.colors.default.background

    return {
      width: sizeStyles.trackWidth,
      height: sizeStyles.trackHeight,
      backgroundColor,
      paddingHorizontal: sizeStyles.padding,
      ...radiusStyles,
    }
  }, [colorScheme, isSelected, radiusStyles, sizeStyles, theme, variant])

  const thumbStyles = useMemo(() => {
    const baseStyle = {
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: thumbRadius,
      backgroundColor:
        variant === 'overlap' && isSelected ? colorScheme.main : theme.colors.background,
    }

    if (variant !== 'overlap') return baseStyle

    return {
      ...baseStyle,
      ...theme.shadows.sm,
    }
  }, [colorScheme, isSelected, sizeStyles, theme, thumbRadius, variant])

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

  return {
    colorScheme,
    sizeStyles,
    radiusStyles,
    thumbRadius,
    trackStyles,
    thumbStyles,
    containerStyles,
  }
}
