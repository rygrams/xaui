import { StyleSheet } from 'react-native'

/**
 * The dialog's ceiling, as a share of the screen.
 *
 * Eighteen ramps are three screens tall, so without a ceiling the panel grows until it is
 * the screen and the dialog stops reading as one — a full-height sheet with a backdrop
 * behind it. Three quarters leaves the page visible at both ends, which is what says the
 * palette is a question rather than a place.
 */
const MAX_HEIGHT = '75%'

/**
 * Pure geometry, with no token in it — which is why it is here and not in the recipe.
 *
 * The dash is a **shape**, not a colour: the chip's edge is the theme's `border` either
 * way, and only the way it is drawn says "nothing chosen yet". The two `flexShrink`s are
 * the same kind of thing — a panel at its ceiling has to give so the grid inside it can
 * scroll, rather than both of them running off the screen.
 */
export const colorPickerSheet = StyleSheet.create({
  previewEmpty: { borderStyle: 'dashed', backgroundColor: 'transparent' },
  panel: { flexShrink: 1, maxHeight: MAX_HEIGHT },
  grid: { flexShrink: 1 },
})
