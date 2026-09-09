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
