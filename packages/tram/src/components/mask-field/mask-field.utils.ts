import type { TextStyle, ViewStyle } from 'react-native'

/**
 * What is left of the shape once `text` is typed — the grey `YYYY` after `04/12/` — or
 * `''` when there is nothing to draw.
 *
 * `text` comes out of `maskInput`, so it always ends on a written character and its
 * length is the number of shape characters already covered: the rest is the shape from
 * there on. That holds only when the shape is exactly as wide as the mask — one label
 * character per typed character. A shape that is not (`{ year: 'année' }` over four
 * digits, a `placeholder` of the caller's own) would slide under the text, so it is not
 * drawn at all. An empty box draws nothing either: the input's own placeholder is the
 * whole shape already.
 */
export function maskRest(text: string, shape: string, length: number): string {
  if (text === '' || text.length >= length || shape.length !== length) return ''

  return shape.slice(text.length)
}

/**
 * Whether the typed text starts at the box's start edge — the only place the rest of the
 * shape can be laid after it. A centred or end-aligned field moves its text with every
 * keystroke, and the shape behind it would have to be measured to follow.
 */
export function isStartAligned(style: TextStyle | undefined): boolean {
  const align = style?.textAlign

  return align === undefined || align === 'auto'
}

/** The keys that place a box among its neighbours, rather than draw it. */
const PLACEMENT_KEYS = new Set<string>([
  'margin',
  'marginVertical',
  'marginHorizontal',
  'marginTop',
  'marginBottom',
  'marginStart',
  'marginEnd',
  'marginLeft',
  'marginRight',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'width',
  'minWidth',
  'maxWidth',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
  'position',
  'top',
  'bottom',
  'start',
  'end',
  'left',
  'right',
  'inset',
  'insetBlock',
  'insetInline',
  'zIndex',
  'transform',
  'opacity',
])

/**
 * One flattened field style, cut in two: what places the field — its margins, its width,
 * its flex — and what draws it.
 *
 * The masked field is the input and, over it, the rest of the shape: two nodes that must
 * cover the same rectangle. So what places the field goes on the `View` holding both, and
 * the input fills it; the input keeps only its drawing — the line, the fill, the padding,
 * the type — which the shape reads back to sit where the text does.
 */
export function splitPlacement(style: TextStyle | undefined): {
  outer: ViewStyle
  inner: TextStyle
} {
  const outer: Record<string, unknown> = {}
  const inner: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(style ?? {})) {
    if (value === undefined) continue
    if (PLACEMENT_KEYS.has(key)) outer[key] = value
    else inner[key] = value
  }

  return { outer: outer as ViewStyle, inner: inner as TextStyle }
}

/** A length in points, or nothing: a percentage cannot be laid over another box. */
function points(...values: unknown[]): number {
  for (const value of values) {
    if (typeof value === 'number') return value
  }
  return 0
}

/**
 * How far in from each edge of the box the typed text starts: the line, then the padding.
 *
 * The specific key wins over the general one, the way React Native resolves them —
 * `paddingStart` over `paddingHorizontal` over `padding`. `start` and `end`, never `left`
 * and `right`: the shape follows the text into a right-to-left layout.
 */
export function textInset(style: TextStyle | undefined): {
  paddingStart: number
  paddingEnd: number
  paddingTop: number
  paddingBottom: number
} {
  const s = style ?? {}

  return {
    paddingStart:
      points(s.borderStartWidth, s.borderWidth) +
      points(s.paddingStart, s.paddingHorizontal, s.padding),
    paddingEnd:
      points(s.borderEndWidth, s.borderWidth) +
      points(s.paddingEnd, s.paddingHorizontal, s.padding),
    paddingTop:
      points(s.borderTopWidth, s.borderWidth) +
      points(s.paddingTop, s.paddingVertical, s.padding),
    paddingBottom:
      points(s.borderBottomWidth, s.borderWidth) +
      points(s.paddingBottom, s.paddingVertical, s.padding),
  }
}

/**
 * The type the input sets its text in, so the shape behind it takes the same advance per
 * character. `lineHeight` is left out on purpose: the input has none on a single line
 * (iOS sinks the typed text under one), and the shape is centred the way the input
 * centres its text, by the font's own height.
 */
export function textFace(style: TextStyle | undefined): TextStyle {
  const s = style ?? {}
  const face: TextStyle = {}

  if (s.fontFamily !== undefined) face.fontFamily = s.fontFamily
  if (s.fontSize !== undefined) face.fontSize = s.fontSize
  if (s.fontStyle !== undefined) face.fontStyle = s.fontStyle
  if (s.fontWeight !== undefined) face.fontWeight = s.fontWeight
  if (s.fontVariant !== undefined) face.fontVariant = s.fontVariant
  if (s.letterSpacing !== undefined) face.letterSpacing = s.letterSpacing

  return face
}
