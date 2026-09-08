import { StyleSheet } from 'react-native'

/**
 * The stacking order inside the portal host, and nothing else — pure geometry with no
 * token in it, which is why it is here and not in a recipe.
 *
 * It cannot be left to mount order. `Fab.Discovery.Target` and `Fab.Discovery.Content`
 * each open a portal of their own, and which one lands on top would then depend on the
 * order the caller happened to write two slots in — a FAB under its own disc, from moving
 * one line. So the layers are numbered.
 *
 * **And `zIndex` alone is not enough on Android**, which draws a native Z from `elevation`
 * that a React `zIndex` does not outrank. The FAB carries the theme's `field` elevation at
 * rest, so the layer holding it has to carry more.
 */
const DISC = 0
const TARGET = 2

export const fabDiscoverySheet = StyleSheet.create({
  disc: { zIndex: DISC },
  target: { position: 'absolute', zIndex: TARGET, elevation: TARGET },
  /** The node left in the flow while the FAB is lifted: it holds the space, invisibly. */
  placeholder: { opacity: 0 },
})
