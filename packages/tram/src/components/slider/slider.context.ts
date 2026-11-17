import { createSlotContext } from '@xaui/native/system'
import type { SliderContextValue } from './slider.type'

/**
 * `useSlider` is exported so a third party can write its own slot — a scale of ticks
 * under the track, a bubble over the thumb — against the values the built-in ones read.
 * Outside a `<Slider>` it throws by name.
 */
export const [SliderProvider, useSlider] =
  createSlotContext<SliderContextValue>('Tram.Slider')
