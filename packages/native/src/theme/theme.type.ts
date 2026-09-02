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
