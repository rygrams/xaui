import { Platform, StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * A browser draws its focus ring whatever the outline's width: only `none` removes it, and
 * `none` is the browser's word, not React Native's — so it is written for the web alone.
 */
const NO_RING = (Platform.OS === 'web' ? { outlineStyle: 'none' } : {}) as ViewStyle

/** What does not depend on the theme: the layout of the circle's layers and of the pair. */
export const fabSheet = StyleSheet.create({
  /**
   * The App Bar: a band across the bottom of the positioned ancestor, edge to edge, that
   * takes the touches that land on it rather than letting them through to the page.
   */
  bar: { position: 'absolute', bottom: 0, start: 0, end: 0, pointerEvents: 'auto' },
  /**
   * The same band once it has left: nothing in it takes a touch. `auto` is written out
   * above, so that coming back undoes this one where styles are applied inline.
   */
  gone: { position: 'absolute', bottom: 0, start: 0, end: 0, pointerEvents: 'none' },
  /** The circle and the label under it, in a column the label never widens. */
  column: { alignItems: 'center' },
  /**
   * An exact circle: no outline and no ring from the platform, on touch or on focus — a
   * ring is a second shape around the one Tram draws.
   */
  bare: { outlineWidth: 0, overflow: 'hidden', ...NO_RING },
  /** The circle's fill and line, faded from one paint to the next. */
  fill: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
  /** One thing, in the middle: the glyph, or the ring that takes its place. */
  layer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Room for the label under the circle, opened and closed by the root. */
  shelf: { alignItems: 'center' },
  /** Out of the flow, so its width is its own and the shelf's stays the circle's. */
  label: { position: 'absolute', top: 0 },
})
