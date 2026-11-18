import { describe, expect, it } from 'vitest'
import {
  composeTime,
  hourCycleOf,
  hourSquares,
  minuteSquares,
  minuteStepOf,
  periodNames,
  timeColumnOrder,
  timeSquaresOf,
} from '../../../components/time-picker/time-picker.times'

const DAY = new Date(2026, 10, 18)

describe('hourCycleOf', () => {
  it.each([
    ['en-US', 12],
    ['fr-FR', 24],
    ['de-DE', 24],
  ] as const)('reads %s as a %i-hour clock', (locale, cycle) => {
    expect(hourCycleOf(locale)).toBe(cycle)
  })

  it('falls back to 24 hours on a locale Intl refuses', () => {
    expect(hourCycleOf('not a locale!')).toBe(24)
  })
})

describe('minuteStepOf', () => {
  it.each([
    [1, 1],
    [5, 5],
    [15, 15],
    [7, 6],
    [45, 30],
    [0, 1],
    [-3, 1],
    [Number.NaN, 1],
    [2.5, 2],
  ])('makes %d a step of %d', (asked, step) => {
    expect(minuteStepOf(asked)).toBe(step)
  })
})

describe('hourSquares', () => {
  it('turns from 12 to 11 on a twelve-hour clock', () => {
    expect(hourSquares(12)).toEqual([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  })

  it('turns from 0 to 23 on a 24-hour clock', () => {
    expect(hourSquares(24)).toHaveLength(24)
    expect(hourSquares(24)[0]).toBe(0)
    expect(hourSquares(24)[23]).toBe(23)
  })
})

describe('minuteSquares', () => {
  it('lays one square per step', () => {
    expect(minuteSquares(15)).toEqual([0, 15, 30, 45])
    expect(minuteSquares(1)).toHaveLength(60)
  })
})

describe('timeSquaresOf', () => {
  it('reads an afternoon on both clocks', () => {
    const time = new Date(2026, 10, 18, 13, 30)

    expect(timeSquaresOf(time, 24, 1)).toEqual({
      hour: 13,
      minute: 30,
      period: 'pm',
    })
    expect(timeSquaresOf(time, 12, 1)).toEqual({ hour: 1, minute: 30, period: 'pm' })
  })

  it('reads midnight and noon as 12 on a twelve-hour clock', () => {
    expect(timeSquaresOf(new Date(2026, 0, 1, 0, 5), 12, 1)).toEqual({
      hour: 12,
      minute: 5,
      period: 'am',
    })
    expect(timeSquaresOf(new Date(2026, 0, 1, 12, 0), 12, 1)).toEqual({
      hour: 12,
      minute: 0,
      period: 'pm',
    })
  })

  it('stands on the minute square under the time', () => {
    expect(timeSquaresOf(new Date(2026, 0, 1, 9, 7), 24, 5).minute).toBe(5)
    expect(timeSquaresOf(new Date(2026, 0, 1, 9, 59), 24, 15).minute).toBe(45)
  })
})

describe('composeTime', () => {
  it('keeps the day and drops the seconds', () => {
    const time = composeTime(
      new Date(2026, 10, 18, 4, 4, 4, 4),
      { hour: 9, minute: 30, period: 'am' },
      24
    )

    expect(time).toEqual(new Date(2026, 10, 18, 9, 30))
  })

  it('reads 12 am as midnight and 12 pm as noon', () => {
    expect(
      composeTime(DAY, { hour: 12, minute: 0, period: 'am' }, 12).getHours()
    ).toBe(0)
    expect(
      composeTime(DAY, { hour: 12, minute: 0, period: 'pm' }, 12).getHours()
    ).toBe(12)
    expect(
      composeTime(DAY, { hour: 7, minute: 0, period: 'pm' }, 12).getHours()
    ).toBe(19)
  })

  it('ignores the half of the day on a 24-hour clock', () => {
    expect(
      composeTime(DAY, { hour: 7, minute: 0, period: 'pm' }, 24).getHours()
    ).toBe(7)
  })

  it.each([12, 24] as const)(
    'is the inverse of timeSquaresOf on a %i-hour clock',
    cycle => {
      for (const hours of [0, 1, 11, 12, 13, 23]) {
        const time = new Date(2026, 10, 18, hours, 40)

        expect(composeTime(time, timeSquaresOf(time, cycle, 1), cycle)).toEqual(time)
      }
    }
  )
})

describe('timeColumnOrder', () => {
  it('puts the half of the day last in English', () => {
    expect(timeColumnOrder('en-US', 12)).toEqual(['hour', 'minute', 'period'])
  })

  it('puts it first in Korean', () => {
    expect(timeColumnOrder('ko-KR', 12)).toEqual(['period', 'hour', 'minute'])
  })

  it('has no half on a 24-hour clock', () => {
    expect(timeColumnOrder('fr-FR', 24)).toEqual(['hour', 'minute'])
    expect(timeColumnOrder('en-US', 24)).toEqual(['hour', 'minute'])
  })

  it('falls back on a locale Intl refuses', () => {
    expect(timeColumnOrder('not a locale!', 12)).toEqual([
      'hour',
      'minute',
      'period',
    ])
  })
})

describe('periodNames', () => {
  it('names the halves as the locale does', () => {
    expect(periodNames('en-US')).toEqual({ am: 'AM', pm: 'PM' })
  })

  it('falls back to AM and PM', () => {
    expect(periodNames('not a locale!')).toEqual({ am: 'AM', pm: 'PM' })
  })
})
