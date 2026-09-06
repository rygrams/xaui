import { StyleSheet } from 'react-native'

/**
 * The flip's geometry. **No token in it**, which is why this component has no recipe at all:
 * a `FlipCard` paints nothing — it turns two faces the caller supplied, and each of those is
 * usually a `Card`, which has its own.
 *
 * `backfaceVisibility: 'hidden'` is the whole mechanism: the two faces are a half turn apart
 * at every moment, so hiding the away-facing side leaves exactly one of them drawn.
 *
 * The back is **out of flow**, so the front decides how big the card is. A back in the flow
 * would stack under the front and double the height.
 */
export const flipCardSheet = StyleSheet.create({
  root: { position: 'relative' },
  face: { backfaceVisibility: 'hidden' },
  back: { ...StyleSheet.absoluteFillObject, backfaceVisibility: 'hidden' },
})

/**
 * How far the eye is from the card, in points.
 *
 * Without it a rotation is an affine squash and the card reads as a blind closing rather
 * than as a face turning away. A thousand is the value every platform's default lands near;
 * lower makes the turn more violent, and the perspective is the card's rather than a prop
 * because two cards on one screen at two depths look like a mistake.
 */
export const FLIP_PERSPECTIVE = 1000
