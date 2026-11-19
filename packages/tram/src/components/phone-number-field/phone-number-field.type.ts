import type { ReactNode } from 'react'
import type { FlatListProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type {
  PhoneCountry,
  PhoneCountryOption,
  PhoneNumberValue,
} from '@xaui/native/phone-number-field'
import type { ViewStyleProps } from '@xaui/native/system'
import type {
  BottomSheetContentProps,
  BottomSheetTriggerProps,
} from '../bottom-sheet'
import type { SearchFieldFieldProps } from '../search-field'
import type { TextFieldFieldProps, TextFieldProps } from '../text-field'

export type { PhoneCountry, PhoneCountryOption, PhoneNumberValue }

export type PhoneNumberFieldSlot =
  | 'country'
  | 'iso'
  | 'calling'
  | 'chevron'
  | 'list'
  | 'row'
  | 'rowIso'
  | 'rowName'
  | 'rowCode'
  | 'rowCurrent'

/**
 * The Tram `TextField`'s root — `size`, `radius`, `accent`, `color`, `isInvalid`,
 * `isDisabled`, `isRequired` — plus the number and its country, as on Native.
 */
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

/** `BottomSheet.Trigger`'s props. Left empty it draws the ISO code, the calling code and a chevron. */
export type PhoneNumberFieldCountryProps = BottomSheetTriggerProps

export type PhoneNumberFieldContentProps = BottomSheetContentProps

/**
 * The Tram `SearchField`'s field: the query is the phone root's. `onSubmitEditing` is the
 * search field's own — the search key — where Native's takes the caller's.
 */
export type PhoneNumberFieldSearchProps = SearchFieldFieldProps

export type PhoneNumberFieldCountryListProps = Omit<
  FlatListProps<PhoneCountryOption>,
  'data' | 'renderItem'
> &
  Omit<ViewStyleProps, keyof FlatListProps<PhoneCountryOption>> & {
    /** Override a row's contents without replacing its selection behaviour. */
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
  /** The country's own drawing, resolved against the page's theme. */
  countryStyle: StyleProp<ViewStyle>
  isoStyle: StyleProp<TextStyle>
  callingStyle: StyleProp<TextStyle>
  /** Values, not a style: an `Icon` takes a size and a colour. */
  chevron: { size: number; color: string }
  isDisabled: boolean
}
