import { createSlotContext } from '../../system/slot'
import type {
  AutocompleteContextValue,
  AutocompleteItemContextValue,
} from './autocomplete.type'

/**
 * R10 — `useAutocomplete` is exported so a third party can write its own slot against the
 * same resolved values the built-in ones read. Outside an `<Autocomplete>` it throws by name.
 */
export const [AutocompleteProvider, useAutocomplete] =
  createSlotContext<AutocompleteContextValue>('Autocomplete')

/** One row's own state, for the slots inside it. */
export const [AutocompleteItemProvider, useAutocompleteItem] =
  createSlotContext<AutocompleteItemContextValue>('Autocomplete.Item')
