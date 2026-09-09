import { createSlotContext } from '../../system/slot'
import type { PagerContextValue } from './pager.type'

/**
 * R10 — `usePager` is exported so a control beside the pager can drive it (`goTo`) or read
 * where it is, and so a caller can write their own indicator against the same live `offset`
 * the built-in dots read. Outside a `<Pager>` it throws by name.
 */
export const [PagerProvider, usePager] =
  createSlotContext<PagerContextValue>('Pager')
