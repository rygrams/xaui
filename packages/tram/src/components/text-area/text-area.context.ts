import { createSlotContext } from '@xaui/native/system'
import type { TextAreaContextValue } from './text-area.type'

/**
 * `useTextArea` is exported so a third party can write its own field against the values
 * the built-in one reads. It carries only the two row counts: everything visual comes
 * from `useTextField()`, because a text area is a `TextField`.
 */
export const [TextAreaProvider, useTextArea] =
  createSlotContext<TextAreaContextValue>('Tram.TextArea')
