import { StyleSheet } from 'react-native'

/**
 * The clip the filled layer is drawn inside.
 *
 * **No token in it**, which is why it is here rather than in the recipe: this is geometry.
 * The layer is pinned to the mark's leading edge and its width is the fraction that is
 * filled, so `overflow: 'hidden'` cuts the glyph part-way through and a value of 4.3 shows
 * three tenths of the fifth mark.
 *
 * `start` and `top` rather than `left` (R13): a right-to-left layout fills from the other
 * edge, and the logical key is what makes that happen with no second branch.
 *
 * The glyph inside it must **not** be allowed to shrink to the clip's width, or the
 * character would re-wrap instead of being cut — which is what the mark's own width on the
 * inner node is for.
 */
export const ratingSheet = StyleSheet.create({
  clip: { position: 'absolute', top: 0, start: 0, bottom: 0, overflow: 'hidden' },
})
