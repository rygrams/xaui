import { SelectDescription } from '../select/select-description'
import { SelectError } from '../select/select-error'
import { SelectIndicator } from '../select/select-indicator'
import { SelectItem } from '../select/select-item'
import { SelectItemLabel } from '../select/select-item-label'
import { SelectLabel } from '../select/select-label'
import { SelectOverlay } from '../select/select-overlay'
import { SelectTrigger } from '../select/select-trigger'
import { SelectValue } from '../select/select-value'
import { AutocompleteContent } from './autocomplete-content'
import { AutocompleteEmpty } from './autocomplete-empty'
import { AutocompleteSearch } from './autocomplete-search'
import { AutocompleteRoot } from './autocomplete'

/**
 * The field, its value, its rows, its label and its help lines **are** the Tram
 * `Select`'s — the same components, as on Native the `Combobox`'s are the
 * `Autocomplete`'s. What an autocomplete adds is its own: the root's query, the content
 * that narrows by it, the search and the empty line.
 */
export const Autocomplete = Object.assign(AutocompleteRoot, {
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  Overlay: SelectOverlay,
  Content: AutocompleteContent,
  Search: AutocompleteSearch,
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  Empty: AutocompleteEmpty,
  Description: SelectDescription,
  Error: SelectError,
})

export { AutocompleteRoot } from './autocomplete'
export { AutocompleteContent } from './autocomplete-content'
export { AutocompleteEmpty } from './autocomplete-empty'
export { AutocompleteSearch } from './autocomplete-search'
export { useAutocomplete } from './autocomplete.context'
export { autocompleteRecipe } from './autocomplete.recipe'
export type {
  AutocompleteContentProps,
  AutocompleteContextValue,
  AutocompleteDescriptionProps,
  AutocompleteEmptyProps,
  AutocompleteErrorProps,
  AutocompleteIndicatorProps,
  AutocompleteItemLabelProps,
  AutocompleteItemProps,
  AutocompleteLabelProps,
  AutocompleteOverlayProps,
  AutocompleteProps,
  AutocompleteSearchProps,
  AutocompleteSize,
  AutocompleteSlot,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
} from './autocomplete.type'
