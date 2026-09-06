import { createSlotContext } from '../../system/slot'
import type { DateTimeFieldContextValue } from './date-time-field.type'

/** R10 — the masked text, the keystroke handler and the period. */
export const [DateTimeFieldProvider, useDateTimeField] =
  createSlotContext<DateTimeFieldContextValue>('DateTimeField')
