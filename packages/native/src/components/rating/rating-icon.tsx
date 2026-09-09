import { Icon } from '../../system/icon'
import { useRating, useRatingLayer } from './rating.context'
import type { RatingIconProps } from './rating.type'

/**
 * The mark, as a glyph of your own — a heart, a flame, a paw.
 *
 * Written **once** and drawn twice, because a mark is the same glyph in two layers: the
 * neutral ground, and the filled colour clipped to the fraction given. Which of the two this
 * instance is in comes from the layer rather than from a prop, so the caller never has to
 * keep two copies in step.
 *
 * An explicit `color` wins, as it does everywhere `Icon` appears — which is also how a
 * caller opts out of the two-layer colouring entirely.
 */
export function RatingIcon({ size, color, ...rest }: RatingIconProps) {
  const { icon, iconFill } = useRating()
  const { tone } = useRatingLayer()
  const resolved = tone === 'fill' ? iconFill : icon

  return (
    <Icon size={size ?? resolved.size} color={color ?? resolved.color} {...rest} />
  )
}

RatingIcon.displayName = 'XAUI.Rating.Icon'
