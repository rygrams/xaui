import { createSlotContext } from '@xaui/native/system'
import type { RadioContextValue } from './radio.type'

/**
 * `useRadio` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Radio>` it throws by name.
 */
export const [RadioProvider, useRadio] =
  createSlotContext<RadioContextValue>('Tram.Radio')
