import { createSlotContext } from '../../system/slot'
import type { DateRangePickerContextValue } from './date-range-picker.type'

/** R10 — the field's resolved styles and the period. */
export const [DateRangePickerProvider, useDateRangePicker] =
  createSlotContext<DateRangePickerContextValue>('DateRangePicker')
