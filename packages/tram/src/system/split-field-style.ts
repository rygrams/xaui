import type { TextStyle, ViewStyle } from 'react-native'

/**
 * The keys only text reads. The rest of a field's style — the line, the fill, the height,
 * the padding — is the box's, drawn by the `View` that holds what the field shows.
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
 * draws it round the input and its marks, and a dummy field round a value it only shows.
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
