import { forwardRef } from 'react'
import type { TextInput } from 'react-native'
import { SearchField } from '../search-field'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldSearchProps } from './phone-number-field.type'

/**
 * The query over the countries: the Tram `SearchField`, its value the phone root's. It
 * matches a name, an ISO code or a calling code. Written on the band, it reads the band's
 * theme and draws in its ink.
 *
 * Give it an `accessibilityLabel`: it has no label of its own above it.
 */
export const PhoneNumberFieldSearch = forwardRef<
  TextInput,
  PhoneNumberFieldSearchProps
>(function PhoneNumberFieldSearch(props, ref) {
  const { query, setQuery } = usePhoneNumberField()

  return (
    <SearchField value={query} onValueChange={setQuery}>
      <SearchField.Field ref={ref} {...props} />
    </SearchField>
  )
})

PhoneNumberFieldSearch.displayName = 'XAUI.Tram.PhoneNumberField.Search'
