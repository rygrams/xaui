import type { VariantTokens } from '@xaui/native/system'
import { accentSoftInk } from '../theme/accent-ink'
import { tramAccents } from '../theme/tram-tokens'
import type { TramAccentName } from '../theme/tram-tokens'

/**
 * Native's eleven names for a component that reports — a count, a tag, a status — kept
 * as they are: the `Chip` and the `Badge` say an outcome, so the three status families
 * are names and not a `color`, as on the Tram `Toast`. Each is one flat fill.
 *
 * | Name                            | Fill                         | Ink                 |
 * | ------------------------------- | ---------------------------- | ------------------- |
 * | `primary`                       | the accent                   | the ink that reads  |
 * | `secondary`                     | its soft slice               | the soft ink        |
 * | `default`                       | the discreet `surface`       | the surface's ink   |
 * | `tertiary`                      | none — the `Button`'s line   | the page's ink      |
 * | `ghost`                         | none                         | the page's ink      |
 * | `success`, `warning`, `danger`  | the theme's status colour    | the ink that reads  |
 * | `*-soft`                        | its soft slice               | the soft ink        |
 */
export type ReportVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export const REPORT_TOKENS: Record<ReportVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  default: { bg: 'surface', fg: 'surfaceForeground' },
  tertiary: { border: 'foreground', fg: 'foreground' },
  ghost: { fg: 'foreground' },
  success: { bg: 'success', fg: 'successForeground' },
  'success-soft': { bg: 'successSoft', fg: 'successSoftForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  'warning-soft': { bg: 'warningSoft', fg: 'warningSoftForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
  'danger-soft': { bg: 'dangerSoft', fg: 'dangerSoftForeground' },
}

/**
 * The names with no fill, where a colour is drawn on the page itself — so an `accent`
 * there is the ink, not the true colour (`groundPaint`'s `isLine`).
 */
export function isLineReport(variant: ReportVariant): boolean {
  return variant === 'tertiary' || variant === 'ghost'
}

/** The full colours a soft slice is cut from — the theme's names for them. */
export type MarkColor = 'accent' | 'success' | 'warning' | 'danger'

const SOFT_MARKS: Partial<Record<ReportVariant, MarkColor>> = {
  secondary: 'accent',
  'success-soft': 'success',
  'warning-soft': 'warning',
  'danger-soft': 'danger',
}

/**
 * The colour a mark beside the text takes — a `Chip`'s dot, an `Alert`'s icon square —
 * when the fill is a soft slice: the full colour, which says what the pale fill stands
 * for. `undefined` elsewhere, where the mark is the ink.
 */
export function softMarkOf(variant: string): MarkColor | undefined {
  return SOFT_MARKS[variant as ReportVariant]
}

/** How a mark is drawn: a square of colour, or the ink's line around the glyph. */
export type MarkDrawing = 'fill' | 'line'

const SOLID: ReadonlySet<string> = new Set([
  'primary',
  'success',
  'warning',
  'danger',
])

/**
 * An `Alert`'s icon square on its ground. Where the alert is itself a full colour — a
 * solid name, or `default` given a tint, which fills it — a square of colour would
 * vanish into it: the mark becomes the ink's line. Everywhere else it is a fill.
 */
export function markDrawing(variant: string, isTinted: boolean): MarkDrawing {
  if (SOLID.has(variant)) return 'line'
  return variant === 'default' && isTinted ? 'line' : 'fill'
}

/**
 * The text on a soft slice of a named accent — the `Avatar`'s `flat` ink, which holds
 * 4.5:1 where the tint's own soft foreground may not. `undefined` for a raw `color` (the
 * caller's word, never corrected) and on every name that is not a soft slice.
 */
export function namedSoftInk(
  variant: string,
  accent: TramAccentName | undefined,
  color: string | undefined,
  ground: string
): string | undefined {
  if (!accent || color || !softMarkOf(variant)) return undefined
  return accentSoftInk(tramAccents[accent], ground)
}
