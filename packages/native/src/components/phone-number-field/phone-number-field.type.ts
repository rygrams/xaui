import type { ReactNode } from 'react'
import type { CountryCode } from 'libphonenumber-js/min'
import type { FlatListProps } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { TextFieldProps, TextFieldFieldProps } from '../text-field'
import type {
  BottomSheetContentProps,
  BottomSheetTriggerProps,
} from '../bottom-sheet'

export type PhoneCountry = CountryCode

/** National text is retained while incomplete; the country and number change atomically. */
export type PhoneNumberValue = { country: PhoneCountry; nationalNumber: string }

export type PhoneCountryOption = {
  code: PhoneCountry
  name: string
  callingCode: string
  flag: string
}

export type PhoneNumberFieldProps = TextFieldProps & {
  value?: PhoneNumberValue
  defaultValue?: PhoneNumberValue
  onValueChange?: (value: PhoneNumberValue) => void
  /** Country names and their alphabetical order. @default 'en' */
  locale?: string
  /** Restrict the selectable countries. Defaults to all supported countries. */
  countries?: readonly PhoneCountry[]
}

export type PhoneNumberFieldFieldProps = Omit<
  TextFieldFieldProps,
  'value' | 'defaultValue' | 'onChangeText'
>
export type PhoneNumberFieldCountryProps = BottomSheetTriggerProps
export type PhoneNumberFieldContentProps = BottomSheetContentProps
export type PhoneNumberFieldSearchProps = Omit<
  TextFieldFieldProps,
  'value' | 'defaultValue' | 'onChangeText'
>
export type PhoneNumberFieldCountryListProps = Omit<
  FlatListProps<PhoneCountryOption>,
  'data' | 'renderItem'
> &
  Omit<ViewStyleProps, keyof FlatListProps<PhoneCountryOption>> & {
    /** Override a row's contents without replacing its selection behavior. */
    renderCountry?: (country: PhoneCountryOption) => ReactNode
  }

export type PhoneNumberFieldContextValue = {
  value: PhoneNumberValue
  country: PhoneCountryOption
  countries: readonly PhoneCountryOption[]
  /** E.164 when the current number is possible, otherwise null. */
  phoneNumber: string | null
  setNumber: (text: string) => void
  selectCountry: (country: PhoneCountry) => void
  formatNumber: () => void
  query: string
  setQuery: (query: string) => void
  isOpen: boolean
  setOpen: (open: boolean) => void
}
