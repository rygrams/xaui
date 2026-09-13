import { Autocomplete as AutocompleteRoot } from './autocomplete'
import { AutocompleteContent } from './autocomplete-content'
import { AutocompleteDescription } from './autocomplete-description'
import { AutocompleteEmpty } from './autocomplete-empty'
import { AutocompleteError } from './autocomplete-error'
import { AutocompleteIndicator } from './autocomplete-indicator'
import { AutocompleteItem } from './autocomplete-item'
import { AutocompleteItemLabel } from './autocomplete-item-label'
import { AutocompleteLabel } from './autocomplete-label'
import { AutocompleteOverlay } from './autocomplete-overlay'
import { AutocompleteSearch } from './autocomplete-search'
import { AutocompleteTrigger } from './autocomplete-trigger'
import { AutocompleteValue } from './autocomplete-value'

export const Autocomplete = Object.assign(AutocompleteRoot, {
  Label: AutocompleteLabel,
  Trigger: AutocompleteTrigger,
  Value: AutocompleteValue,
  Indicator: AutocompleteIndicator,
  Overlay: AutocompleteOverlay,
  Content: AutocompleteContent,
  Search: AutocompleteSearch,
  Item: AutocompleteItem,
  ItemLabel: AutocompleteItemLabel,
  Empty: AutocompleteEmpty,
  Description: AutocompleteDescription,
  Error: AutocompleteError,
})

export { Autocomplete as AutocompleteRoot } from './autocomplete'
export { AutocompleteContent } from './autocomplete-content'
export { AutocompleteDescription } from './autocomplete-description'
export { AutocompleteEmpty } from './autocomplete-empty'
export { AutocompleteError } from './autocomplete-error'
export { AutocompleteIndicator } from './autocomplete-indicator'
export { AutocompleteItem } from './autocomplete-item'
export { AutocompleteItemLabel } from './autocomplete-item-label'
export { AutocompleteLabel } from './autocomplete-label'
export { AutocompleteOverlay } from './autocomplete-overlay'
export { AutocompleteSearch } from './autocomplete-search'
export { AutocompleteTrigger } from './autocomplete-trigger'
export { AutocompleteValue } from './autocomplete-value'
export { useAutocomplete, useAutocompleteItem } from './autocomplete.context'
export { autocompleteRecipe } from './autocomplete.recipe'
export type {
  AutocompleteContentProps,
  AutocompleteContextValue,
  AutocompleteDescriptionProps,
  AutocompleteEmptyProps,
  AutocompleteErrorProps,
  AutocompleteItemContextValue,
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
  AutocompleteVariant,
} from './autocomplete.type'
