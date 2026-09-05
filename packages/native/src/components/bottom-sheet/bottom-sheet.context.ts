import { createSlotContext } from '../../system/slot'
import type { BottomSheetContextValue } from './bottom-sheet.type'

/**
 * R10 — `useBottomSheet` is exported so a third party can write its own slot against the
 * same resolved values the built-in ones read. Outside a `<BottomSheet>` it throws by name.
 */
export const [BottomSheetProvider, useBottomSheet] =
  createSlotContext<BottomSheetContextValue>('BottomSheet')
