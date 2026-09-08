import { forwardRef, useMemo } from 'react'
import { FlatList, Keyboard } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { Button } from '../button'
import { filterPhoneCountries } from '../../utils/phone-number'
import { usePhoneNumberField } from './phone-number-field.context'
import type {
  PhoneCountryOption,
  PhoneNumberFieldCountryListProps,
} from './phone-number-field.type'

export const PhoneNumberFieldCountryList = forwardRef<
  FlatList<PhoneCountryOption>,
  PhoneNumberFieldCountryListProps
>(function PhoneNumberFieldCountryList({ renderCountry, style, ...props }, ref) {
  const [styleProps, rest] = useStyleProps(props)
  const { countries, query, value, selectCountry } = usePhoneNumberField()
  const filtered = useMemo(
    () => filterPhoneCountries(countries, query),
    [countries, query]
  )
  return (
    <FlatList
      ref={ref}
      keyboardShouldPersistTaps="handled"
      keyExtractor={item => item.code}
      {...rest}
      style={[styleProps, style]}
      data={filtered}
      extraData={value.country}
      renderItem={({ item }) => (
        <Button
          variant="ghost"
          justifyContent="flex-start"
          accessibilityLabel={`${item.name}, +${item.callingCode}`}
          accessibilityState={{ selected: item.code === value.country }}
          onPress={() => {
            selectCountry(item.code)
            Keyboard.dismiss()
          }}
        >
          {renderCountry ? (
            renderCountry(item)
          ) : (
            <>
              <Button.Label>
                {item.flag} +{item.callingCode}
              </Button.Label>
              <Button.Label flex={1}>{item.name}</Button.Label>
              {item.code === value.country ? <Button.Label>✓</Button.Label> : null}
            </>
          )}
        </Button>
      )}
    />
  )
})
PhoneNumberFieldCountryList.displayName = 'XAUI.PhoneNumberField.CountryList'
