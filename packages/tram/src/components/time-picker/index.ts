import { createWheelFieldSlots } from '../wheel-field/wheel-field.slots'
import { TimePickerRoot } from './time-picker'
import { TimePickerWheel } from './time-picker-wheel'

const slots = createWheelFieldSlots('TimePicker', TimePickerWheel)

export const TimePicker = Object.assign(TimePickerRoot, {
  ...slots,
  Wheel: TimePickerWheel,
})

export { TimePickerRoot } from './time-picker'
export { TimePickerWheel } from './time-picker-wheel'
export { useTimePicker } from './time-picker.context'
/** What the field, the page and the wheel read — the same reader as the `DatePicker`'s. */
export { useWheelField as useTimePickerField } from '../wheel-field/wheel-field.context'
export type { DayPeriod, HourCycle } from './time-picker.times'
export type {
  TimePickerContentProps,
  TimePickerContextValue,
  TimePickerDescriptionProps,
  TimePickerErrorProps,
  TimePickerFieldContextValue,
  TimePickerFieldProps,
  TimePickerIndicatorProps,
  TimePickerLabelProps,
  TimePickerOverlayProps,
  TimePickerProps,
  TimePickerSize,
  TimePickerSlot,
  TimePickerTriggerProps,
  TimePickerValueProps,
  TimePickerWheelProps,
} from './time-picker.type'
