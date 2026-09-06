import { createSlotContext } from '../../system/slot'
import type { FabContextValue } from './fab.type'

/** R10 — the resolved styles and the two states, for a slot of your own inside it. */
export const [FabProvider, useFab] = createSlotContext<FabContextValue>('Fab')
