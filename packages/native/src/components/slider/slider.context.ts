import { createSlotContext } from '../../system/slot'
import type { SliderContextValue } from './slider.type'

/**
 * R10 — `useSlider` is exported so a third party can write its own slot (a tick scale, a
 * second thumb) against the same resolved values the built-in ones read. Outside a
 * `<Slider>` it throws by name.
 */
export const [SliderProvider, useSlider] =
  createSlotContext<SliderContextValue>('Slider')
