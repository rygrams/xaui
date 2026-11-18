import type { TextStyle } from 'react-native'

/**
 * A length a recipe wrote, as a number. `DimensionValue` also covers a percentage and
 * `auto`: a recipe only writes points, and anything else counts for nothing.
 */
export function pointsOf(value: unknown): number {
  return typeof value === 'number' ? value : 0
}

/**
 * A colour a recipe wrote, as a string — or `undefined`. `ColorValue` also covers the
 * platform's opaque colours, which cannot be mixed in a worklet.
 */
export function colorOf(
  style: TextStyle,
  key: 'color' | 'borderColor'
): string | undefined {
  const value = style[key]

  return typeof value === 'string' ? value : undefined
}
