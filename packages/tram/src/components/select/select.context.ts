import { createSlotContext } from '@xaui/native/system'
import type { SelectContextValue, SelectItemContextValue } from './select.type'

/**
 * `useSelect` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Select>` it throws by name.
 */
export const [SelectProvider, useSelect] =
  createSlotContext<SelectContextValue>('Tram.Select')

/** One item's own state: whether it is the chosen one, and whether a finger is on it. */
export const [SelectItemProvider, useSelectItem] =
  createSlotContext<SelectItemContextValue>('Tram.Select.Item')
