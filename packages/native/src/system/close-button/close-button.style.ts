import { StyleSheet } from 'react-native'

/**
 * The two bars of the built-in cross, a quarter turn apart. Pure geometry with no token
 * in it, which is why it is here and not in a recipe — the bar's length, thickness and
 * colour all come from the component that hosts the button.
 */
export const closeButtonSheet = StyleSheet.create({
  bar: { transform: [{ rotate: '45deg' }] },
  barMirrored: { transform: [{ rotate: '-45deg' }] },
})
