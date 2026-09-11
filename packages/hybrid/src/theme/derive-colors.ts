import { alpha, mix } from '../utils/colors'
import type { XAUIDerivedColors, XAUISourceColors } from './theme.type'

export function deriveColors(source: XAUISourceColors): XAUIDerivedColors {
  return {
    accentPressed: mix(source.accent, source.foreground, 0.1),
    successPressed: mix(source.success, source.foreground, 0.1),
    warningPressed: mix(source.warning, source.foreground, 0.1),
    dangerPressed: mix(source.danger, source.foreground, 0.1),
    defaultPressed: mix(source.default, source.defaultForeground, 0.04),
    surfacePressed: mix(source.surface, source.surfaceForeground, 0.08),
    defaultSoft: alpha(source.default, 0.5),
    defaultSoftForeground: source.defaultForeground,
    defaultSoftPressed: alpha(source.default, 0.6),
    accentSoft: alpha(source.accent, 0.15),
    accentSoftForeground: mix(source.accent, source.foreground, 0.2),
    accentSoftPressed: alpha(source.accent, 0.2),
    successSoft: alpha(source.success, 0.15),
    successSoftForeground: mix(source.success, source.foreground, 0.3),
    successSoftPressed: alpha(source.success, 0.2),
    warningSoft: alpha(source.warning, 0.15),
    warningSoftForeground: mix(source.warning, source.foreground, 0.35),
    warningSoftPressed: alpha(source.warning, 0.2),
    dangerSoft: alpha(source.danger, 0.15),
    dangerSoftForeground: mix(source.danger, source.foreground, 0.2),
    dangerSoftPressed: alpha(source.danger, 0.2),
    backgroundSecondary: mix(source.background, source.foreground, 0.04),
    backgroundTertiary: mix(source.background, source.foreground, 0.08),
    backgroundInverse: source.foreground,
    borderSecondary: mix(source.surface, source.surfaceForeground, 0.22),
    borderTertiary: mix(source.surface, source.surfaceForeground, 0.34),
    separatorSecondary: mix(source.surface, source.surfaceForeground, 0.15),
    separatorTertiary: mix(source.surface, source.surfaceForeground, 0.19),
    fieldPressed: mix(source.fieldBackground, source.fieldForeground, 0.1),
    fieldFocus: source.fieldBackground,
    fieldBorderPressed: mix(source.fieldBorder, source.fieldForeground, 0.12),
    fieldBorderFocus: mix(source.fieldBorder, source.fieldForeground, 0.26),
  }
}
