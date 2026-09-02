import type { palette } from '@xaui/native/theme'

/**
 * The MD3 colour shape the 47 frozen components read. It no longer has a source of its
 * own: every value below is projected from the v1 theme, so an app that themes through
 * `createTheme` themes both trees at once.
 */
export type ColorScheme = {
  main: string
  onMain: string
  container: string
  onContainer: string
}

export type ThemeColors = {
  primary: ColorScheme
  secondary: ColorScheme
  tertiary: ColorScheme
  danger: ColorScheme
  warning: ColorScheme
  success: ColorScheme
  default: ColorScheme
  background: string
  foreground: string
}

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

export interface ThemeBorderWidth {
  none: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
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
  default: string
}

export interface ThemeComponentSizes {
  xs: number
  sm: number
  md: number
  lg: number
}

export type ShadowValue = {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export interface ThemeShadows {
  sm: ShadowValue
  md: ShadowValue
  lg: ShadowValue
  xl: ShadowValue
}

export interface XUITheme {
  mode: 'light' | 'dark'
  palette: typeof palette
  colors: ThemeColors
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  borderWidth: ThemeBorderWidth
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  fontFamilies: ThemeFontFamilies
  shadows: ThemeShadows
  componentSizes: ThemeComponentSizes
}

/** What legacy exposes publicly as `XUITheme` — every branch optional. */
export type PartialXUITheme = {
  readonly mode?: 'light' | 'dark'
  readonly palette?: typeof palette
  colors?: Partial<ThemeColors>
  spacing?: Partial<ThemeSpacing>
  borderRadius?: Partial<ThemeBorderRadius>
  borderWidth?: Partial<ThemeBorderWidth>
  fontSizes?: Partial<ThemeFontSizes>
  fontWeights?: Partial<ThemeFontWeights>
  fontFamilies?: Partial<ThemeFontFamilies>
  shadows?: Partial<ThemeShadows>
  componentSizes?: Partial<ThemeComponentSizes>
}
