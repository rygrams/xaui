import { createSlotContext } from '../../system/slot'
import type { CarouselContextValue } from './carousel.type'

/**
 * R10 — the resolved styles, the metrics and the live offset.
 *
 * A control of your own is written against this: the offset is a shared value, so an
 * indicator that follows the drag frame by frame is `useAnimatedStyle` over it rather than
 * state that re-renders the row seventy times a second.
 */
export const [CarouselProvider, useCarousel] =
  createSlotContext<CarouselContextValue>('Carousel')
