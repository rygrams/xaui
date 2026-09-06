import { describe, expect, it } from 'vitest'
import {
  dateTimeLength,
  dateTimePlaceholder,
  formatDateTime,
  maskDateTime,
  parseDateTime,
} from '../../utils/date-time-mask'
import type { DateTimeShape } from '../../utils/date-time-mask'

const DMY: DateTimeShape = {
  order: 'DMY',
  separator: '/',
  granularity: 'minute',
  hourCycle: 24,
}

const LABELS = {
  date: { day: 'DD', month: 'MM', year: 'YYYY' },
  time: { hours: 'HH', minutes: 'mm', seconds: 'ss' },
}

describe('dateTimeLength', () => {
  it('is the date, a space and the time', () => {
    expect(dateTimeLength('minute')).toBe(16)
    expect(dateTimeLength('second')).toBe(19)
  })
})

describe('dateTimePlaceholder', () => {
  it('writes both shapes with a space between them', () => {
    expect(dateTimePlaceholder(DMY, LABELS)).toBe('DD/MM/YYYY HH:mm')
    expect(
      dateTimePlaceholder(
        { ...DMY, order: 'YMD', separator: '-', granularity: 'second' },
        LABELS
      )
    ).toBe('YYYY-MM-DD HH:mm:ss')
  })
})

describe('maskDateTime', () => {
  it('fills the date first, then the time', () => {
    expect(maskDateTime('0407', DMY)).toBe('04/07')
    expect(maskDateTime('04071995', DMY)).toBe('04/07/1995')
    expect(maskDateTime('040719951', DMY)).toBe('04/07/1995 1')
    expect(maskDateTime('0407199514', DMY)).toBe('04/07/1995 14')
    expect(maskDateTime('040719951430', DMY)).toBe('04/07/1995 14:30')
  })

  it('keeps the rules of both masks it is made of', () => {
    // The month capped at 12 and the minutes at 59, from the two masks it is made of.
    expect(maskDateTime('0495199514753', DMY)).toBe('04/12/1995 14:59')
  })

  it('keeps only the digits, whatever else arrives', () => {
    expect(maskDateTime('04/07/1995 14:30', DMY)).toBe('04/07/1995 14:30')
    expect(maskDateTime('04-07-1995T14h30', DMY)).toBe('04/07/1995 14:30')
  })

  it('stops at the parts it was asked for', () => {
    expect(maskDateTime('04071995143045', DMY)).toBe('04/07/1995 14:30')
    expect(maskDateTime('04071995143045', { ...DMY, granularity: 'second' })).toBe(
      '04/07/1995 14:30:45'
    )
  })

  it('is empty for nothing', () => {
    expect(maskDateTime('', DMY)).toBe('')
    expect(maskDateTime('abc', DMY)).toBe('')
  })
})

describe('parseDateTime', () => {
  it('is the moment those digits are', () => {
    const moment = parseDateTime('04/07/1995 14:30', DMY)

    expect(moment?.getFullYear()).toBe(1995)
    expect(moment?.getMonth()).toBe(6)
    expect(moment?.getDate()).toBe(4)
    expect(moment?.getHours()).toBe(14)
    expect(moment?.getMinutes()).toBe(30)
  })

  it('is null while either half is unfinished', () => {
    expect(parseDateTime('04/07/1995', DMY)).toBeNull()
    expect(parseDateTime('04/07/1995 14', DMY)).toBeNull()
    expect(
      parseDateTime('04/07/1995 14:30', { ...DMY, granularity: 'second' })
    ).toBeNull()
  })

  it('is null when either half is not real', () => {
    expect(parseDateTime('31/02/1995 14:30', DMY)).toBeNull()
    expect(parseDateTime('04/07/1995 24:30', DMY)).toBeNull()
  })

  it('puts the afternoon twelve hours on', () => {
    expect(
      parseDateTime('04/07/1995 02:30', { ...DMY, hourCycle: 12 }, 'pm')?.getHours()
    ).toBe(14)
  })
})

describe('formatDateTime', () => {
  it('is the inverse of parseDateTime', () => {
    const text = '04/07/1995 14:30'

    expect(formatDateTime(parseDateTime(text, DMY) as Date, DMY)).toBe(text)
  })

  it('writes the shape it is given', () => {
    const moment = new Date(1995, 6, 4, 14, 30, 45)

    expect(
      formatDateTime(moment, {
        ...DMY,
        order: 'YMD',
        separator: '-',
        granularity: 'second',
      })
    ).toBe('1995-07-04 14:30:45')
    expect(formatDateTime(moment, { ...DMY, hourCycle: 12 })).toBe(
      '04/07/1995 02:30'
    )
  })
})
