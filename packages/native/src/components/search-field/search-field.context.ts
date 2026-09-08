import { createSlotContext } from '../../system/slot'
import type { SearchFieldContextValue } from './search-field.type'

/**
 * R10 — `useSearchField` is exported so a third party can write its own slot against the
 * query and the resolved styles the built-in ones read: a voice button beside the cross, a
 * result count inside the box. Outside a `<SearchField>` it throws by name.
 */
export const [SearchFieldProvider, useSearchField] =
  createSlotContext<SearchFieldContextValue>('SearchField')
