import { InputDescription } from './input-description'
import { InputError } from './input-error'
import { InputField } from './input-field'
import { InputLabel } from './input-label'
import { InputRoot } from './input'

export const Input = Object.assign(InputRoot, {
  Label: InputLabel,
  Field: InputField,
  Description: InputDescription,
  Error: InputError,
})

// The `TextArea` is an `Input`: it renders this root and these three slots, and only its
// field differs. They are exported for that, not as a second public way to build a field.
export { InputRoot } from './input'
export { InputDescription } from './input-description'
export { InputError } from './input-error'
export { InputField } from './input-field'
export { InputLabel } from './input-label'
export { useInput } from './input.context'
export { inputRecipe } from './input.recipe'
export type {
  InputContextValue,
  InputDescriptionProps,
  InputErrorProps,
  InputFieldProps,
  InputLabelPlacement,
  InputLabelProps,
  InputProps,
  InputSize,
  InputSlot,
  InputVariant,
} from './input.type'
