import { alpha, mix } from '../utils/colors'
import type { XAUIDerivedColors, XAUISourceColors } from './theme.type'

/**
 * The derived layer: ~30 tokens computed from the source layer, never written by hand.
 * Override `accent` and `accentPressed`, `accentSoft`, `accentSoftForeground` follow.
 *
 * These are HeroUI's `color-mix(in oklab, …)` formulas transposed to JS, because React
 * Native has no `color-mix()`. Their `-hover` names became `-pressed`: what they feed is
 * the press overlay, and the web name was a leftover.
 */
export function deriveColors(s: XAUISourceColors): XAUIDerivedColors {
  return {
    accentPressed: mix(s.accent, s.accentForeground, 0.1),
    successPressed: mix(s.success, s.successForeground, 0.1),
    warningPressed: mix(s.warning, s.warningForeground, 0.1),
    dangerPressed: mix(s.danger, s.dangerForeground, 0.1),
    defaultPressed: mix(s.default, s.defaultForeground, 0.04),
    surfacePressed: mix(s.surface, s.surfaceForeground, 0.08),

    defaultSoft: alpha(s.default, 0.5),
    defaultSoftForeground: s.defaultForeground,
    defaultSoftPressed: alpha(s.default, 0.6),

    accentSoft: alpha(s.accent, 0.15),
    accentSoftForeground: mix(s.accent, s.foreground, 0.2),
    accentSoftPressed: alpha(s.accent, 0.2),

    successSoft: alpha(s.success, 0.15),
    successSoftForeground: mix(s.success, s.foreground, 0.3),
    successSoftPressed: alpha(s.success, 0.2),

    warningSoft: alpha(s.warning, 0.15),
    warningSoftForeground: mix(s.warning, s.foreground, 0.35),
    warningSoftPressed: alpha(s.warning, 0.2),

    dangerSoft: alpha(s.danger, 0.15),
    dangerSoftForeground: mix(s.danger, s.foreground, 0.2),
    dangerSoftPressed: alpha(s.danger, 0.2),

    backgroundSecondary: mix(s.background, s.foreground, 0.04),
    backgroundTertiary: mix(s.background, s.foreground, 0.08),
    backgroundInverse: s.foreground,

    borderSecondary: mix(s.surface, s.surfaceForeground, 0.22),
    borderTertiary: mix(s.surface, s.surfaceForeground, 0.34),
    separatorSecondary: mix(s.surface, s.surfaceForeground, 0.15),
    separatorTertiary: mix(s.surface, s.surfaceForeground, 0.19),

    fieldPressed: mix(s.fieldBackground, s.fieldForeground, 0.1),
    fieldFocus: s.fieldBackground,
    fieldBorderPressed: mix(s.fieldBorder, s.fieldForeground, 0.12),
    fieldBorderFocus: mix(s.fieldBorder, s.fieldForeground, 0.26),
  }
}
