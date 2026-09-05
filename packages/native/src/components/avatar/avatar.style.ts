import { StyleSheet } from 'react-native'

/**
 * The one style on this component that depends on no token and no variant, so it is here
 * rather than in the recipe: the image layer is a position, and a position has no theme.
 *
 * R13 — `start` and `end`, never `left` and `right`, even at zero.
 */
export const avatarSheet = StyleSheet.create({
  image: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
})
