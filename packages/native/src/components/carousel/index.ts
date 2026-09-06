import { CarouselContent } from './carousel-content'
import { CarouselCounter } from './carousel-counter'
import { CarouselDot, CarouselIndicator } from './carousel-indicator'
import { CarouselItem } from './carousel-item'
import { CarouselNext, CarouselPrevious } from './carousel-control'
import { CarouselRoot } from './carousel'
import { CarouselThumbnail, CarouselThumbnails } from './carousel-thumbnails'

export const Carousel = Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicator: CarouselIndicator,
  Dot: CarouselDot,
  Counter: CarouselCounter,
  Thumbnails: CarouselThumbnails,
  Thumbnail: CarouselThumbnail,
})

export { CarouselRoot } from './carousel'
export { CarouselContent } from './carousel-content'
export { CarouselNext, CarouselPrevious } from './carousel-control'
export { CarouselCounter } from './carousel-counter'
export { CarouselDot, CarouselIndicator } from './carousel-indicator'
export { CarouselItem } from './carousel-item'
export { CarouselThumbnail, CarouselThumbnails } from './carousel-thumbnails'
export { useCarousel } from './carousel.context'
export { carouselRecipe } from './carousel.recipe'
export type {
  CarouselContextValue,
  CarouselControlProps,
  CarouselDotProps,
  CarouselProps,
  CarouselSize,
  CarouselSlot,
  CarouselTextSlotProps,
  CarouselThumbnailProps,
  CarouselVariant,
  CarouselViewSlotProps,
} from './carousel.type'
