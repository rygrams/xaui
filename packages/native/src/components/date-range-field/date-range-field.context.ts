import { createSlotContext } from '../../system/slot'
import type { DateRangeFieldContextValue } from './date-range-field.type'

/** R10 — the masked text and the keystroke handler. */
export const [DateRangeFieldProvider, useDateRangeField] =
  createSlotContext<DateRangeFieldContextValue>('DateRangeField')
