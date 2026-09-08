import { StyleSheet } from 'react-native'

/**
 * Pure geometry, with no token in it — which is why it is here and not in the recipe.
 *
 * The dash is a **shape**, not a colour: the chip's edge is the theme's `border` either
 * way, and only the way it is drawn says "nothing chosen yet". The two `flexShrink`s are
 * the same kind of thing — a dialog whose grid is taller than the screen has to give, and
 * a percentage or a measured height would be a number this component invented.
 */
export const colorPickerSheet = StyleSheet.create({
  previewEmpty: { borderStyle: 'dashed', backgroundColor: 'transparent' },
  panel: { flexShrink: 1 },
  grid: { flexShrink: 1 },
})
