import { forwardRef } from 'react'
import type { TextInput } from 'react-native'
import { TextField } from '../text-field'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldSearchProps } from './phone-number-field.type'

export const PhoneNumberFieldSearch = forwardRef<
  TextInput,
  PhoneNumberFieldSearchProps
>(function PhoneNumberFieldSearch(props, ref) {
  const { query, setQuery } = usePhoneNumberField()
  return (
    <TextField variant="secondary">
      <TextField.Field
        ref={ref}
        accessibilityRole="search"
        autoCorrect={false}
        autoCapitalize="none"
        {...props}
        value={query}
        onChangeText={setQuery}
      />
    </TextField>
  )
})
PhoneNumberFieldSearch.displayName = 'XAUI.PhoneNumberField.Search'
