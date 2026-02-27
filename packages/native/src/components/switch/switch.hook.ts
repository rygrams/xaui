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

type SwitchSizeStyles = {
  trackWidth: number
  trackHeight: number
  thumbSize: number
  fontSize: number
  padding: number
}

export const useSwitchColorScheme = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  return theme.colors[safeThemeColor]
}

export const useSwitchSizeStyles = (variant: SwitchVariant, size: SwitchSize) => {
  const theme = useXUITheme()

  const sizeStyles = useMemo(() => {
    if (variant === 'overlap') {
      const sizes: Record<SwitchSize, SwitchSizeStyles> = {
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

    const sizes: Record<SwitchSize, SwitchSizeStyles> = {
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

  return sizeStyles
}

export const useSwitchRadiusStyles = (radius: SwitchRadius) => {
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

  return { radiusStyles, thumbRadius }
}

type SwitchTrackStylesParams = {
  colorScheme: ReturnType<typeof useSwitchColorScheme>
  isSelected: boolean
  variant: SwitchVariant
  sizeStyles: SwitchSizeStyles
  radiusStyles: { borderRadius: number }
}

export const useSwitchTrackStyles = ({
  colorScheme,
  isSelected,
  variant,
  sizeStyles,
  radiusStyles,
}: SwitchTrackStylesParams) => {
  const theme = useXUITheme()

  const trackStyles = useMemo(() => {
    const backgroundColor = isSelected
      ? variant === 'overlap'
        ? colorScheme.container
        : colorScheme.main
      : theme.colors.default.container

    return {
      width: sizeStyles.trackWidth,
      height: sizeStyles.trackHeight,
      backgroundColor,
      paddingHorizontal: sizeStyles.padding,
      ...radiusStyles,
    }
  }, [colorScheme, isSelected, radiusStyles, sizeStyles, theme, variant])

  return trackStyles
}

type SwitchThumbStylesParams = {
  colorScheme: ReturnType<typeof useSwitchColorScheme>
  isSelected: boolean
  variant: SwitchVariant
  sizeStyles: SwitchSizeStyles
  thumbRadius: number
}

export const useSwitchThumbStyles = ({
  colorScheme,
  isSelected,
  variant,
  sizeStyles,
  thumbRadius,
}: SwitchThumbStylesParams) => {
  const theme = useXUITheme()

  const thumbStyles = useMemo(() => {
    const baseStyle = {
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: thumbRadius,
      backgroundColor:
        variant === 'overlap' && isSelected
          ? colorScheme.main
          : theme.colors.background,
    }

    if (variant !== 'overlap') return baseStyle

    return {
      ...baseStyle,
      ...theme.shadows.sm,
    }
  }, [colorScheme, isSelected, sizeStyles, theme, thumbRadius, variant])

  return thumbStyles
}

export const useSwitchContainerStyles = (labelAlignment: SwitchLabelAlignment) => {
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
