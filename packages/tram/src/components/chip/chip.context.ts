import { createSlotContext } from '@xaui/native/system'
import type { ChipContextValue } from './chip.type'

/**
 * `useChip` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Chip>` it throws by name.
 */
export const [ChipProvider, useChip] =
  createSlotContext<ChipContextValue>('Tram.Chip')
