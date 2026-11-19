import {
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetOverlay,
  BottomSheetTitle,
} from '../bottom-sheet'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'
import { PhoneNumberFieldRoot } from './phone-number-field'
import { PhoneNumberFieldCountry } from './phone-number-field-country'
import { PhoneNumberFieldCountryList } from './phone-number-field-country-list'
import { PhoneNumberFieldField } from './phone-number-field-field'
import { PhoneNumberFieldSearch } from './phone-number-field-search'

/**
 * Native's slots, less `Handle`: the label, the hint and the error are the `TextField`'s;
 * the overlay, the band, its title and its way out are the `BottomSheet`'s — the Tram
 * band keeps React's context, so `Content` is the band itself, with nothing to restore.
 */
export const PhoneNumberField = Object.assign(PhoneNumberFieldRoot, {
  Label: TextFieldLabel,
  Field: PhoneNumberFieldField,
  Country: PhoneNumberFieldCountry,
  Description: TextFieldDescription,
  Error: TextFieldError,
  Overlay: BottomSheetOverlay,
  Content: BottomSheetContent,
  Title: BottomSheetTitle,
  Close: BottomSheetClose,
  Search: PhoneNumberFieldSearch,
  CountryList: PhoneNumberFieldCountryList,
})

export { PhoneNumberFieldRoot } from './phone-number-field'
export { PhoneNumberFieldCountry } from './phone-number-field-country'
export { PhoneNumberFieldCountryList } from './phone-number-field-country-list'
export { PhoneNumberFieldField } from './phone-number-field-field'
export { PhoneNumberFieldSearch } from './phone-number-field-search'
export { usePhoneNumberField } from './phone-number-field.context'
export { phoneNumberFieldRecipe } from './phone-number-field.recipe'
export type * from './phone-number-field.type'
