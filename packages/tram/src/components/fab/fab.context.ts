import { createSlotContext } from '@xaui/native/system'
import type { FabContextValue } from './fab.type'

/**
 * `useFab` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Fab>` it throws by name.
 */
export const [FabProvider, useFab] = createSlotContext<FabContextValue>('Tram.Fab')
