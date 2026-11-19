import { forwardRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { FlatList, Keyboard, Text, useWindowDimensions } from 'react-native'
import { usePressState } from '@xaui/native'
import { filterPhoneCountries } from '@xaui/native/phone-number-field'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { PressRow } from '../../system/press-row'
import { usePhoneNumberField } from './phone-number-field.context'
import { LIST_SHARE, phoneNumberFieldRecipe } from './phone-number-field.recipe'
import type {
  PhoneCountryOption,
  PhoneNumberFieldCountryListProps,
} from './phone-number-field.type'

type Styles = ReturnType<typeof phoneNumberFieldRecipe.resolve>

type CountryRowProps = {
  country: PhoneCountryOption
  isCurrent: boolean
  styles: Styles
  onChoose: (country: PhoneCountryOption) => void
  renderCountry?: (country: PhoneCountryOption) => ReactNode
}

/** One country: a row of 48 that shrinks a little under the finger, as a list's row does. */
function CountryRow({
  country,
  isCurrent,
  styles,
  onChoose,
  renderCountry,
}: CountryRowProps) {
  const [isPressed, press] = usePressState({})
  const current = isCurrent ? styles.rowCurrent : undefined

  return (
    <PressRow
      isPressed={isPressed}
      animation={false}
      accessibilityRole="button"
      accessibilityLabel={`${country.name}, +${country.callingCode}`}
      accessibilityState={{ selected: isCurrent }}
      style={styles.row}
      onPress={() => onChoose(country)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {renderCountry ? (
        renderCountry(country)
      ) : (
        <>
          <Text style={[styles.rowIso, current]}>{country.code}</Text>
          <Text style={[styles.rowName, current]} numberOfLines={1}>
            {country.name}
          </Text>
          <Text style={[styles.rowCode, current]}>+{country.callingCode}</Text>
        </>
      )}
    </PressRow>
  )
}

/**
 * The countries the query leaves, on the band. Rows of 48: the ISO code, the name, the
 * calling code in the band's quieter ink — and the current country in the accent, read as
 * ink on the band. A touch chooses, closes the band and puts the keyboard away.
 *
 * It reads the band's theme, so its ink is the band's. The list scrolls past
 * `LIST_SHARE` of the window: the band is as tall as its content, and the content would
 * otherwise be two hundred rows. Every `FlatList` prop is the caller's, `ListEmptyComponent`
 * included; `renderCountry` replaces a row's contents and keeps its selection.
 */
export const PhoneNumberFieldCountryList = forwardRef<
  FlatList<PhoneCountryOption>,
  PhoneNumberFieldCountryListProps
>(function PhoneNumberFieldCountryList({ renderCountry, style, ...props }, ref) {
  const theme = useXAUITheme()
  const { height } = useWindowDimensions()
  const [styleProps, rest] = useStyleProps(props)
  const { countries, query, value, selectCountry } = usePhoneNumberField()
  const styles = phoneNumberFieldRecipe.resolve({ theme })

  const filtered = useMemo(
    () => filterPhoneCountries(countries, query),
    [countries, query]
  )

  const choose = useCallback(
    (country: PhoneCountryOption) => {
      selectCountry(country.code)
      Keyboard.dismiss()
    },
    [selectCountry]
  )

  return (
    <FlatList
      ref={ref}
      keyboardShouldPersistTaps="handled"
      keyExtractor={item => item.code}
      {...rest}
      style={[styles.list, { maxHeight: height * LIST_SHARE }, styleProps, style]}
      data={filtered}
      extraData={value.country}
      renderItem={({ item }) => (
        <CountryRow
          country={item}
          isCurrent={item.code === value.country}
          styles={styles}
          onChoose={choose}
          renderCountry={renderCountry}
        />
      )}
    />
  )
})

PhoneNumberFieldCountryList.displayName = 'XAUI.Tram.PhoneNumberField.CountryList'
