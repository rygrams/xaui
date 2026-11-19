import { createSlotContext } from '@xaui/native/system'
import type { DateTimePickerContextValue } from './date-time-picker.type'

/** The step on the page and the clock. Outside a `<DateTimePicker>` it throws by name. */
export const [DateTimePickerProvider, useDateTimePicker] =
  createSlotContext<DateTimePickerContextValue>('Tram.DateTimePicker')
