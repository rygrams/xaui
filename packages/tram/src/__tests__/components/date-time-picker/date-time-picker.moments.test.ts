import { describe, expect, it } from 'vitest'
import { withTimeOf } from '../../../components/date-picker/date-picker.dates'
import {
  momentFormat,
  settleMoment,
  stepFormats,
} from '../../../components/date-time-picker/date-time-picker.moments'

describe('settleMoment', () => {
  it('drops the seconds and keeps the day', () => {
    expect(settleMoment(new Date(2026, 10, 18, 9, 7, 42), 1)).toEqual(
      new Date(2026, 10, 18, 9, 7)
    )
  })

  it('stands on the minute square under the moment', () => {
    expect(settleMoment(new Date(2026, 10, 18, 9, 7), 5)).toEqual(
      new Date(2026, 10, 18, 9, 5)
    )
  })

  it('compares the bounds to the minute, not by the day', () => {
    const min = new Date(2026, 10, 18, 9, 0)
    const max = new Date(2026, 10, 18, 18, 0)

    expect(settleMoment(new Date(2026, 10, 18, 8, 30), 1, min, max)).toEqual(min)
    expect(settleMoment(new Date(2026, 10, 18, 19, 15), 1, min, max)).toEqual(max)
    expect(settleMoment(new Date(2026, 10, 18, 12, 0), 1, min, max)).toEqual(
      new Date(2026, 10, 18, 12, 0)
    )
  })

  it('turns a moment before the first bound to the first square after it', () => {
    const min = new Date(2026, 10, 18, 9, 7)

    expect(settleMoment(new Date(2026, 10, 18, 9, 0), 5, min)).toEqual(
      new Date(2026, 10, 18, 9, 10)
    )
  })

  it('turns a moment past the last bound to the last square before it', () => {
    const max = new Date(2026, 10, 18, 17, 58)

    expect(settleMoment(new Date(2026, 10, 18, 18, 30), 15, undefined, max)).toEqual(
      new Date(2026, 10, 18, 17, 45)
    )
  })

  it('crosses a day: a day before the first bound lands on it', () => {
    const min = new Date(2026, 10, 18, 9, 0)

    expect(settleMoment(new Date(2026, 10, 17, 14, 0), 1, min)).toEqual(min)
  })
})

describe('withTimeOf', () => {
  it('moves the day and keeps the time', () => {
    expect(
      withTimeOf(new Date(2027, 0, 31), new Date(2026, 10, 18, 9, 30, 15, 250))
    ).toEqual(new Date(2027, 0, 31, 9, 30, 15, 250))
  })
})

describe('momentFormat', () => {
  it('reads the day and the time on the picker clock', () => {
    expect(momentFormat(24)).toEqual({
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: false,
    })
    expect(momentFormat(12).hour12).toBe(true)
  })

  it('formats through Intl without throwing', () => {
    const text = new Intl.DateTimeFormat('fr-FR', momentFormat(24)).format(
      new Date(2026, 10, 18, 9, 30)
    )

    expect(text).toContain('2026')
    expect(text).toContain('09:30')
  })
})

describe('stepFormats', () => {
  it('reads each half on its own', () => {
    const formats = stepFormats(24)
    const moment = new Date(2026, 10, 18, 9, 30)

    expect(new Intl.DateTimeFormat('fr-FR', formats.time).format(moment)).toBe(
      '09:30'
    )
    expect(
      new Intl.DateTimeFormat('fr-FR', formats.date).format(moment)
    ).not.toContain('09')
  })
})
