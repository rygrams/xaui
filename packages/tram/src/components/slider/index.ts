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

export { useSlider } from './slider.context'
export { sliderRecipe } from './slider.recipe'
export type {
  SliderContextValue,
  SliderFillProps,
  SliderOrientation,
  SliderOutputProps,
  SliderProps,
  SliderSize,
  SliderSlot,
  SliderThumbProps,
  SliderTrackProps,
  SliderValue,
} from './slider.type'
