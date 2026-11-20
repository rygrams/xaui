import { StyleSheet } from 'react-native'

/** The static styles the slots share. Nothing here depends on a token or a size. */
export const tableSheet = StyleSheet.create({
  /** A column with no width takes an equal share of what is left; its cells follow. */
  flexible: { flex: 1 },
  // A horizontal scroller sizes its content to what is in it, and a table narrower than
  // the root would stop short of its end. `flexGrow` gives the content the root's width
  // as a floor — a wider table still runs past it and scrolls.
  scrollContent: { flexGrow: 1 },
  /** The chevron turned up: the smallest value first. Down is descending. */
  ascending: { transform: [{ rotate: '180deg' }] },
})
