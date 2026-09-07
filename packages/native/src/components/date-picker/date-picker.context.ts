import { createSlotContext } from '../../system/slot'
import type { DatePickerContextValue } from './date-picker.type'

/**
 * R10 — the resolved styles, the chosen day, how the field reads it, and the four moves.
 * Outside a `<DatePicker>` it throws by name.
 */
export const [DatePickerProvider, useDatePicker] =
  createSlotContext<DatePickerContextValue>('DatePicker')
