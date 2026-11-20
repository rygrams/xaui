import { createSlotContext } from '@xaui/native/system'
import type { CarouselContextValue } from './carousel.type'

/**
 * `useCarousel` is exported so a third party can write its own control — an indicator of
 * its own, a caption that follows the slide — against the styles, the metrics and the
 * live offset the built-in ones read. Outside a `<Carousel>` it throws by name.
 */
export const [CarouselProvider, useCarousel] =
  createSlotContext<CarouselContextValue>('Tram.Carousel')
