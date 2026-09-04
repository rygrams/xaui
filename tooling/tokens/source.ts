import { palette as p, primitives } from '../../packages/native/src/theme/palette'
import type { XAUISourceColors } from '../../packages/native/src/theme/theme.type'

export { primitives }

export const source: Record<'light' | 'dark', XAUISourceColors> = {
  light: {
    background: p.zinc[50],
    foreground: p.zinc[900],
    surface: primitives.white,
    surfaceForeground: p.zinc[900],
    // Not a palette step. `zinc[100]` sits so close to the `background` (`zinc[50]`)
    // that a `secondary` card on the page reads as no card at all, and `zinc[200]` is
    // already `surfaceTertiary` — so the level between them is the only one left. It is
    // the OKLab midpoint of the two, which keeps it on the same ramp rather than beside
    // it. Written here rather than added to the palette: `PaletteShade` is derived from
    // `zinc`, so a 150 there would claim every other family has one too.
    surfaceSecondary: '#ececee',
    surfaceSecondaryForeground: p.zinc[900],
    surfaceTertiary: p.zinc[200],
    surfaceTertiaryForeground: p.zinc[900],
    overlay: primitives.white,
    overlayForeground: p.zinc[900],
    backdrop: 'rgba(0, 0, 0, 0.2)',
    muted: p.zinc[500],
    default: p.zinc[200],
    defaultForeground: p.zinc[900],
    accent: p.purple[600],
    accentForeground: p.purple[50],
    fieldBackground: primitives.white,
    fieldForeground: p.zinc[900],
    fieldPlaceholder: p.zinc[500],
    fieldBorder: p.zinc[200],
    success: p.green[700],
    successForeground: p.zinc[50],
    warning: p.amber[700],
    warningForeground: p.zinc[50],
    danger: p.red[600],
    dangerForeground: p.zinc[50],
    segment: primitives.white,
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
