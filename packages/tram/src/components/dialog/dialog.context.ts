import { createSlotContext } from '@xaui/native/system'
import type { DialogContextValue } from './dialog.type'

/**
 * `useDialog` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Dialog>` it throws by name.
 */
export const [DialogProvider, useDialog] =
  createSlotContext<DialogContextValue>('Tram.Dialog')
