import { createSlotContext } from '@xaui/native/system'
import type { BottomSheetContextValue } from './bottom-sheet.type'

/**
 * `useBottomSheet` is exported so a third party can write its own slot against the values
 * the built-in ones read. Outside a `<BottomSheet>` it throws by name.
 */
export const [BottomSheetProvider, useBottomSheet] =
  createSlotContext<BottomSheetContextValue>('Tram.BottomSheet')
