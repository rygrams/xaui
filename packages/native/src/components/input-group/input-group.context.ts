import { createSlotContext } from '../../system/slot'
import type { InputGroupContextValue } from './input-group.type'

/**
 * R10 — `useInputGroup` is exported so a third party can write its own decorator against
 * the same measurement the built-in two report into. It carries **only** what the
 * `Input`'s own context cannot: the two measured widths. Everything visual comes from
 * `useInput()`, because a group is an `Input`'s field and its styles were resolved there.
 */
export const [InputGroupProvider, useInputGroup] =
  createSlotContext<InputGroupContextValue>('InputGroup')
