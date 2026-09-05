import { createSlotContext } from '../../system/slot'
import type { RadioContextValue } from './radio.type'

/**
 * R10 — `useRadio` is exported so a third party can write its own slot (a description
 * under the label, a price beside it) against the same resolved values the built-in ones
 * read. Outside a `<Radio>` it throws by name rather than failing three frames later on an
 * undefined style.
 */
export const [RadioProvider, useRadio] =
  createSlotContext<RadioContextValue>('Radio')
