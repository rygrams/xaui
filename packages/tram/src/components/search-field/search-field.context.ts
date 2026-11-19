import { createSlotContext } from '@xaui/native/system'
import type { SearchFieldContextValue } from './search-field.type'

/**
 * `useSearchField` is exported so a third party can write its own slot against the query
 * and the resolved styles the built-in ones read: a voice button beside the cross, a count
 * inside the box. Outside a `<SearchField>` it throws by name.
 */
export const [SearchFieldProvider, useSearchField] =
  createSlotContext<SearchFieldContextValue>('Tram.SearchField')
