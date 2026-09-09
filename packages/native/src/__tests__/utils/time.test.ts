import { describe, expect, it } from 'vitest'
import { hourCycleFor, periodOf, withTime } from '../../utils/time'

describe('hourCycleFor', () => {
  it('reads the cycle out of the locale', () => {
    expect(hourCycleFor('en-US')).toBe(12)
    expect(hourCycleFor('fr-FR')).toBe(24)
    expect(hourCycleFor('de-DE')).toBe(24)
  })
})

describe('periodOf', () => {
  it('splits the day at noon', () => {
    expect(periodOf(new Date(2024, 0, 1, 11, 59))).toBe('am')
    expect(periodOf(new Date(2024, 0, 1, 12, 0))).toBe('pm')
    expect(periodOf(new Date(2024, 0, 1, 0, 0))).toBe('am')
  })
})

describe('withTime', () => {
  it('lands the parts on the day it was given', () => {
    const merged = withTime(new Date(1995, 6, 4), {
      hours: 14,
      minutes: 30,
      seconds: 45,
    })

    expect(merged.getFullYear()).toBe(1995)
    expect(merged.getMonth()).toBe(6)
    expect(merged.getDate()).toBe(4)
    expect(merged.getHours()).toBe(14)
    expect(merged.getSeconds()).toBe(45)
  })

  it('leaves the day it was given alone', () => {
    const day = new Date(1995, 6, 4)
    withTime(day, { hours: 14, minutes: 30, seconds: 0 })

    expect(day.getHours()).toBe(0)
  })

  it('clears the milliseconds, so two equal times compare equal', () => {
    const day = new Date(1995, 6, 4, 0, 0, 0, 763)
    expect(
      withTime(day, { hours: 1, minutes: 1, seconds: 1 }).getMilliseconds()
    ).toBe(0)
  })
})
