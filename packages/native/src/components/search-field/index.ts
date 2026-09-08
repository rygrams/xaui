import { SearchFieldClear } from './search-field-clear'
import { SearchFieldField } from './search-field-field'
import { SearchFieldIcon } from './search-field-icon'
import { SearchFieldRoot } from './search-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the `TextField`'s, re-exported rather than wrapped — the
 * `MaskField`'s arrangement, for the `MaskField`'s reason: a wrapper would add three
 * components to the tree to change a `displayName`, and the string it would change is the
 * one that tells you the truth.
 */
export const SearchField = Object.assign(SearchFieldRoot, {
  Label: TextFieldLabel,
  Icon: SearchFieldIcon,
  Field: SearchFieldField,
  Clear: SearchFieldClear,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { SearchFieldRoot } from './search-field'
export { SearchFieldClear } from './search-field-clear'
export { SearchFieldField } from './search-field-field'
export { SearchFieldIcon } from './search-field-icon'
export { SearchIcon } from './search-icon'
export { useSearchField } from './search-field.context'
export { searchFieldRecipe } from './search-field.recipe'
export type {
  SearchFieldClearProps,
  SearchFieldContextValue,
  SearchFieldFieldProps,
  SearchFieldIconProps,
  SearchFieldProps,
  SearchFieldSlot,
  SearchFieldVariant,
} from './search-field.type'
