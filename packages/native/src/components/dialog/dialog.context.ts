import { createSlotContext } from '../../system/slot'
import type { DialogContextValue } from './dialog.type'

/**
 * R10 — `useDialog` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Dialog>` it throws by name.
 */
export const [DialogProvider, useDialog] =
  createSlotContext<DialogContextValue>('Dialog')
