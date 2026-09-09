import { Text } from 'react-native'
import { useRating, useRatingLayer } from './rating.context'

/**
 * The mark a `Rating` draws when the caller composes nothing.
 *
 * **`★` in both layers**, one in the neutral ground and one in the filled colour — never a
 * hollow `☆` under a solid one. Two reasons, and the second is the load-bearing one: a solid
 * pair is what every store's rating looks like, and `☆` (U+2606) is not in Android's system
 * face, so the empty half of the row would render as a box on the platform where most of it
 * is read. `★` (U+2605) is present on both.
 *
 * A character rather than an SVG, so the component needs no `react-native-svg` for the one
 * glyph it draws itself. `Rating.Icon` replaces it with anything.
 *
 * **Internal** — the two layers are the `Rating.Item`'s arrangement, and a caller reaching
 * for this directly would be reaching past the thing that positions it.
 */
export function RatingStar() {
  const { glyphStyle, glyphFillStyle, markSize } = useRating()
  const { tone } = useRatingLayer()

  return (
    <Text
      // The width is the mark's, on the node *inside* the clip: without it the glyph would
      // shrink to the clip and re-wrap instead of being cut part-way through.
      style={[tone === 'fill' ? glyphFillStyle : glyphStyle, { width: markSize }]}
    >
      {'★'}
    </Text>
  )
}

RatingStar.displayName = 'XAUI.Rating.Star'
