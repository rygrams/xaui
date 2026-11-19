import { createWheelFieldSlots } from '../wheel-field/wheel-field.slots'
import { DatePickerRoot } from './date-picker'
import { DatePickerWheel } from './date-picker-wheel'

const slots = createWheelFieldSlots('DatePicker', DatePickerWheel)

export const DatePicker = Object.assign(DatePickerRoot, {
  ...slots,
  Wheel: DatePickerWheel,
})

export { DatePickerRoot } from './date-picker'
export { DatePickerWheel } from './date-picker-wheel'
export { useDatePicker } from './date-picker.context'
/** What the field, the page and the wheel read — the same reader as the `TimePicker`'s. */
export { useWheelField as useDatePickerField } from '../wheel-field/wheel-field.context'
export type {
  DatePickerContentProps,
  DatePickerContextValue,
  DatePickerDescriptionProps,
  DatePickerErrorProps,
  DatePickerFieldContextValue,
  DatePickerFieldProps,
  DatePickerIndicatorProps,
  DatePickerLabelProps,
  DatePickerOverlayProps,
  DatePickerProps,
  DatePickerSize,
  DatePickerSlot,
  DatePickerTriggerProps,
  DatePickerValueProps,
  DatePickerWheelProps,
} from './date-picker.type'
