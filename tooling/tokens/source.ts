import type { XAUIPrimitiveColors, XAUISourceColors } from '../../packages/native/src/theme/theme.type'

/** The raw palette. It sits outside the theme — components never read it. */
const p = {
  white: '#ffffff',
  black: '#000000',
  snow: '#fafafa',
  eclipse: '#18181b',
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  purple: {
    50: '#faf5ff',
    400: '#c084fc',
    600: '#9333ea',
  },
  green: { 400: '#4ade80', 700: '#15803d' },
  amber: { 400: '#fbbf24', 700: '#b45309' },
  red: { 400: '#f87171', 600: '#dc2626' },
}

export const primitives: XAUIPrimitiveColors = {
  white: p.white,
  black: p.black,
  snow: p.snow,
  eclipse: p.eclipse,
}

/**
 * The SOURCE layer — the only colours written by hand, and the only surface a consumer
 * overrides. Everything else is derived from these by `deriveColors`.
 */
export const source: Record<'light' | 'dark', XAUISourceColors> = {
  light: {
    background: p.zinc[50],
    foreground: p.zinc[900],
    surface: p.white,
    surfaceForeground: p.zinc[900],
    surfaceSecondary: p.zinc[100],
    surfaceSecondaryForeground: p.zinc[900],
    surfaceTertiary: p.zinc[200],
    surfaceTertiaryForeground: p.zinc[900],
    overlay: p.white,
    overlayForeground: p.zinc[900],
    backdrop: 'rgba(0, 0, 0, 0.2)',
    muted: p.zinc[500],
    default: p.zinc[100],
    defaultForeground: p.zinc[900],
    accent: p.purple[600],
    accentForeground: p.purple[50],
    fieldBackground: p.white,
    fieldForeground: p.zinc[900],
    fieldPlaceholder: p.zinc[500],
    fieldBorder: p.zinc[200],
    success: p.green[700],
    successForeground: p.zinc[50],
    warning: p.amber[700],
    warningForeground: p.zinc[50],
    danger: p.red[600],
    dangerForeground: p.zinc[50],
    segment: p.white,
    segmentForeground: p.zinc[900],
    border: p.zinc[200],
    separator: p.zinc[300],
    focus: p.purple[600],
    link: p.zinc[900],
  },
  dark: {
    background: p.zinc[950],
    foreground: p.zinc[50],
    surface: p.zinc[900],
    surfaceForeground: p.zinc[50],
    surfaceSecondary: p.zinc[800],
    surfaceSecondaryForeground: p.zinc[50],
    surfaceTertiary: p.zinc[700],
    surfaceTertiaryForeground: p.zinc[50],
    overlay: p.zinc[900],
    overlayForeground: p.zinc[50],
    backdrop: 'rgba(0, 0, 0, 0.5)',
    muted: p.zinc[400],
    default: p.zinc[800],
    defaultForeground: p.zinc[50],
    accent: p.purple[400],
    accentForeground: p.zinc[900],
    fieldBackground: p.zinc[900],
    fieldForeground: p.zinc[50],
    fieldPlaceholder: p.zinc[400],
    fieldBorder: p.zinc[700],
    success: p.green[400],
    successForeground: p.zinc[900],
    warning: p.amber[400],
    warningForeground: p.zinc[900],
    danger: p.red[400],
    dangerForeground: p.zinc[900],
    segment: p.zinc[700],
    segmentForeground: p.zinc[50],
    border: p.zinc[800],
    separator: p.zinc[600],
    focus: p.purple[400],
    link: p.zinc[50],
  },
}

/**
 * Pairs the contrast guard checks in both modes. A brand colour that drops one of these
 * below the floor fails the build rather than shipping unreadable text.
 */
export const contrastPairs: ReadonlyArray<
  [keyof XAUISourceColors, keyof XAUISourceColors]
> = [
  ['accent', 'accentForeground'],
  ['default', 'defaultForeground'],
  ['success', 'successForeground'],
  ['warning', 'warningForeground'],
  ['danger', 'dangerForeground'],
  ['background', 'foreground'],
  ['surface', 'surfaceForeground'],
  ['overlay', 'overlayForeground'],
  ['background', 'muted'],
  ['segment', 'segmentForeground'],
  ['fieldBackground', 'fieldForeground'],
  ['fieldBackground', 'fieldPlaceholder'],
]

export const CONTRAST_FLOOR = 4.5
