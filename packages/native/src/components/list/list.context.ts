import { createSlotContext } from '../../system/slot'
import type { ListContextValue } from './list.type'

/**
 * R10 — `useList` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<List>` it throws by name.
 *
 * There is no second context for the row. An `Accordion.Item` has one because its trigger
 * has to read whether the panel is open; a list row holds nothing a slot inside it cannot
 * be handed directly, and a context added before something reads it is plumbing.
 */
export const [ListProvider, useList] = createSlotContext<ListContextValue>('List')
