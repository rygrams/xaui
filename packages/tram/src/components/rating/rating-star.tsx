import { Text } from 'react-native'
import { useRating, useRatingLayer } from './rating.context'

/**
 * The mark a `Rating` draws when the caller composes nothing: `★` in both layers, the
 * faint one and the given one — never a hollow `☆`, which Android's system face does not
 * have. A character, so the package needs no `react-native-svg` for the one glyph it draws
 * itself; `Rating.Icon` replaces it with anything.
 *
 * Internal: the two layers are the `Rating.Item`'s arrangement.
 */
export function RatingStar() {
  const { glyphStyle, glyphFillStyle } = useRating()
  const { tone } = useRatingLayer()

  return (
    <Text
      accessible={false}
      // The mark is drawn at its own size: a larger system text would push it out of the row.
      allowFontScaling={false}
      style={tone === 'fill' ? glyphFillStyle : glyphStyle}
    >
      {'★'}
    </Text>
  )
}

RatingStar.displayName = 'XAUI.Tram.Rating.Star'
