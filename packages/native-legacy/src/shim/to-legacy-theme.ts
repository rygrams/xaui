import { palette } from '@xaui/native/theme'
import type { XAUIColors, XAUITheme } from '@xaui/native/theme'
import type { ColorScheme, ThemeColors, XUITheme } from './legacy-theme'

/**
 * v1 names a colour family `X` / `XForeground` / `XSoft` / `XSoftForeground` — the same
 * four roles MD3 spells `main` / `onMain` / `container` / `onContainer`.
 */
type SoftFamily = 'accent' | 'danger' | 'warning' | 'success' | 'default'

function fromFamily(colors: XAUIColors, family: SoftFamily): ColorScheme {
  return {
    main: colors[family],
    onMain: colors[`${family}Foreground`],
    container: colors[`${family}Soft`],
    onContainer: colors[`${family}SoftForeground`],
  }
}

/**
 * `secondary` and `tertiary` have no v1 equivalent: they were surface levels dressed as
 * colours, and v1 dropped them (see the migration table). They project onto the levels
 * they always were rather than onto invented hues.
 */
function fromSurfaceLevel(
  colors: XAUIColors,
  level: 'Secondary' | 'Tertiary'
): ColorScheme {
  return {
    main: colors[`surface${level}`],
    onMain: colors[`surface${level}Foreground`],
    container: colors[`background${level}`],
    onContainer: colors.foreground,
  }
}

function toColors(colors: XAUIColors): ThemeColors {
  return {
    primary: fromFamily(colors, 'accent'),
    secondary: fromSurfaceLevel(colors, 'Secondary'),
    tertiary: fromSurfaceLevel(colors, 'Tertiary'),
    danger: fromFamily(colors, 'danger'),
    warning: fromFamily(colors, 'warning'),
    success: fromFamily(colors, 'success'),
    default: fromFamily(colors, 'default'),
    background: colors.background,
    foreground: colors.foreground,
  }
}

/**
 * Legacy's eight radius steps against v1's ten, matched on the value they resolve to at
 * the default base of 12 — `sm` 4→3, `md` 8→6, `lg` 12→12, `xl` 16→18, `2xl` 24→24,
 * `3xl` 32→36. Changing `radius` in `createTheme` now moves both trees together.
 */
function toBorderRadius(radius: XAUITheme['radius']): XUITheme['borderRadius'] {
  return {
    none: 0,
    sm: radius.xs,
    md: radius.sm,
    lg: radius.lg,
    xl: radius.xl,
    '2xl': radius['2xl'],
    '3xl': radius['3xl'],
    full: radius.full,
  }
}

/** v1 keeps one border width; legacy's six steps are ratios of it. */
function toBorderWidth(width: XAUITheme['borderWidth']): XUITheme['borderWidth'] {
  const base = width.default
  return {
    none: 0,
    xs: base * 0.5,
    sm: base,
    md: base * 1.75,
    lg: base * 2.5,
    xl: base * 3,
  }
}

/** v1 has four weights against legacy's six; `light` and `extrabold` keep their constants. */
function toFontWeights(weights: XAUITheme['fontWeights']): XUITheme['fontWeights'] {
  return {
    light: '300',
    normal: weights.regular,
    medium: weights.medium,
    semibold: weights.semibold,
    bold: weights.bold,
    extrabold: '800',
  }
}

/**
 * v1 has three shadow *roles* where legacy had a four-step scale, so `lg` and `xl` both
 * land on `overlay` — the heaviest role there is.
 */
function toShadows(shadows: XAUITheme['shadows']): XUITheme['shadows'] {
  return {
    sm: shadows.field,
    md: shadows.surface,
    lg: shadows.overlay,
    xl: shadows.overlay,
  }
}

const cache = new WeakMap<XAUITheme, XUITheme>()

/**
 * Projects a v1 theme onto the MD3 shape the frozen components read.
 *
 * The projection is by *role*, not by pixel: `primary` is whatever the app's accent is, so
 * `createTheme({ colors: { light: { accent } } })` re-skins both trees at once. That is the
 * point of the single provider — a half-migrated app must not show two palettes.
 *
 * Cached on the v1 theme's identity: `createTheme` runs once at module level, so the
 * projection runs once per mode for the life of the app rather than on every render of
 * every legacy component.
 */
export function toLegacyTheme(theme: XAUITheme): XUITheme {
  const cached = cache.get(theme)
  if (cached) return cached

  const legacy: XUITheme = {
    mode: theme.mode,
    palette,
    colors: toColors(theme.colors),
    spacing: {
      xs: theme.spacing(1),
      sm: theme.spacing(2),
      md: theme.spacing(4),
      lg: theme.spacing(6),
      xl: theme.spacing(8),
      '2xl': theme.spacing(12),
      '3xl': theme.spacing(16),
    },
    borderRadius: toBorderRadius(theme.radius),
    borderWidth: toBorderWidth(theme.borderWidth),
    fontSizes: { ...theme.fontSizes },
    fontWeights: toFontWeights(theme.fontWeights),
    fontFamilies: {
      body: theme.fontFamilies.body,
      heading: theme.fontFamilies.heading,
      default: theme.fontFamilies.mono,
    },
    shadows: toShadows(theme.shadows),
    componentSizes: { ...theme.controlHeights },
  }

  cache.set(theme, legacy)
  return legacy
}
