import { AutocompleteContent } from '../autocomplete/autocomplete-content'
import { AutocompleteEmpty } from '../autocomplete/autocomplete-empty'
import { SelectDescription } from '../select/select-description'
import { SelectError } from '../select/select-error'
import { SelectItem } from '../select/select-item'
import { SelectItemLabel } from '../select/select-item-label'
import { SelectLabel } from '../select/select-label'
import { SelectOverlay } from '../select/select-overlay'
import { ComboboxIndicator } from './combobox-indicator'
import { ComboboxInput } from './combobox-input'
import { ComboboxTrigger } from './combobox-trigger'
import { ComboboxRoot } from './combobox'

/**
 * The list, its rows, the empty line, the label and the help lines **are** the
 * `Autocomplete`'s — themselves the Tram `Select`'s — as on Native. The row the list
 * unfolds under is the combobox's own: the trigger, the input and the chevron.
 */
export const Combobox = Object.assign(ComboboxRoot, {
  Label: SelectLabel,
  Trigger: ComboboxTrigger,
  Input: ComboboxInput,
  Indicator: ComboboxIndicator,
  Overlay: SelectOverlay,
  Content: AutocompleteContent,
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  Empty: AutocompleteEmpty,
  Description: SelectDescription,
  Error: SelectError,
})

export { ComboboxRoot } from './combobox'
export { ComboboxIndicator } from './combobox-indicator'
export { ComboboxInput } from './combobox-input'
export { ComboboxTrigger } from './combobox-trigger'
export { useAutocomplete as useCombobox } from '../autocomplete/autocomplete.context'
export type {
  ComboboxContentProps,
  ComboboxDescriptionProps,
  ComboboxEmptyProps,
  ComboboxErrorProps,
  ComboboxIndicatorProps,
  ComboboxInputProps,
  ComboboxItemLabelProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxOverlayProps,
  ComboboxProps,
  ComboboxSize,
  ComboboxTriggerProps,
} from './combobox.type'
