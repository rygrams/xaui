import { createSlotContext } from '../../system/slot'
import type { TextAreaContextValue } from './text-area.type'

/**
 * R10 — `useTextArea` is exported so a third party can write their own field against the
 * same values the built-in one reads. It carries **only** what the `Input`'s own context
 * cannot: the two row counts. Everything visual comes from `useInput()`, because a text
 * area is an `Input` and its styles were resolved there.
 */
export const [TextAreaProvider, useTextArea] =
  createSlotContext<TextAreaContextValue>('TextArea')
