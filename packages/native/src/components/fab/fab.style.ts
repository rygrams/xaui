import { StyleSheet } from 'react-native'

/**
 * The round FAB's own geometry — no token in it, which is why it is here and not in the
 * recipe.
 *
 * A fixed square with one mark in it wants no padding at all, and `overflow: hidden` is what
 * keeps the press feedback's ripple inside the circle rather than square at its corners.
 */
export const fabSheet = StyleSheet.create({
  round: { paddingHorizontal: 0, overflow: 'hidden' },
})
