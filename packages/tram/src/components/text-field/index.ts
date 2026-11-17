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

export { useTextField } from './text-field.context'
export { textFieldRecipe } from './text-field.recipe'
export type {
  FieldBlurEvent,
  FieldFocusEvent,
  TextFieldContextValue,
  TextFieldDescriptionProps,
  TextFieldErrorProps,
  TextFieldFieldProps,
  TextFieldLabelProps,
  TextFieldProps,
  TextFieldSize,
  TextFieldSlot,
} from './text-field.type'
