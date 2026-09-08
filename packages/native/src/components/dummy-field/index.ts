import { DummyFieldDescription } from './dummy-field-description'
import { DummyFieldError } from './dummy-field-error'
import { DummyFieldField } from './dummy-field-field'
import { DummyFieldIndicator } from './dummy-field-indicator'
import { DummyFieldLabel } from './dummy-field-label'
import { DummyFieldRoot } from './dummy-field'
import { DummyFieldValue } from './dummy-field-value'

export const DummyField = Object.assign(DummyFieldRoot, {
  Label: DummyFieldLabel,
  Field: DummyFieldField,
  Value: DummyFieldValue,
  Indicator: DummyFieldIndicator,
  Description: DummyFieldDescription,
  Error: DummyFieldError,
})

export { DummyFieldRoot } from './dummy-field'
export { DummyFieldLabel } from './dummy-field-label'
export { DummyFieldField } from './dummy-field-field'
export { DummyFieldValue } from './dummy-field-value'
export { DummyFieldIndicator } from './dummy-field-indicator'
export { DummyFieldDescription } from './dummy-field-description'
export { DummyFieldError } from './dummy-field-error'
export { useDummyField } from './dummy-field.context'
export type {
  DummyFieldContextValue,
  DummyFieldDescriptionProps,
  DummyFieldErrorProps,
  DummyFieldFieldProps,
  DummyFieldIndicatorProps,
  DummyFieldLabelPlacement,
  DummyFieldLabelProps,
  DummyFieldProps,
  DummyFieldSize,
  DummyFieldSlot,
  DummyFieldValueProps,
  DummyFieldVariant,
} from './dummy-field.type'
