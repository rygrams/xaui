import { SliderFill } from './slider-fill'
import { SliderOutput } from './slider-output'
import { SliderThumb } from './slider-thumb'
import { SliderTrack } from './slider-track'
import { SliderRoot } from './slider'

export const Slider = Object.assign(SliderRoot, {
  Output: SliderOutput,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
})

export { SliderRoot } from './slider'
export { SliderFill } from './slider-fill'
export { SliderOutput } from './slider-output'
export { SliderThumb } from './slider-thumb'
export { SliderTrack } from './slider-track'
export { useSlider } from './slider.context'
export { sliderRecipe } from './slider.recipe'
export { fromFraction, snap, toFraction } from './slider.utils'
export type {
  SliderContextValue,
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderSize,
  SliderSlot,
  SliderThumbProps,
  SliderTrackProps,
  SliderValue,
} from './slider.type'
