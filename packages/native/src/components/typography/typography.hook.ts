import { useMemo } from 'react'
import type { TextStyle } from 'react-native'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { TypographyVariant } from './typography.type'
import { getSafeThemeColor } from '@xaui/core'

type KnownVariant =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

const knownVariants: Record<string, true> = {
  body1: true,
  body2: true,
  button: true,
  caption: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  inherit: true,
  overline: true,
  subtitle1: true,
  subtitle2: true,
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

    if (variant === 'inherit') {
      return {}
    }

    const styles: Record<KnownVariant, TextStyle> = {
      body1: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      body2: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      button: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold as TextStyle['fontWeight'],
        textTransform: 'uppercase',
        letterSpacing: 0.8,
      },
      caption: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.normal as TextStyle['fontWeight'],
      },
      h1: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['4xl'],
        fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
      },
      h2: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['3xl'],
        fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
      },
      h3: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes['2xl'],
        fontWeight: theme.fontWeights.semibold as TextStyle['fontWeight'],
      },
      h4: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.semibold as TextStyle['fontWeight'],
      },
      h5: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.semibold as TextStyle['fontWeight'],
      },
      h6: {
        fontFamily: theme.fontFamilies.heading,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      overline: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
      subtitle1: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      subtitle2: {
        fontFamily: theme.fontFamilies.body,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      },
      inherit: {},
    }

    return styles[variant]
  }, [theme, variant])

  return variantStyles
}
