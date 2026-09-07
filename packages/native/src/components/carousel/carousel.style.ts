import { I18nManager, StyleSheet } from 'react-native'

/**
 * The built-in chevrons: a square with two of its edges drawn, turned so the corner it kept
 * becomes the point.
 *
 * Pure geometry with no token in it, which is why it is here and not in the recipe — the
 * box, the stroke and the colour all come from there.
 *
 * **The two differ by which edges are drawn, not by the rotation.** The corner of a top-and-
 * end pair points up-and-forward, and a quarter turn takes it to forward; the corner of a
 * bottom-and-start pair points down-and-back, and *the same* quarter turn takes it to back.
 * Turning one of them the other way instead would point it at the sky, which is the bug this
 * comment exists to stop someone reintroducing.
 *
 * **It reads `I18nManager` by hand**, which the `Switch`'s thumb is the only other place in
 * the library to do. The reason is the same: the drawn edges are mirrored by a right-to-left
 * layout and a `transform` is not, so the turn has to be flipped here to match them.
 */
const QUARTER = I18nManager.isRTL ? '-45deg' : '45deg'

export const carouselSheet = StyleSheet.create({
  /** Towards the end of the series — pointing right in a left-to-right layout. */
  chevronForward: {
    borderStartWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: QUARTER }],
  },
  /** And back the other way. */
  chevronBack: {
    borderEndWidth: 0,
    borderTopWidth: 0,
    transform: [{ rotate: QUARTER }],
  },
})
