import { I18nManager, StyleSheet } from 'react-native'
import { LINE } from './carousel.recipe'

/**
 * The built-in chevrons: a square with two of its edges drawn, turned an eighth so the
 * corner it kept becomes the point. Pure geometry — the box, the stroke and the colours
 * are the recipe's.
 *
 * The two differ by which edges are drawn, not by the turn: top-and-end turned a quarter
 * clockwise points forward, bottom-and-start turned the same way points back.
 *
 * **It reads `I18nManager` by hand**, as Native's does: the drawn edges are mirrored by a
 * right-to-left layout and a `transform` is not, so the turn — and the nudge — flip here
 * to match them. The nudge pulls the point back by a line's width: a chevron's mass sits
 * on its open side, and centred by its box it looks pushed toward where it points.
 */
const TURN = I18nManager.isRTL ? '-45deg' : '45deg'
const NUDGE = I18nManager.isRTL ? LINE : -LINE

export const carouselSheet = StyleSheet.create({
  /** Towards the end of the series. */
  chevronForward: {
    borderStartWidth: 0,
    borderBottomWidth: 0,
    transform: [{ translateX: NUDGE }, { rotate: TURN }],
  },
  /** And back the other way. */
  chevronBack: {
    borderEndWidth: 0,
    borderTopWidth: 0,
    transform: [{ translateX: -NUDGE }, { rotate: TURN }],
  },
})
