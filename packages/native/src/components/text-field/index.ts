import { TextFieldDescription } from './text-field-description'
import { TextFieldError } from './text-field-error'
import { TextFieldField } from './text-field-field'
import { TextFieldLabel } from './text-field-label'
import { TextFieldRoot } from './text-field'

export const TextField = Object.assign(TextFieldRoot, {
  Label: TextFieldLabel,
  Field: TextFieldField,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

// The `TextArea` is a `TextField`: it renders this root and these three slots, and only its
// field differs. They are exported for that, not as a second public way to build a field.
export { TextFieldRoot } from './text-field'
export { TextFieldDescription } from './text-field-description'
export { TextFieldError } from './text-field-error'
export { TextFieldField } from './text-field-field'
export { TextFieldLabel } from './text-field-label'
export { useTextField } from './text-field.context'
export { textFieldRecipe } from './text-field.recipe'
export type {
  TextFieldContextValue,
  TextFieldDescriptionProps,
  TextFieldErrorProps,
  TextFieldFieldProps,
  TextFieldLabelPlacement,
  TextFieldLabelProps,
  TextFieldProps,
  TextFieldSize,
  TextFieldSlot,
  TextFieldVariant,
} from './text-field.type'
