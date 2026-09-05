import { createSlotContext } from '../../system/slot'
import type { InputContextValue } from './input.type'

/**
 * R10 — `useInput` is exported so a third party can write its own slot
 * (`<Input.Counter>`, `<Input.Adornment>`) against the same resolved values the built-in
 * ones read, without forking the library. Outside an `<Input>` it throws by name rather
 * than failing three frames later on an undefined style.
 */
export const [InputProvider, useInput] =
  createSlotContext<InputContextValue>('Input')
