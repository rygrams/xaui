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
