import type { TextStyle } from 'react-native'

/** The source layer — the only surface a consumer writes by hand, per mode. */
export type XAUISourceColors = {
  background: string
  foreground: string

  surface: string
  surfaceForeground: string
  surfaceSecondary: string
  surfaceSecondaryForeground: string
  surfaceTertiary: string
  surfaceTertiaryForeground: string

  overlay: string
  overlayForeground: string
  backdrop: string

  muted: string

  default: string
  defaultForeground: string
  accent: string
  accentForeground: string

  fieldBackground: string
  fieldForeground: string
  fieldPlaceholder: string
  fieldBorder: string

  success: string
  successForeground: string
  warning: string
  warningForeground: string
  danger: string
  dangerForeground: string

  segment: string
  segmentForeground: string

  border: string
  separator: string
  focus: string
  link: string
}

/** The derived layer — computed by `deriveColors`, never written by hand. */
export type XAUIDerivedColors = {
  accentPressed: string
  successPressed: string
  warningPressed: string
  dangerPressed: string
  defaultPressed: string
  surfacePressed: string

  defaultSoft: string
  defaultSoftForeground: string
  defaultSoftPressed: string

  accentSoft: string
  accentSoftForeground: string
  accentSoftPressed: string

  successSoft: string
  successSoftForeground: string
  successSoftPressed: string

  warningSoft: string
  warningSoftForeground: string
  warningSoftPressed: string

  dangerSoft: string
  dangerSoftForeground: string
  dangerSoftPressed: string

  backgroundSecondary: string
  backgroundTertiary: string
  backgroundInverse: string

  borderSecondary: string
  borderTertiary: string
  separatorSecondary: string
  separatorTertiary: string

  fieldPressed: string
  fieldFocus: string
  fieldBorderPressed: string
  fieldBorderFocus: string
}

/** Constant across both modes. */
export type XAUIPrimitiveColors = {
  white: string
  black: string
  snow: string
  eclipse: string
}

/** Everything a component reads, flattened. */
export type XAUIColors = XAUISourceColors & XAUIDerivedColors & XAUIPrimitiveColors

export type ColorMode = 'light' | 'dark'

export type Size = 'xs' | 'sm' | 'md' | 'lg'

export type RadiusKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | 'field'
  | 'full'

export type FontSizeKey = Size | 'xl' | '2xl' | '3xl' | '4xl'
export type FontWeightKey = 'regular' | 'medium' | 'semibold' | 'bold'

export type XAUIRadius = Record<RadiusKey, number>

export type XAUIShadow = {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export type XAUITheme = {
  id: string
  mode: ColorMode
  colors: XAUIColors
  /** Base 4 — `spacing(3) === 12`. A function, so there is no "what do we call 12px". */
  spacing: (steps: number) => number
  radius: XAUIRadius
  borderWidth: { default: number; field: number }
  fontSizes: Record<FontSizeKey, number>
  lineHeights: Record<FontSizeKey, number>
  /**
   * Typed as RN's own `fontWeight` rather than `string`: a `string` does not assign to
   * it, so every component reading `t.fontWeights.medium` would have needed a cast.
   */
  fontWeights: Record<FontWeightKey, TextStyle['fontWeight']>
  fontFamilies: { body: string; heading: string; mono: string }
  /** Semantic roles, not a scale: dark mode drops the surface shadow entirely. */
  shadows: { surface: XAUIShadow; overlay: XAUIShadow; field: XAUIShadow }
  opacity: { disabled: number }
  controlHeights: Record<Size, number>
}

export type XAUIThemeConfig = {
  colors?: {
    light?: Partial<XAUISourceColors & XAUIDerivedColors>
    dark?: Partial<XAUISourceColors & XAUIDerivedColors>
  }
  /** The single base the whole radius scale derives from. */
  radius?: number
  spacingUnit?: number
  borderWidth?: Partial<XAUITheme['borderWidth']>
  fontSizes?: Partial<XAUITheme['fontSizes']>
  lineHeights?: Partial<XAUITheme['lineHeights']>
  fontWeights?: Partial<XAUITheme['fontWeights']>
  fontFamilies?: Partial<XAUITheme['fontFamilies']>
  /** Per role, and `shadowOffset` is replaced whole — a half-set offset is not a shadow. */
  shadows?: { [K in keyof XAUITheme['shadows']]?: Partial<XAUIShadow> }
  opacity?: Partial<XAUITheme['opacity']>
  controlHeights?: Partial<XAUITheme['controlHeights']>
}

/** What `createTheme` returns: both modes, resolved, sharing one id. */
export type XAUIThemeSet = {
  id: string
  light: XAUITheme
  dark: XAUITheme
}
