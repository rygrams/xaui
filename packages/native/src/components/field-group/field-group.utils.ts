import type { ViewStyle } from 'react-native'

/**
 * The room a decorator asks the field to leave it, from the width it measured.
 *
 * `start` and `end`, never `left` and `right` (R13): the prefix is the leading edge in
 * both directions of writing, and RTL mirrors the logical property and only it.
 *
 * It returns `undefined` rather than an object of two `undefined`s when there is nothing
 * to clear, so a group with no decorator adds no entry to the field's style array — and
 * the `useMemo` around it keeps the same reference until a width actually changes.
 */
export function decoratorPadding(
  prefixWidth: number,
  suffixWidth: number
): ViewStyle | undefined {
  const paddingStart = prefixWidth > 0 ? prefixWidth : undefined
  const paddingEnd = suffixWidth > 0 ? suffixWidth : undefined

  if (paddingStart === undefined && paddingEnd === undefined) return undefined

  return { paddingStart, paddingEnd }
}
