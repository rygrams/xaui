import { StyleSheet } from 'react-native'

/**
 * The one style on this component that depends on no token and no variant: an image told
 * to fill the layer it was given. Everything else is in the recipe.
 */
export const cardSheet = StyleSheet.create({
  backgroundImage: { width: '100%', height: '100%' },
})
