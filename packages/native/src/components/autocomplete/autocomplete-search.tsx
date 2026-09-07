import { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteSearchProps } from './autocomplete.type'

/**
 * The field you type in — the control an autocomplete has and a select does not.
 *
 * It lives **inside** the panel and above its scroller, so it stays put while the results
 * move under it. Write it as the first child of `Autocomplete.Content`; the content pins it
 * wherever it finds it.
 *
 * It takes focus as the panel opens, because an autocomplete you have to tap twice before
 * you can type into it is a select with a spare row. `autoFocus={false}` if the panel is
 * short enough that the keyboard would cover it.
 */
export const AutocompleteSearch = forwardRef<TextInput, AutocompleteSearchProps>(
  function AutocompleteSearch({ autoFocus = true, style, ...props }, ref) {
    const { searchStyle, placeholderColor, query, setQuery, isDisabled } =
      useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <TextInput
        ref={ref}
        value={query}
        onChangeText={setQuery}
        autoFocus={autoFocus}
        editable={!isDisabled}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={placeholderColor}
        // The panel is the list; the field is how you narrow it. A screen reader hears the
        // trigger's `combobox` and then this, which is the pair that describes the control.
        accessibilityRole="search"
        {...rest}
        style={[searchStyle, styleProps, style]}
      />
    )
  }
)

AutocompleteSearch.displayName = 'XAUI.Autocomplete.Search'
