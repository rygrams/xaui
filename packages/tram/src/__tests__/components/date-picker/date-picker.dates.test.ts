import { describe, expect, it } from 'vitest'
import {
  YEAR_REACH,
  clampDate,
  composeDate,
  dateColumnOrder,
  daysInMonth,
  squaresOf,
  startOfDay,
  yearSpan,
} from '../../../components/date-picker/date-picker.dates'

describe('daysInMonth', () => {
  it.each([
    [2026, 1, 31],
    [2026, 2, 28],
    [2024, 2, 29],
    [2100, 2, 28],
    [2000, 2, 29],
    [2026, 4, 30],
    [2026, 12, 31],
  ])('counts %i-%i as %i days', (year, month, days) => {
    expect(daysInMonth(year, month)).toBe(days)
  })
})

describe('startOfDay', () => {
  it('drops the time and keeps the day', () => {
    expect(startOfDay(new Date(2026, 10, 18, 21, 45, 12))).toEqual(
      new Date(2026, 10, 18)
    )
  })
})

describe('squaresOf', () => {
  it('counts the month from 1', () => {
    expect(squaresOf(new Date(2026, 0, 31))).toEqual({
      year: 2026,
      month: 1,
      day: 31,
    })
  })
})

describe('composeDate', () => {
  it('makes the day at midnight', () => {
    expect(composeDate({ year: 2026, month: 11, day: 18 })).toEqual(
      new Date(2026, 10, 18)
    )
  })

  it('lands on the last day of a shorter month instead of spilling into the next', () => {
    expect(composeDate({ year: 2026, month: 2, day: 31 })).toEqual(
      new Date(2026, 1, 28)
    )
    expect(composeDate({ year: 2024, month: 2, day: 31 })).toEqual(
      new Date(2024, 1, 29)
    )
    expect(composeDate({ year: 2026, month: 4, day: 31 })).toEqual(
      new Date(2026, 3, 30)
    )
  })

  it('keeps a year under 100 as it was asked', () => {
    expect(composeDate({ year: 42, month: 3, day: 1 }).getFullYear()).toBe(42)
  })

  it('is the inverse of squaresOf', () => {
    const day = new Date(2031, 6, 9)

    expect(composeDate(squaresOf(day))).toEqual(day)
  })
})

describe('clampDate', () => {
  const min = new Date(2026, 0, 10, 15)
  const max = new Date(2026, 11, 20, 8)

  it('leaves a day inside the bounds, at midnight', () => {
    expect(clampDate(new Date(2026, 5, 1, 12), min, max)).toEqual(
      new Date(2026, 5, 1)
    )
  })

  it('compares by the day, not the moment', () => {
    expect(clampDate(new Date(2026, 0, 10, 1), min, max)).toEqual(
      new Date(2026, 0, 10)
    )
    expect(clampDate(new Date(2026, 11, 20, 23), min, max)).toEqual(
      new Date(2026, 11, 20)
    )
  })

  it('holds a day before the first bound on it, and after the last on that one', () => {
    expect(clampDate(new Date(2025, 0, 1), min, max)).toEqual(new Date(2026, 0, 10))
    expect(clampDate(new Date(2030, 0, 1), min, max)).toEqual(new Date(2026, 11, 20))
  })

  it('reads a missing bound as no bound', () => {
    expect(clampDate(new Date(1900, 0, 1))).toEqual(new Date(1900, 0, 1))
  })
})

describe('yearSpan', () => {
  it('reaches a century each way from today without bounds', () => {
    expect(yearSpan(2026, 2026)).toEqual([2026 - YEAR_REACH, 2026 + YEAR_REACH])
  })

  it('widens to a shown year outside that reach', () => {
    expect(yearSpan(2026, 1850)).toEqual([1850, 2126])
    expect(yearSpan(2026, 2400)).toEqual([1926, 2400])
  })

  it('takes the bounds when they are set', () => {
    expect(yearSpan(2026, 2026, new Date(2020, 5, 1), new Date(2030, 0, 1))).toEqual(
      [2020, 2030]
    )
  })

  it('never ends before it starts', () => {
    expect(yearSpan(2026, 2026, new Date(2030, 0, 1), new Date(2020, 0, 1))).toEqual(
      [2030, 2030]
    )
  })
})

describe('dateColumnOrder', () => {
  it.each([
    ['fr-FR', ['day', 'month', 'year']],
    ['en-US', ['month', 'day', 'year']],
    ['ja-JP', ['year', 'month', 'day']],
  ])('writes %s in its own order', (locale, order) => {
    expect(dateColumnOrder(locale)).toEqual(order)
  })

  it('falls back to day, month, year on a locale Intl refuses', () => {
    expect(dateColumnOrder('not a locale!')).toEqual(['day', 'month', 'year'])
  })
})
