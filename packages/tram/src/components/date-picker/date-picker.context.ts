import { createSlotContext } from '@xaui/native/system'
import type { DatePickerContextValue } from './date-picker.type'

/** The picker's own options, for its wheel. Outside a `<DatePicker>` it throws by name. */
export const [DatePickerProvider, useDatePicker] =
  createSlotContext<DatePickerContextValue>('Tram.DatePicker')
