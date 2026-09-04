import { createSlotContext } from '../../system/slot'
import type { ChipContextValue } from './chip.type'

/**
 * R10 — `useChip` is exported so a third party can write its own slot (`<Chip.Count>`)
 * against the same resolved values the built-in ones read, without forking the library.
 * Outside a `<Chip>` it throws by name rather than failing three frames later on an
 * undefined style.
 */
export const [ChipProvider, useChip] = createSlotContext<ChipContextValue>('Chip')
