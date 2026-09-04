import { createSlotContext } from '../../system/slot'
import type { SwitchContextValue } from './switch.type'

/**
 * R10 — `useSwitch` is exported so a third party can write its own slot (a glyph at each
 * end of the track, a label that changes with the state) against the same resolved values
 * the built-in ones read. Outside a `<Switch>` it throws by name rather than failing three
 * frames later on an undefined style.
 */
export const [SwitchProvider, useSwitch] =
  createSlotContext<SwitchContextValue>('Switch')
