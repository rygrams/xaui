import { TextFieldDescription, TextFieldError } from '../text-field'
import { DummyFieldRoot } from './dummy-field'
import { DummyFieldField } from './dummy-field-field'
import { DummyFieldIndicator } from './dummy-field-indicator'
import { DummyFieldLabel } from './dummy-field-label'
import { DummyFieldValue } from './dummy-field-value'

/**
 * Two of the slots **are** the Tram `TextField`'s, re-exported rather than wrapped. The
 * label is its label, pressing the field instead of focusing an input.
 */
export const DummyField = Object.assign(DummyFieldRoot, {
  Label: DummyFieldLabel,
  Field: DummyFieldField,
  Value: DummyFieldValue,
  Indicator: DummyFieldIndicator,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { DummyFieldRoot } from './dummy-field'
export { DummyFieldField } from './dummy-field-field'
export { DummyFieldIndicator } from './dummy-field-indicator'
export { DummyFieldLabel } from './dummy-field-label'
export { DummyFieldValue } from './dummy-field-value'
export { useDummyField } from './dummy-field.context'
export { dummyFieldRecipe } from './dummy-field.recipe'
export type {
  DummyFieldContextValue,
  DummyFieldFieldProps,
  DummyFieldIndicatorProps,
  DummyFieldProps,
  DummyFieldSize,
  DummyFieldSlot,
  DummyFieldValueProps,
} from './dummy-field.type'
