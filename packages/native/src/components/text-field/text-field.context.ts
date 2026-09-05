import { createSlotContext } from '../../system/slot'
import type { TextFieldContextValue } from './text-field.type'

/**
 * R10 — `useTextField` is exported so a third party can write its own slot
 * (`<TextField.Counter>`, `<TextField.Adornment>`) against the same resolved values the built-in
 * ones read, without forking the library. Outside a `<TextField>` it throws by name rather
 * than failing three frames later on an undefined style.
 */
export const [TextFieldProvider, useTextField] =
  createSlotContext<TextFieldContextValue>('TextField')
