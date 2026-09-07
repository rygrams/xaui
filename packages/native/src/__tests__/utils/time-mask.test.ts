import { describe, expect, it } from 'vitest'
import {
  formatTime,
  hourCycleFor,
  maskTime,
  parseTime,
  periodOf,
  timeLength,
  timePlaceholder,
  withTime,
} from '../../utils/time-mask'

const LABELS = { hours: 'HH', minutes: 'mm', seconds: 'ss' }

describe('hourCycleFor', () => {
  it('reads the cycle out of the locale', () => {
    expect(hourCycleFor('en-US')).toBe(12)
    expect(hourCycleFor('fr-FR')).toBe(24)
    expect(hourCycleFor('de-DE')).toBe(24)
  })
})

describe('timeLength', () => {
  it('is the shape a finished time is', () => {
    expect(timeLength('minute')).toBe(5)
    expect(timeLength('second')).toBe(8)
  })
})

describe('timePlaceholder', () => {
  it('adds the seconds only when they are asked for', () => {
    expect(timePlaceholder('minute', LABELS)).toBe('HH:mm')
    expect(timePlaceholder('second', LABELS)).toBe('HH:mm:ss')
  })
})

describe('maskTime', () => {
  it('puts the colon in as the parts fill', () => {
    expect(maskTime('1', 'minute')).toBe('1')
    expect(maskTime('14', 'minute')).toBe('14')
    expect(maskTime('143', 'minute')).toBe('14:3')
    expect(maskTime('1430', 'minute')).toBe('14:30')
  })

  it('keeps only the digits, whatever else arrives', () => {
    expect(maskTime('14:30', 'minute')).toBe('14:30')
    expect(maskTime('14h30', 'minute')).toBe('14:30')
  })

  it('stops at the parts it was asked for', () => {
    expect(maskTime('143045', 'minute')).toBe('14:30')
    expect(maskTime('143045', 'second')).toBe('14:30:45')
  })

  it('caps an hour at its own cycle, once it is complete', () => {
    // `9` on its way to `09` is left alone; `99` is not an hour anyone meant.
    expect(maskTime('9', 'minute')).toBe('9')
    expect(maskTime('99', 'minute')).toBe('23')
    expect(maskTime('99', 'minute', 12)).toBe('12')
  })

  it('caps the minutes and the seconds at 59', () => {
    expect(maskTime('1475', 'minute')).toBe('14:59')
    expect(maskTime('143099', 'second')).toBe('14:30:59')
  })

  it('never raises a part under the reader', () => {
    expect(maskTime('00', 'minute')).toBe('00')
    expect(maskTime('0000', 'minute')).toBe('00:00')
  })

  it('is empty for nothing', () => {
    expect(maskTime('', 'minute')).toBe('')
    expect(maskTime('abc', 'minute')).toBe('')
  })
})

describe('parseTime', () => {
  it('is the time those digits are', () => {
    expect(parseTime('14:30', 'minute')).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 0,
    })
  })

  it('reads the seconds when they are asked for', () => {
    expect(parseTime('14:30:45', 'second')).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 45,
    })
  })

  it('is null while the time is not finished', () => {
    expect(parseTime('14:3', 'minute')).toBeNull()
    expect(parseTime('14:30', 'second')).toBeNull()
    expect(parseTime('', 'minute')).toBeNull()
  })

  it('is null for a part that is out of range', () => {
    expect(parseTime('24:00', 'minute')).toBeNull()
    expect(parseTime('14:60', 'minute')).toBeNull()
  })

  it('puts the afternoon twelve hours on', () => {
    expect(parseTime('02:30', 'minute', 12, 'pm')?.hours).toBe(14)
    expect(parseTime('02:30', 'minute', 12, 'am')?.hours).toBe(2)
  })

  it('gets midnight and noon right, which the naive sum does not', () => {
    // 12 AM is midnight and 12 PM is noon — `hours + 12` makes them 24 and 12.
    expect(parseTime('12:00', 'minute', 12, 'am')?.hours).toBe(0)
    expect(parseTime('12:00', 'minute', 12, 'pm')?.hours).toBe(12)
  })
})

describe('formatTime', () => {
  it('is the inverse of parseTime', () => {
    expect(formatTime(new Date(2024, 0, 1, 14, 30), 'minute')).toBe('14:30')
    expect(formatTime(new Date(2024, 0, 1, 14, 30, 45), 'second')).toBe('14:30:45')
  })

  it('writes the afternoon as its twelve-hour half', () => {
    expect(formatTime(new Date(2024, 0, 1, 14, 30), 'minute', 12)).toBe('02:30')
  })

  it('writes midnight and noon as twelve, not as zero', () => {
    expect(formatTime(new Date(2024, 0, 1, 0, 5), 'minute', 12)).toBe('12:05')
    expect(formatTime(new Date(2024, 0, 1, 12, 5), 'minute', 12)).toBe('12:05')
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
