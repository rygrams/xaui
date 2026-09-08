import type { ColorGroup, ColorPickerShade } from './color-picker.type'

/**
 * Eight steps of Tailwind's eleven, and the eight a picker is actually asked for.
 *
 * `50` is a white nobody picks off a white sheet and `900`/`950` are two blacks a swatch
 * cannot tell apart at this size. What is left is contiguous — no gap in the middle of a
 * ramp, so the row reads as one colour getting darker rather than as a selection of them.
 *
 * Eight is also what fits: a `md` cell is 32 points and the gutter is 4, so a row is 284
 * inside a dialog that leaves about 310, and the ramp stays on one line instead of
 * wrapping halfway through itself.
 */
const SHADES = ['100', '200', '300', '400', '500', '600', '700', '800'] as const

/** One hue's ramp, written as the eight values in `SHADES` order. */
function ramp(name: string, values: readonly string[]): ColorGroup {
  return {
    name,
    swatches: SHADES.map((shade, index) => ({
      shade: shade as ColorPickerShade,
      value: values[index],
    })),
  }
}

/**
 * The Tailwind palette — the seventeen hues, plus Zinc.
 *
 * Zinc rather than all five of Tailwind's greys: a picker offering slate, gray, zinc,
 * neutral and stone side by side is five ramps a reader cannot tell apart, and Zinc is the
 * one the library's own tokens are cut from — `#e4e4e7` is `default`, `#71717a` is
 * `fieldPlaceholder`, `#18181b` is `foreground`. A grey chosen here matches the theme
 * around it.
 *
 * It is **data, not a derivation**. The library has an OKLab engine and `chartPalette`
 * walks a ramp with it, but a picker's swatches are named colours a designer hands over —
 * "violet-600", not "the sixth step of a hue" — and a generated ramp that lands two points
 * off `#7c3aed` is a palette nobody can match to their own design.
 *
 * Pass `colors` on the root to replace it, in whole or in part.
 */
export const TAILWIND_PALETTE: readonly ColorGroup[] = [
  ramp('Red', [
    '#fee2e2',
    '#fecaca',
    '#fca5a5',
    '#f87171',
    '#ef4444',
    '#dc2626',
    '#b91c1c',
    '#991b1b',
  ]),
  ramp('Orange', [
    '#ffedd5',
    '#fed7aa',
    '#fdba74',
    '#fb923c',
    '#f97316',
    '#ea580c',
    '#c2410c',
    '#9a3412',
  ]),
  ramp('Amber', [
    '#fef3c7',
    '#fde68a',
    '#fcd34d',
    '#fbbf24',
    '#f59e0b',
    '#d97706',
    '#b45309',
    '#92400e',
  ]),
  ramp('Yellow', [
    '#fef9c3',
    '#fef08a',
    '#fde047',
    '#facc15',
    '#eab308',
    '#ca8a04',
    '#a16207',
    '#854d0e',
  ]),
  ramp('Lime', [
    '#ecfccb',
    '#d9f99d',
    '#bef264',
    '#a3e635',
    '#84cc16',
    '#65a30d',
    '#4d7c0f',
    '#3f6212',
  ]),
  ramp('Green', [
    '#dcfce7',
    '#bbf7d0',
    '#86efac',
    '#4ade80',
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
  ]),
  ramp('Emerald', [
    '#d1fae5',
    '#a7f3d0',
    '#6ee7b7',
    '#34d399',
    '#10b981',
    '#059669',
    '#047857',
    '#065f46',
  ]),
  ramp('Teal', [
    '#ccfbf1',
    '#99f6e4',
    '#5eead4',
    '#2dd4bf',
    '#14b8a6',
    '#0d9488',
    '#0f766e',
    '#115e59',
  ]),
  ramp('Cyan', [
    '#cffafe',
    '#a5f3fc',
    '#67e8f9',
    '#22d3ee',
    '#06b6d4',
    '#0891b2',
    '#0e7490',
    '#155e75',
  ]),
  ramp('Sky', [
    '#e0f2fe',
    '#bae6fd',
    '#7dd3fc',
    '#38bdf8',
    '#0ea5e9',
    '#0284c7',
    '#0369a1',
    '#075985',
  ]),
  ramp('Blue', [
    '#dbeafe',
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#2563eb',
    '#1d4ed8',
    '#1e40af',
  ]),
  ramp('Indigo', [
    '#e0e7ff',
    '#c7d2fe',
    '#a5b4fc',
    '#818cf8',
    '#6366f1',
    '#4f46e5',
    '#4338ca',
    '#3730a3',
  ]),
  ramp('Violet', [
    '#ede9fe',
    '#ddd6fe',
    '#c4b5fd',
    '#a78bfa',
    '#8b5cf6',
    '#7c3aed',
    '#6d28d9',
    '#5b21b6',
  ]),
  ramp('Purple', [
    '#f3e8ff',
    '#e9d5ff',
    '#d8b4fe',
    '#c084fc',
    '#a855f7',
    '#9333ea',
    '#7e22ce',
    '#6b21a8',
  ]),
  ramp('Fuchsia', [
    '#fae8ff',
    '#f5d0fe',
    '#f0abfc',
    '#e879f9',
    '#d946ef',
    '#c026d3',
    '#a21caf',
    '#86198f',
  ]),
  ramp('Pink', [
    '#fce7f3',
    '#fbcfe8',
    '#f9a8d4',
    '#f472b6',
    '#ec4899',
    '#db2777',
    '#be185d',
    '#9d174d',
  ]),
  ramp('Rose', [
    '#ffe4e6',
    '#fecdd3',
    '#fda4af',
    '#fb7185',
    '#f43f5e',
    '#e11d48',
    '#be123c',
    '#9f1239',
  ]),
  ramp('Zinc', [
    '#f4f4f5',
    '#e4e4e7',
    '#d4d4d8',
    '#a1a1aa',
    '#71717a',
    '#52525b',
    '#3f3f46',
    '#27272a',
  ]),
]
