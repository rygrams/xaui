import { PhoneNumberFieldRoot } from './phone-number-field'
import { PhoneNumberFieldField } from './phone-number-field-field'
import { PhoneNumberFieldCountry } from './phone-number-field-country'
import { PhoneNumberFieldContent } from './phone-number-field-content'
import { PhoneNumberFieldSearch } from './phone-number-field-search'
import { PhoneNumberFieldCountryList } from './phone-number-field-country-list'
import { TextFieldLabel, TextFieldDescription, TextFieldError } from '../text-field'
import {
  BottomSheetOverlay,
  BottomSheetHandle,
  BottomSheetTitle,
  BottomSheetClose,
} from '../bottom-sheet'

export const PhoneNumberField = Object.assign(PhoneNumberFieldRoot, {
  Label: TextFieldLabel,
  Field: PhoneNumberFieldField,
  Country: PhoneNumberFieldCountry,
  Description: TextFieldDescription,
  Error: TextFieldError,
  Overlay: BottomSheetOverlay,
  Content: PhoneNumberFieldContent,
  Handle: BottomSheetHandle,
  Title: BottomSheetTitle,
  Close: BottomSheetClose,
  Search: PhoneNumberFieldSearch,
  CountryList: PhoneNumberFieldCountryList,
})
export {
  PhoneNumberFieldRoot,
  PhoneNumberFieldField,
  PhoneNumberFieldCountry,
  PhoneNumberFieldContent,
  PhoneNumberFieldSearch,
  PhoneNumberFieldCountryList,
}
export { usePhoneNumberField } from './phone-number-field.context'
export type * from './phone-number-field.type'
