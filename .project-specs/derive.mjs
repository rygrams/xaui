import { mix, alpha } from './oklab.mjs'

/** Couche DÉRIVÉE — ~30 tokens calculés, jamais écrits à la main. */
export function deriveColors(s) {
  return {
    // états pressés (les `-hover` de HeroUI, renommés)
    accentPressed:  mix(s.accent,  s.accentForeground,  0.10),
    successPressed: mix(s.success, s.successForeground, 0.10),
    warningPressed: mix(s.warning, s.warningForeground, 0.10),
    dangerPressed:  mix(s.danger,  s.dangerForeground,  0.10),
    defaultPressed: mix(s.default, s.defaultForeground, 0.04),
    surfacePressed: mix(s.surface, s.surfaceForeground, 0.08),

    // variantes douces
    defaultSoft: alpha(s.default, 0.50),
    defaultSoftForeground: s.defaultForeground,
    defaultSoftPressed: alpha(s.default, 0.60),

    accentSoft:  alpha(s.accent, 0.15),
    accentSoftForeground:  mix(s.accent,  s.foreground, 0.20),
    accentSoftPressed:  alpha(s.accent, 0.20),

    successSoft: alpha(s.success, 0.15),
    successSoftForeground: mix(s.success, s.foreground, 0.30),
    successSoftPressed: alpha(s.success, 0.20),

    warningSoft: alpha(s.warning, 0.15),
    warningSoftForeground: mix(s.warning, s.foreground, 0.35),
    warningSoftPressed: alpha(s.warning, 0.20),

    dangerSoft:  alpha(s.danger, 0.15),
    dangerSoftForeground:  mix(s.danger,  s.foreground, 0.20),
    dangerSoftPressed:  alpha(s.danger, 0.20),

    // niveaux de fond
    backgroundSecondary: mix(s.background, s.foreground, 0.04),
    backgroundTertiary:  mix(s.background, s.foreground, 0.08),
    backgroundInverse:   s.foreground,

    // niveaux de bordure et séparateur
    borderSecondary:    mix(s.surface, s.surfaceForeground, 0.22),
    borderTertiary:     mix(s.surface, s.surfaceForeground, 0.34),
    separatorSecondary: mix(s.surface, s.surfaceForeground, 0.15),
    separatorTertiary:  mix(s.surface, s.surfaceForeground, 0.19),

    // champs
    fieldPressed:       mix(s.fieldBackground, s.fieldForeground, 0.10),
    fieldFocus:         s.fieldBackground,
    fieldBorderPressed: mix(s.fieldBorder, s.fieldForeground, 0.12),
    fieldBorderFocus:   mix(s.fieldBorder, s.fieldForeground, 0.26),
  }
}
