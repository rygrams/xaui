import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  parseIncompletePhoneNumber,
} from 'libphonenumber-js/min'
import type {
  PhoneCountry,
  PhoneCountryOption,
  PhoneNumberValue,
} from '../components/phone-number-field/phone-number-field.type'

export function phoneCountries(
  locale: string,
  codes: readonly PhoneCountry[] = getCountries()
): PhoneCountryOption[] {
  const names = new Intl.DisplayNames([locale], { type: 'region' })
  return [...new Set(codes)]
    .map(code => ({
      code,
      name: names.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
      flag: String.fromCodePoint(
        ...[...code].map(letter => letter.charCodeAt(0) + 127397)
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}

function searchable(text: string) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

export function filterPhoneCountries(
  countries: readonly PhoneCountryOption[],
  query: string
) {
  const needle = searchable(query)
  return countries.filter(country =>
    searchable(`${country.name} ${country.code} +${country.callingCode}`).includes(
      needle
    )
  )
}

export function readPhoneNumber(value: PhoneNumberValue) {
  const parsed = parsePhoneNumberFromString(value.nationalNumber, value.country)
  return parsed?.isPossible() ? parsed : null
}

/** An international paste may select its country, but cannot escape the allowed list. */
export function editPhoneNumber(
  text: string,
  current: PhoneNumberValue,
  allowed?: readonly PhoneCountry[]
): PhoneNumberValue {
  const normalized = parseIncompletePhoneNumber(text)
  if (!normalized.startsWith('+')) {
    return { country: current.country, nationalNumber: normalized.slice(0, 17) }
  }
  const parsed = parsePhoneNumberFromString(normalized)
  if (!parsed?.country) {
    return { country: current.country, nationalNumber: normalized.slice(0, 16) }
  }
  if (allowed && !allowed.includes(parsed.country)) return current
  return { country: parsed.country, nationalNumber: parsed.formatNational() }
}
