import { darkThemeColors, themeColors, ThemeColors } from './theme-colors'

export interface ThemeSpacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
}

export interface ThemeBorderRadius {
  none: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  full: number
}

export interface ThemeFontSizes {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
}

export interface ThemeFontWeights {
  light: string
  normal: string
  medium: string
  semibold: string
  bold: string
  extrabold: string
}

export interface ThemeFontFamilies {
  body: string
  heading: string
  monospace: string
}

export interface ThemeShadows {
  sm: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  md: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  lg: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  xl: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
}

export interface XUITheme {
  colors: ThemeColors
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  fontFamilies: ThemeFontFamilies
  shadows: ThemeShadows
}

const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  fontFamilies: {
    body: 'System',
    heading: 'System',
    monospace: 'monospace',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
} as const

export const theme: XUITheme = {
  colors: themeColors,
  ...baseTheme,
}

export const darkTheme: XUITheme = {
  colors: darkThemeColors,
  ...baseTheme,
}

export const defaultTheme = theme
