import { RatingIcon } from './rating-icon'
import { RatingItem } from './rating-item'
import { RatingRoot } from './rating'

export const Rating = Object.assign(RatingRoot, {
  Item: RatingItem,
  Icon: RatingIcon,
})

export { RatingRoot } from './rating'
export { RatingIcon } from './rating-icon'
export { RatingItem } from './rating-item'
export { useRating, useRatingLayer } from './rating.context'
export { ratingRecipe } from './rating.recipe'
export type {
  RatingContextValue,
  RatingIconProps,
  RatingItemProps,
  RatingLayerContextValue,
  RatingProps,
  RatingSize,
  RatingSlot,
  RatingTone,
  RatingVariant,
} from './rating.type'

/**
 * The two pure halves of a mark, named for the root entrypoint they reach: how full a mark
 * is for a value, and the value a press at a fraction of the row means. `@xaui/tram` reads
 * them instead of restating them.
 */
export { fillFor as ratingFill, snapValue as snapRating } from './rating.utils'
export type { SnapOptions as SnapRatingOptions } from './rating.utils'
