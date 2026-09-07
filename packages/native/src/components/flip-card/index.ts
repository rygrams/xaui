import { FlipCardBack, FlipCardFront } from './flip-card-face'
import { FlipCardRoot } from './flip-card'

export const FlipCard = Object.assign(FlipCardRoot, {
  Front: FlipCardFront,
  Back: FlipCardBack,
})

export { FlipCardRoot } from './flip-card'
export { FlipCardBack, FlipCardFront } from './flip-card-face'
export { useFlipCard } from './flip-card.context'
export { FLIP_SPRING } from './flip-card.animation'
export type {
  FlipCardContextValue,
  FlipCardDirection,
  FlipCardFaceProps,
  FlipCardProps,
  FlipSpring,
} from './flip-card.type'
export type { FlipRotation } from '../../utils/flip'
