import { createSlotContext } from '@xaui/native/system'
import type { TimePickerContextValue } from './time-picker.type'

/** The picker's own options, for its wheel. Outside a `<TimePicker>` it throws by name. */
export const [TimePickerProvider, useTimePicker] =
  createSlotContext<TimePickerContextValue>('Tram.TimePicker')
