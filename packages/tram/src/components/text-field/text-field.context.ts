import { createSlotContext } from '@xaui/native/system'
import type { TextFieldContextValue } from './text-field.type'

/**
 * `useTextField` is exported so a third party can write its own slot against the values
 * the built-in ones read. Outside a `<TextField>` it throws by name.
 */
export const [TextFieldProvider, useTextField] =
  createSlotContext<TextFieldContextValue>('Tram.TextField')
