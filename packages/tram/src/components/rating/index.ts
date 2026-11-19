import { RatingRoot } from './rating'
import { RatingIcon } from './rating-icon'
import { RatingItem } from './rating-item'

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
} from './rating.type'
