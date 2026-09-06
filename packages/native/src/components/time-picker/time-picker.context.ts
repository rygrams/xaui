import { createSlotContext } from '../../system/slot'
import type { TimePickerContextValue } from './time-picker.type'

/**
 * R10 — the resolved styles, the dial's measurements and the time.
 *
 * The dial's numbers are **values rather than style ids**, for the reason `useChartInk`
 * gives: a face is drawn from arithmetic — an angle, a radius, a point — and arithmetic
 * cannot read a `StyleSheet`.
 */
export const [TimePickerProvider, useTimePicker] =
  createSlotContext<TimePickerContextValue>('TimePicker')
