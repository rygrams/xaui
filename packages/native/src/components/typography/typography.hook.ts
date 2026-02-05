import { useMemo } from 'react'
import type { TextStyle } from 'react-native'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { TypographyVariant } from './typography.type'
import { getSafeThemeColor } from '@xaui/core'

type KnownVariant =
  | 'caption'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'subtitleLarge'
  | 'subtitleMedium'
  | 'subtitleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'

const knownVariants: Record<string, true> = {
  caption: true,
  headlineLarge: true,
  headlineMedium: true,
  headlineSmall: true,
  subtitleLarge: true,
  subtitleMedium: true,
  subtitleSmall: true,
  bodyLarge: true,
  bodyMedium: true,
  bodySmall: true,
}

const isKnownVariant = (variant: TypographyVariant): variant is KnownVariant => {
  return Boolean(knownVariants[variant])
}

export const useTypographyColor = (themeColor: ThemeColor) => {
  const theme = useXUITheme()

  const color = useMemo(() => {
    if (themeColor === 'default') {
      return theme.colors.foreground
    }

    const safeThemeColor = getSafeThemeColor(themeColor)
    return theme.colors[safeThemeColor].main
  }, [theme, themeColor])

  return color
}

export const useTypographyVariantStyles = (variant: TypographyVariant) => {
  const theme = useXUITheme()

  const variantStyles = useMemo<TextStyle>(() => {
    if (!isKnownVariant(variant)) {
      return {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      }
    }

    const styles: Record<KnownVariant, TextStyle> = {
      caption: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      headlineLarge: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['4xl'] + 3,
        fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
      },
      headlineMedium: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['3xl'] + 3,
        fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
      },
      headlineSmall: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['2xl'] + 3,
        fontWeight: theme.fontWeights.semibold as TextStyle['fontWeight'],
      },
      subtitleLarge: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.md + 5,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      subtitleMedium: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.sm + 5,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      subtitleSmall: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.xs + 5,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      bodyLarge: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      bodyMedium: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      bodySmall: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
    }

    return styles[variant]
  }, [theme, variant])

  return variantStyles
}
