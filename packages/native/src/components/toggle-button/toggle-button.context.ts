import { createSlotContext } from '../../system/slot'
import type { ToggleButtonContextValue } from './toggle-button.type'

/** R10 — third-party slots read the same resolved values as the built-in ones. */
export const [ToggleButtonProvider, useToggleButton] =
  createSlotContext<ToggleButtonContextValue>('ToggleButton')
