import { createSlotContext } from '../../system/slot'
import type { SlideButtonContextValue } from './slide-button.type'

/**
 * R10 — `useSlideButton` is exported so a third party can write its own slot (a second
 * mark, a progress readout) against the same resolved styles and the same shared offset
 * the built-in ones read. Outside a `<SlideButton>` it throws by name.
 */
export const [SlideButtonProvider, useSlideButton] =
  createSlotContext<SlideButtonContextValue>('SlideButton')
