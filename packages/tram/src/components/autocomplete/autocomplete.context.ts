import { createSlotContext } from '@xaui/native/system'
import type { AutocompleteContextValue } from './autocomplete.type'

export const [AutocompleteProvider, useAutocomplete] =
  createSlotContext<AutocompleteContextValue>('Tram.Autocomplete')
