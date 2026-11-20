import { Icon } from '@xaui/native/system'
import { useRating, useRatingLayer } from './rating.context'
import type { RatingIconProps } from './rating.type'

/**
 * The mark, as a glyph of your own — a heart, a flame. Written once and drawn in both
 * layers: the faint grey, and the given colour clipped to the fraction. An explicit
 * `color` wins, which is also how a caller opts out of the two colours.
 */
export function RatingIcon({ size, color, ...rest }: RatingIconProps) {
  const { icon, iconFill } = useRating()
  const { tone } = useRatingLayer()
  const resolved = tone === 'fill' ? iconFill : icon

  return (
    <Icon size={size ?? resolved.size} color={color ?? resolved.color} {...rest} />
  )
}

RatingIcon.displayName = 'XAUI.Tram.Rating.Icon'
