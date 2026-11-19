import { forwardRef } from 'react'
import type { TextInput } from 'react-native'
import { SearchFieldRoot } from '../search-field/search-field'
import { SearchFieldField } from '../search-field/search-field-field'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteSearchProps } from './autocomplete.type'

/**
 * The field the list is searched by — a Tram `SearchField` whose query is the
 * autocomplete's own, at the field's size. On the page it stands under the title and does
 * not scroll with the rows.
 *
 * ```tsx
 * <Autocomplete.Search placeholder="nom ou code">
 *   <SearchField.Icon />
 *   <SearchField.Clear accessibilityLabel="effacer" />
 * </Autocomplete.Search>
 * ```
 *
 * Its props are `SearchField.Field`'s and its children the marks in the box; with none it
 * draws the magnifier alone. It takes the focus as the page opens unless `autoFocus` is
 * false.
 */
export const AutocompleteSearch = forwardRef<TextInput, AutocompleteSearchProps>(
  function AutocompleteSearch({ autoFocus = true, ...props }, ref) {
    const { query, setQuery, size, isDisabled } = useAutocomplete()

    return (
      <SearchFieldRoot
        value={query}
        onValueChange={setQuery}
        size={size}
        isDisabled={isDisabled}
      >
        <SearchFieldField ref={ref} autoFocus={autoFocus} {...props} />
      </SearchFieldRoot>
    )
  }
)

AutocompleteSearch.displayName = 'XAUI.Tram.Autocomplete.Search'
