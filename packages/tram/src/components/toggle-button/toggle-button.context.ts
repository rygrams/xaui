import { createSlotContext } from '@xaui/native/system'
import type { ToggleButtonContextValue } from './toggle-button.type'

/**
 * `useToggleButton` is exported so a third party can write its own slot against the
 * values the built-in ones read. Outside a `<ToggleButton>` it throws by name.
 */
export const [ToggleButtonProvider, useToggleButton] =
  createSlotContext<ToggleButtonContextValue>('Tram.ToggleButton')
