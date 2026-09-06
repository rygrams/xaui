import { TimePickerClock } from './time-picker-clock'
import { TimePickerDisplay } from './time-picker-display'
import { TimePickerIndicator } from './time-picker-indicator'
import { TimePicker as TimePickerRoot } from './time-picker'
import { TimePickerSheet } from './time-picker-sheet'
import { TimePickerTrigger } from './time-picker-trigger'
import { TimePickerValue } from './time-picker-value'

export const TimePicker = Object.assign(TimePickerRoot, {
  Trigger: TimePickerTrigger,
  Value: TimePickerValue,
  Indicator: TimePickerIndicator,
  Sheet: TimePickerSheet,
  Display: TimePickerDisplay,
  Clock: TimePickerClock,
})

export { TimePicker as TimePickerRoot } from './time-picker'
export { TimePickerClock } from './time-picker-clock'
export { TimePickerDisplay } from './time-picker-display'
export { TimePickerIndicator } from './time-picker-indicator'
export { TimePickerSheet } from './time-picker-sheet'
export { TimePickerTrigger } from './time-picker-trigger'
export { TimePickerValue } from './time-picker-value'
export { useTimePicker } from './time-picker.context'
export { timePickerRecipe } from './time-picker.recipe'
export type {
  TimePickerContextValue,
  TimePickerProps,
  TimePickerSheetProps,
  TimePickerSize,
  TimePickerSlot,
  TimePickerTextProps,
  TimePickerTriggerProps,
  TimePickerUnit,
  TimePickerValueProps,
  TimePickerVariant,
  TimePickerViewProps,
} from './time-picker.type'
