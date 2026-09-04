import { StyleSheet } from 'react-native'

/**
 * The two bars of the built-in cross, a quarter turn apart. Pure geometry with no token
 * in it, which is why it is here and not in the recipe — the bar's length, thickness and
 * colour all come from there.
 */
export const chipSheet = StyleSheet.create({
  crossBar: { transform: [{ rotate: '45deg' }] },
  crossBarMirrored: { transform: [{ rotate: '-45deg' }] },
  /** The avatar's image fills the circle its slot already sized. */
  avatarImage: { width: '100%', height: '100%' },
})
