import { createSlotContext } from '@xaui/native/system'
import type { SwitchContextValue } from './switch.type'

/**
 * `useSwitch` is exported so a third party can write its own slot — a text that reads the
 * state, a glyph at each end of the track — against the values the built-in ones read.
 * Outside a `<Switch>` it throws by name.
 */
export const [SwitchProvider, useSwitch] =
  createSlotContext<SwitchContextValue>('Tram.Switch')
