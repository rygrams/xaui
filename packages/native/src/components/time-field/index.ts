import { TimeFieldField } from './time-field-field'
import { TimeFieldPeriod } from './time-field-period'
import { TimeFieldRoot } from './time-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the `TextField`'s, re-exported rather than wrapped — the
 * `TextArea`'s arrangement, and the `DateField`'s.
 */
export const TimeField = Object.assign(TimeFieldRoot, {
  Label: TextFieldLabel,
  Field: TimeFieldField,
  Period: TimeFieldPeriod,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { TimeFieldRoot } from './time-field'
export { TimeFieldField } from './time-field-field'
export { TimeFieldPeriod } from './time-field-period'
export { useTimeField } from './time-field.context'
export type {
  TimeFieldContextValue,
  TimeFieldFieldProps,
  TimeFieldPeriodProps,
  TimeFieldProps,
} from './time-field.type'
