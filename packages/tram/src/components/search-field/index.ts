import { SearchFieldClear } from './search-field-clear'
import { SearchFieldField } from './search-field-field'
import { SearchFieldIcon } from './search-field-icon'
import { SearchFieldRoot } from './search-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the Tram `TextField`'s, as on Native: the root is a
 * `TextField`, so its label, its hint and its error are the same components.
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
export { useSearchField } from './search-field.context'
export { searchFieldRecipe } from './search-field.recipe'
export type {
  SearchFieldClearProps,
  SearchFieldContextValue,
  SearchFieldFieldProps,
  SearchFieldIconProps,
  SearchFieldProps,
  SearchFieldSize,
  SearchFieldSlot,
  SearchFieldVariant,
} from './search-field.type'
