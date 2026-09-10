import { describe, expect, it } from 'vitest'
import {
  editPhoneNumber,
  filterPhoneCountries,
  phoneCountries,
  readPhoneNumber,
} from '../../utils/phone-number'

describe('phone numbers', () => {
  it('keeps incomplete edits and leading zeroes', () => {
    expect(editPhoneNumber('06 1a', { country: 'FR', nationalNumber: '' })).toEqual({
      country: 'FR',
      nationalNumber: '061',
    })
    expect(readPhoneNumber({ country: 'FR', nationalNumber: '061' })).toBeNull()
  })
  it('normalizes national numbers to E.164', () => {
    expect(
      readPhoneNumber({ country: 'FR', nationalNumber: '06 12 34 56 78' })?.number
    ).toBe('+33612345678')
    expect(
      readPhoneNumber({ country: 'CI', nationalNumber: '07 07 12 34 56' })?.number
    ).toBe('+2250707123456')
  })
  it('selects the country of an international paste and respects restrictions', () => {
    const current = { country: 'AD' as const, nationalNumber: '' }
    expect(editPhoneNumber('+33 6 12 34 56 78', current).country).toBe('FR')
    expect(editPhoneNumber('+33 6 12 34 56 78', current, ['AD'])).toBe(current)
    expect(editPhoneNumber('+', current).nationalNumber).toBe('+')
    expect(editPhoneNumber('+33', current).nationalNumber).toBe('+33')
    expect(editPhoneNumber('+2250', current).nationalNumber).toBe('+2250')
  })
  it('clears the number without changing the country', () => {
    expect(editPhoneNumber('', { country: 'AD', nationalNumber: '123456' })).toEqual(
      { country: 'AD', nationalNumber: '' }
    )
  })
  it('localizes countries and searches names, accents, ISO codes and prefixes', () => {
    const countries = phoneCountries('fr', ['FR', 'CI', 'AD', 'FR'])
    expect(countries).toHaveLength(3)
    expect(filterPhoneCountries(countries, 'cote')[0]?.code).toBe('CI')
    expect(filterPhoneCountries(countries, '+376')[0]?.flag).toBe('🇦🇩')
    expect(filterPhoneCountries(countries, 'FR')[0]?.code).toBe('FR')
    expect(filterPhoneCountries(countries, 'xyz')).toEqual([])
  })
  it('falls back to ISO codes where Intl.DisplayNames is missing', () => {
    // Hermes ships no `Intl.DisplayNames`, so this is the default React Native runtime,
    // not an edge case: the list has to come back named by code rather than throw.
    const intl = Intl as { DisplayNames?: typeof Intl.DisplayNames }
    const real = intl.DisplayNames
    intl.DisplayNames = undefined
    try {
      const countries = phoneCountries('fr', ['FR', 'CI', 'AD'])
      expect(countries.map(country => country.name)).toEqual(['AD', 'CI', 'FR'])
      expect(countries[0]?.flag).toBe('🇦🇩')
      expect(filterPhoneCountries(countries, '+225')[0]?.code).toBe('CI')
    } finally {
      intl.DisplayNames = real
    }
  })
})
