import { createWheelFieldSlots } from '../wheel-field/wheel-field.slots'
import { DateTimePickerRoot } from './date-time-picker'
import {
  DateTimePickerDateWheel,
  DateTimePickerSteps,
  DateTimePickerTimeWheel,
} from './date-time-picker-steps'

const slots = createWheelFieldSlots('DateTimePicker', DateTimePickerSteps)

export const DateTimePicker = Object.assign(DateTimePickerRoot, {
  ...slots,
  Steps: DateTimePickerSteps,
  DateWheel: DateTimePickerDateWheel,
  TimeWheel: DateTimePickerTimeWheel,
})

export { DateTimePickerRoot } from './date-time-picker'
export {
  DateTimePickerDateWheel,
  DateTimePickerSteps,
  DateTimePickerTimeWheel,
} from './date-time-picker-steps'
export { useDateTimePicker } from './date-time-picker.context'
/** What the field, the page and the wheels read — the same reader as the two other pickers'. */
export { useWheelField as useDateTimePickerField } from '../wheel-field/wheel-field.context'
export type {
  DateTimePickerContentProps,
  DateTimePickerContextValue,
  DateTimePickerDateWheelProps,
  DateTimePickerDescriptionProps,
  DateTimePickerErrorProps,
  DateTimePickerFieldContextValue,
  DateTimePickerFieldProps,
  DateTimePickerIndicatorProps,
  DateTimePickerLabelProps,
  DateTimePickerOverlayProps,
  DateTimePickerProps,
  DateTimePickerSize,
  DateTimePickerSlot,
  DateTimePickerStep,
  DateTimePickerStepsProps,
  DateTimePickerTimeWheelProps,
  DateTimePickerTriggerProps,
  DateTimePickerValueProps,
} from './date-time-picker.type'
