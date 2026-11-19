import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { SearchFieldVariant } from './search-field.type'

/**
 * The keys only text reads. The rest of a field's style — the line, the fill, the height,
 * the padding — is the box's, drawn by the `View` that holds the magnifier, the input and
 * the cross.
 */
const TEXT_KEYS = new Set<string>([
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'fontVariant',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVertical',
  'textDecorationLine',
  'textDecorationStyle',
  'textDecorationColor',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'writingDirection',
  'includeFontPadding',
  'verticalAlign',
  'userSelect',
])

/**
 * One flattened field style, cut in two: what the typed text wears, and what the box
 * around it wears. The Tram `TextField` draws its line on the input itself; a search box
 * draws it round the input and its two marks.
 */
export function splitFieldStyle(style: TextStyle | undefined): {
  box: ViewStyle
  text: TextStyle
} {
  const box: Record<string, unknown> = {}
  const text: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(style ?? {})) {
    if (value === undefined) continue
    if (TEXT_KEYS.has(key)) text[key] = value
    else box[key] = value
  }

  return { box: box as ViewStyle, text: text as TextStyle }
}

/**
 * The colour of the box's line at rest. An invalid field keeps the `TextField`'s `danger`
 * line in both variants; otherwise `primary` draws it in `muted` and `secondary` in its
 * own fill — there, but not seen, so the focus has a line to move from.
 */
export function restLine({
  variant,
  isInvalid,
  invalidLine,
  muted,
  surface,
}: {
  variant: SearchFieldVariant
  isInvalid: boolean
  invalidLine: string
  muted: string
  surface: string
}): string {
  if (isInvalid) return invalidLine

  return variant === 'secondary' ? surface : muted
}

/** The magnifier inside a square of `side` points: a ring, and a handle off it at 45°. */
export type GlassGeometry = {
  /** The ring's diameter, its line included. */
  lens: number
  /** The handle's length, and where its unrotated bar sits in the square. */
  handle: { length: number; start: number; top: number }
}

const LENS_SHARE = 0.7
const HANDLE_SHARE = 0.4

/**
 * The ring takes the top-start of the square; the handle leaves it at the bottom-end, on
 * the diagonal. A bar is turned about its own centre, so its centre is placed on that
 * diagonal half a length past the ring's edge, and the bar is laid flat around it.
 */
export function glassGeometry(side: number, line: number): GlassGeometry {
  const lens = Math.round(side * LENS_SHARE)
  const length = Math.round(side * HANDLE_SHARE)
  const radius = lens / 2
  const along = radius + length / 2
  const centre = radius + along * Math.SQRT1_2

  return {
    lens,
    handle: {
      length,
      start: Math.round((centre - length / 2) * 10) / 10,
      top: Math.round((centre - line / 2) * 10) / 10,
    },
  }
}

/**
 * The marks given to `SearchField.Field`, sorted by where they go: an element of
 * `startType` before the input, everything else after it, each in the order written.
 */
export function splitByType(
  children: ReactNode,
  startType: unknown
): { start: ReactNode[]; end: ReactNode[] } {
  const start: ReactNode[] = []
  const end: ReactNode[] = []

  // `toArray` drops the empty children and keys the rest, so the two lists render as they are.
  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === startType) start.push(child)
    else end.push(child)
  }

  return { start, end }
}
