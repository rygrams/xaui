import {
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteItemLabel,
  AutocompleteOverlay,
} from '../autocomplete'
import { ComboboxIndicator } from './combobox-indicator'
import { ComboboxInput } from './combobox-input'
import { ComboboxRoot } from './combobox'
import { ComboboxTrigger } from './combobox-trigger'

/**
 * The panel, the rows and the empty line are the `Autocomplete`'s **own objects**, not
 * copies of them. Two reasons, and the second is the load-bearing one:
 *
 * - A row is a row whichever field opened it, and a second set would be a second set to
 *   keep in step — the drift would show as a combobox and an autocomplete in one form with
 *   panels half a shade apart.
 * - `Autocomplete.Content` tells its children apart **by identity** (`type === Item`), not
 *   by name. A `Combobox.Item` that were a different component would be sorted into "not a
 *   row", would never be filtered, and would never register its label.
 *
 * What this component owns is the three slots that make the field the control.
 */
export const Combobox = Object.assign(ComboboxRoot, {
  Trigger: ComboboxTrigger,
  Input: ComboboxInput,
  Indicator: ComboboxIndicator,
  Overlay: AutocompleteOverlay,
  Content: AutocompleteContent,
  Item: AutocompleteItem,
  ItemLabel: AutocompleteItemLabel,
  Empty: AutocompleteEmpty,
})

export { ComboboxRoot } from './combobox'
export { ComboboxIndicator } from './combobox-indicator'
export { ComboboxInput } from './combobox-input'
export { ComboboxTrigger } from './combobox-trigger'
/** The state hook is the `Autocomplete`'s too, because the state is (R10). */
export { useAutocomplete as useCombobox } from '../autocomplete'
export type {
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxInputProps,
  ComboboxItemLabelProps,
  ComboboxItemProps,
  ComboboxOverlayProps,
  ComboboxProps,
  ComboboxSize,
  ComboboxTriggerProps,
  ComboboxVariant,
} from './combobox.type'
