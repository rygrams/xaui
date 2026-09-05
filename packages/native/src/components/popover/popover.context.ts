import { createSlotContext } from '../../system/slot'
import type { PopoverContextValue } from './popover.type'

/**
 * R10 — `usePopover` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Popover>` it throws by name.
 */
export const [PopoverProvider, usePopover] =
  createSlotContext<PopoverContextValue>('Popover')
