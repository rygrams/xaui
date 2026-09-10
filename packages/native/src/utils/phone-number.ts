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

/**
 * A region-name lookup, or nothing.
 *
 * `Intl.DisplayNames` is not a missing-ICU edge the way `Intl.DateTimeFormat` is — Hermes
 * does not implement it at all, so on React Native it is `undefined` and the `new` throws
 * a `TypeError` before the field can render a single row. A country list is worth having
 * without it, so this is a lookup that may come back empty rather than a constructor the
 * caller is assumed to have.
 *
 * Without it a country is its own code — `FR` and not `France`, sorted the same way. That
 * is a poorer list, not a broken one, and an app that wants the names installs
 * `@formatjs/intl-displaynames`.
 */
function regionNames(locale: string): Intl.DisplayNames | undefined {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' })
  } catch {
    return undefined
  }
}

export function phoneCountries(
  locale: string,
  codes: readonly PhoneCountry[] = getCountries()
): PhoneCountryOption[] {
  const names = regionNames(locale)
  return [...new Set(codes)]
    .map(code => ({
      code,
      name: names?.of(code) ?? code,
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
