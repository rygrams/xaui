import { StyleSheet } from 'react-native'
import { NO_RING } from '../../system/no-ring'
import { MORE_BOX } from './app-bar.recipe'

/** What does not depend on the theme: where the band is docked, and how it folds. */
export const appBarSheet = StyleSheet.create({
  /**
   * The band across an edge of the positioned ancestor, edge to edge, taking the touches
   * that land on it rather than letting them through to the page.
   */
  band: { position: 'absolute', start: 0, end: 0, pointerEvents: 'auto' },
  /** The same band once it has left: nothing in it takes a touch. */
  gone: { position: 'absolute', start: 0, end: 0, pointerEvents: 'none' },
  top: { top: 0 },
  bottom: { bottom: 0 },
  /** The row of circles between two ends as wide as the "…", never shorter than it. */
  strip: { flexDirection: 'row', minHeight: MORE_BOX.height },
  /** An end of the strip: the "…", or the room it would take. */
  side: { width: MORE_BOX.width },
  /** The circles, centred between the two ends. */
  middle: { flex: 1 },
  /** The "…", at the top of its end. */
  more: { alignSelf: 'flex-start' },
  /** Room opened and closed by the root: what is in it is clipped while it opens. */
  fold: { overflow: 'hidden' },
  /**
   * What a fold holds: out of the flow, from the fold's top edge, so it keeps its own
   * height while the fold is short of it — the measure the fold opens to.
   */
  held: { position: 'absolute', top: 0, start: 0, end: 0 },
  /** A button: the circle, and the room for the label under it, never narrower than 48. */
  cell: { alignItems: 'center', flexShrink: 1, minWidth: 48 },
  /** An exact circle: no outline and no ring from the platform, on touch or on focus. */
  bare: { outlineWidth: 0, ...NO_RING },
  /** Room for the label under the circle, opened and closed with the bar. */
  shelf: { alignSelf: 'stretch' },
  /** Out of the flow, so the shelf's height is the root's to set. */
  label: { position: 'absolute', top: 0, start: 0, end: 0, pointerEvents: 'none' },
  reached: { pointerEvents: 'auto' },
  unreached: { pointerEvents: 'none' },
  /** The page under an open bar, dimmed, from edge to edge of the positioned ancestor. */
  scrim: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
})
