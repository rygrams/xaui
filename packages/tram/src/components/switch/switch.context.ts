import { createSlotContext } from '@xaui/native/system'
import type { SwitchContextValue } from './switch.type'

/**
 * `useSwitch` is exported so a third party can write its own slot — a glyph at each end of
 * the track, a caption that changes with the state — against the values the built-in ones
 * read. Outside a `<Switch>` it throws by name.
 */
export const [SwitchProvider, useSwitch] =
  createSlotContext<SwitchContextValue>('Tram.Switch')
