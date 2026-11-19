import { StyleSheet } from 'react-native'

/**
 * What does not depend on the theme: the cross's two bars.
 *
 * Unlike the `Fab`'s and the `AppBar`'s circles, the browser's focus ring is kept: it is
 * drawn on keyboard focus only (`:focus-visible`), follows the circle, and is the one sign
 * a keyboard user has that the way out is selected.
 */
export const closeButtonSheet = StyleSheet.create({
  bar: { transform: [{ rotate: '45deg' }] },
  barMirrored: { transform: [{ rotate: '-45deg' }] },
})
