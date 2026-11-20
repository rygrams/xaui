import { createSlotContext } from '@xaui/native/system'
import type { SlideButtonContextValue } from './slide-button.type'

/**
 * `useSlideButton` is exported so a third party can write its own slot — a second mark, a
 * progress readout — against the styles and the shared offset the built-in ones read.
 * Outside a `<SlideButton>` it throws by name.
 */
export const [SlideButtonProvider, useSlideButton] =
  createSlotContext<SlideButtonContextValue>('Tram.SlideButton')
