import { describe, expect, it } from 'vitest'
import {
  fieldName,
  isoDay,
  isoTime,
  partName,
  readMoment,
  twoDigits,
} from '../../../components/wheel-field/wheel-field.read'

const MOMENT = new Date(2026, 10, 8, 9, 5)

describe('readMoment', () => {
  it('writes the moment as the locale does', () => {
    expect(readMoment(MOMENT, 'en-US', { dateStyle: 'short' }, isoDay)).toBe(
      '11/8/26'
    )
  })

  it('falls back when Intl refuses the locale', () => {
    expect(readMoment(MOMENT, 'not a locale!', { dateStyle: 'short' }, isoDay)).toBe(
      '2026-11-08'
    )
  })
})

describe('twoDigits, isoDay, isoTime', () => {
  it('pads to two digits', () => {
    expect(twoDigits(5)).toBe('05')
    expect(twoDigits(42)).toBe('42')
  })

  it('writes the ISO day and a 24-hour time', () => {
    expect(isoDay(MOMENT)).toBe('2026-11-08')
    expect(isoTime(new Date(2026, 0, 1, 21, 7))).toBe('21:07')
  })
})

describe('fieldName', () => {
  it('names a column in the locale', () => {
    expect(fieldName('day', 'fr')).toBe('jour')
  })

  it('falls back to English when Intl refuses the locale', () => {
    expect(fieldName('minute', 'not a locale!')).toBe('minute')
  })
})

describe('partName', () => {
  it('names a month', () => {
    expect(partName(MOMENT, 'en-US', { month: 'long' })).toBe('November')
  })

  it('is undefined when Intl refuses', () => {
    expect(partName(MOMENT, 'not a locale!', { month: 'long' })).toBeUndefined()
  })
})
