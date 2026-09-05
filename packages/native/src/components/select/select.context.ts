import { createSlotContext } from '../../system/slot'
import type { SelectContextValue, SelectItemContextValue } from './select.type'

/**
 * R10 — `useSelect` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Select>` it throws by name.
 */
export const [SelectProvider, useSelect] =
  createSlotContext<SelectContextValue>('Select')

/**
 * One row's own state. It carries **only** what the row knows and the list cannot:
 * whether it is the chosen one and whether a finger is on it. Everything visual comes
 * from `useSelect()`, because a row's styles were resolved on the root.
 */
export const [SelectItemProvider, useSelectItem] =
  createSlotContext<SelectItemContextValue>('Select.Item')
