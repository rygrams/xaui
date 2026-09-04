import { StyleSheet } from 'react-native'

/**
 * The built-in check: two borders of an otherwise empty box, a quarter turn from where
 * they look like a tick. Pure geometry with no token in it, which is why it is here and
 * not in the recipe — the strokes' length, thickness and colour are all the recipe's.
 *
 * **It mirrors under RTL**, because `borderStartWidth` is a logical edge and R13 leaves no
 * other kind. A check reads as a check either way; a `left` in `src/` would not be worth
 * the one glyph it fixed.
 */
export const checkboxSheet = StyleSheet.create({
  check: { transform: [{ rotate: '-45deg' }] },
})
