import { createSlotContext } from '../../system/slot'
import type { DateTimePickerContextValue } from './date-time-picker.type'

/** R10 — the field's resolved styles, the moment, and the step the sheet is on. */
export const [DateTimePickerProvider, useDateTimePicker] =
  createSlotContext<DateTimePickerContextValue>('DateTimePicker')
