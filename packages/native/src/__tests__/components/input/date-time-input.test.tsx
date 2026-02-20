import { describe, it, expect } from 'vitest'
import type {
  DateInputProps,
  TimeInputProps,
  DateTimeInputProps,
  DateSeparator,
  DateOrder,
  TimeInputGranularity,
} from '../../../components/input'
import {
  getDateOrder,
  formatDateInput,
  formatTimeInput,
  getDatePlaceholder,
  getTimePlaceholder,
  getDateMaxLength,
  getTimeMaxLength,
  dateInputValueToDate,
  dateToDateInputValue,
  timeInputValueToDate,
  dateToTimeInputValue,
  dateTimeInputValueToDate,
  dateToDateTimeInputValue,
} from '../../../components/input/date-time-input.hook'

describe('Date/Time Input Types', () => {
  it('exports DateInputProps type with separator and dateOrder', () => {
    const props: DateInputProps = {
      separator: '/',
      dateOrder: 'DMY',
      locale: 'fr',
    }

    expect(props.separator).toBe('/')
    expect(props.dateOrder).toBe('DMY')
    expect(props.locale).toBe('fr')
  })

  it('exports TimeInputProps type with granularity and hourCycle', () => {
    const props: TimeInputProps = {
      granularity: 'second',
      hourCycle: 12,
    }

    expect(props.granularity).toBe('second')
    expect(props.hourCycle).toBe(12)
  })

  it('exports DateTimeInputProps type with all date and time props', () => {
    const props: DateTimeInputProps = {
      separator: '.',
      dateOrder: 'YMD',
      locale: 'ja',
      granularity: 'minute',
      hourCycle: 24,
    }

    expect(props.separator).toBe('.')
    expect(props.granularity).toBe('minute')
  })

  it('accepts all DateSeparator values', () => {
    const separators: DateSeparator[] = ['-', '/', '.']
    expect(separators).toHaveLength(3)
  })

  it('accepts all DateOrder values', () => {
    const orders: DateOrder[] = ['YMD', 'DMY', 'MDY']
    expect(orders).toHaveLength(3)
  })

  it('accepts all TimeInputGranularity values', () => {
    const granularities: TimeInputGranularity[] = ['minute', 'second']
    expect(granularities).toHaveLength(2)
  })
})

describe('getDateOrder', () => {
  it('returns MDY for en-US', () => {
    expect(getDateOrder('en-US')).toBe('MDY')
  })

  it('returns DMY for fr', () => {
    expect(getDateOrder('fr')).toBe('DMY')
  })

  it('returns YMD for ja', () => {
    expect(getDateOrder('ja')).toBe('YMD')
  })

  it('returns DMY for de', () => {
    expect(getDateOrder('de')).toBe('DMY')
  })

  it('returns YMD for ko', () => {
    expect(getDateOrder('ko')).toBe('YMD')
  })

  it('returns YMD for zh', () => {
    expect(getDateOrder('zh')).toBe('YMD')
  })
})

describe('formatDateInput', () => {
  it('formats YMD with dash separator', () => {
    expect(formatDateInput('20240115', 'YMD', '-')).toBe('2024-01-15')
  })

  it('formats DMY with slash separator', () => {
    expect(formatDateInput('15012024', 'DMY', '/')).toBe('15/01/2024')
  })

  it('formats MDY with dot separator', () => {
    expect(formatDateInput('01152024', 'MDY', '.')).toBe('01.15.2024')
  })

  it('handles partial input', () => {
    expect(formatDateInput('2024', 'YMD', '-')).toBe('2024')
    expect(formatDateInput('202401', 'YMD', '-')).toBe('2024-01')
  })

  it('strips non-digit characters', () => {
    expect(formatDateInput('2024/01/15', 'YMD', '-')).toBe('2024-01-15')
  })

  it('limits to 8 digits', () => {
    expect(formatDateInput('202401151234', 'YMD', '-')).toBe('2024-01-15')
  })
})

describe('formatTimeInput', () => {
  it('formats 24h minute granularity', () => {
    expect(formatTimeInput('1430', 'minute', 24)).toBe('14:30')
  })

  it('formats 24h second granularity', () => {
    expect(formatTimeInput('143025', 'second', 24)).toBe('14:30:25')
  })

  it('handles partial time input', () => {
    expect(formatTimeInput('14', 'minute', 24)).toBe('14')
    expect(formatTimeInput('143', 'minute', 24)).toBe('14:3')
  })

  it('strips non-digit characters for time', () => {
    expect(formatTimeInput('14:30', 'minute', 24)).toBe('14:30')
  })
})

describe('getDatePlaceholder', () => {
  it('returns YYYY-MM-DD for YMD with dash', () => {
    expect(getDatePlaceholder('YMD', '-')).toBe('YYYY-MM-DD')
  })

  it('returns DD/MM/YYYY for DMY with slash', () => {
    expect(getDatePlaceholder('DMY', '/')).toBe('DD/MM/YYYY')
  })

  it('returns MM.DD.YYYY for MDY with dot', () => {
    expect(getDatePlaceholder('MDY', '.')).toBe('MM.DD.YYYY')
  })
})

describe('getTimePlaceholder', () => {
  it('returns HH:mm for 24h minute', () => {
    expect(getTimePlaceholder('minute', 24)).toBe('HH:mm')
  })

  it('returns HH:mm:ss for 24h second', () => {
    expect(getTimePlaceholder('second', 24)).toBe('HH:mm:ss')
  })

  it('returns hh:mm AM for 12h minute', () => {
    expect(getTimePlaceholder('minute', 12)).toBe('hh:mm AM')
  })

  it('returns hh:mm:ss AM for 12h second', () => {
    expect(getTimePlaceholder('second', 12)).toBe('hh:mm:ss AM')
  })
})

describe('dateInputValueToDate', () => {
  it('parses DMY with slash', () => {
    const date = dateInputValueToDate('25/01/2024', 'DMY', '/')
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0)
    expect(date?.getDate()).toBe(25)
  })

  it('parses YMD with dash', () => {
    const date = dateInputValueToDate('2024-01-25', 'YMD', '-')
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0)
    expect(date?.getDate()).toBe(25)
  })

  it('parses MDY with dot', () => {
    const date = dateInputValueToDate('01.25.2024', 'MDY', '.')
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0)
    expect(date?.getDate()).toBe(25)
  })

  it('sets time to 00:00:00.000', () => {
    const date = dateInputValueToDate('25/01/2024', 'DMY', '/')
    expect(date?.getHours()).toBe(0)
    expect(date?.getMinutes()).toBe(0)
    expect(date?.getSeconds()).toBe(0)
    expect(date?.getMilliseconds()).toBe(0)
  })

  it('returns null for incomplete value', () => {
    expect(dateInputValueToDate('25/01', 'DMY', '/')).toBeNull()
  })

  it('returns null for invalid date', () => {
    expect(dateInputValueToDate('31/02/2024', 'DMY', '/')).toBeNull()
  })

  it('returns null for NaN segments', () => {
    expect(dateInputValueToDate('aa/bb/cccc', 'DMY', '/')).toBeNull()
  })
})

describe('dateToDateInputValue', () => {
  it('formats Date to DMY with slash', () => {
    expect(dateToDateInputValue(new Date(2024, 0, 25), 'DMY', '/')).toBe('25/01/2024')
  })

  it('formats Date to YMD with dash', () => {
    expect(dateToDateInputValue(new Date(2024, 0, 25), 'YMD', '-')).toBe('2024-01-25')
  })

  it('formats Date to MDY with dot', () => {
    expect(dateToDateInputValue(new Date(2024, 0, 25), 'MDY', '.')).toBe('01.25.2024')
  })

  it('accepts an ISO string', () => {
    expect(dateToDateInputValue('2024-01-25T00:00:00.000Z', 'YMD', '-')).toMatch(/2024-01-2[45]/)
  })

  it('returns empty string for invalid date', () => {
    expect(dateToDateInputValue('not-a-date', 'DMY', '/')).toBe('')
  })

  it('round-trips with dateInputValueToDate', () => {
    const original = new Date(2024, 5, 15)
    const value = dateToDateInputValue(original, 'DMY', '/')
    const parsed = dateInputValueToDate(value, 'DMY', '/')
    expect(parsed?.getFullYear()).toBe(2024)
    expect(parsed?.getMonth()).toBe(5)
    expect(parsed?.getDate()).toBe(15)
  })
})

describe('timeInputValueToDate', () => {
  it('parses 24h minute value', () => {
    const date = timeInputValueToDate('14:30')
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
    expect(date?.getSeconds()).toBe(0)
  })

  it('parses 24h second value', () => {
    const date = timeInputValueToDate('14:30:45')
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
    expect(date?.getSeconds()).toBe(45)
  })

  it('parses 12h PM value', () => {
    const date = timeInputValueToDate('02:30 PM', { hourCycle: 12 })
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
  })

  it('parses 12h AM value', () => {
    const date = timeInputValueToDate('12:00 AM', { hourCycle: 12 })
    expect(date?.getHours()).toBe(0)
  })

  it('parses 12h noon (12 PM)', () => {
    const date = timeInputValueToDate('12:00 PM', { hourCycle: 12 })
    expect(date?.getHours()).toBe(12)
  })

  it('sets milliseconds to 0', () => {
    const date = timeInputValueToDate('10:00')
    expect(date?.getMilliseconds()).toBe(0)
  })

  it('returns null for invalid value', () => {
    expect(timeInputValueToDate('ab:cd')).toBeNull()
  })
})

describe('dateToTimeInputValue', () => {
  it('formats 24h minute', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 14, 30, 0))).toBe('14:30')
  })

  it('formats 24h second', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 14, 30, 45), { granularity: 'second' })).toBe('14:30:45')
  })

  it('formats 12h PM minute', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 14, 30, 0), { hourCycle: 12 })).toBe('02:30 PM')
  })

  it('formats 12h AM minute', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 2, 30, 0), { hourCycle: 12 })).toBe('02:30 AM')
  })

  it('formats noon as 12 PM', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 12, 0, 0), { hourCycle: 12 })).toBe('12:00 PM')
  })

  it('formats midnight as 12 AM', () => {
    expect(dateToTimeInputValue(new Date(2024, 0, 1, 0, 0, 0), { hourCycle: 12 })).toBe('12:00 AM')
  })

  it('returns empty string for invalid date', () => {
    expect(dateToTimeInputValue('not-a-date')).toBe('')
  })

  it('round-trips with timeInputValueToDate', () => {
    const original = new Date(2024, 0, 1, 9, 15, 0)
    const value = dateToTimeInputValue(original)
    const parsed = timeInputValueToDate(value)
    expect(parsed?.getHours()).toBe(9)
    expect(parsed?.getMinutes()).toBe(15)
  })
})

describe('dateTimeInputValueToDate', () => {
  it('parses DMY slash 24h', () => {
    const date = dateTimeInputValueToDate('25/01/2024 14:30', 'DMY', { separator: '/' })
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0)
    expect(date?.getDate()).toBe(25)
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
  })

  it('parses YMD dash 12h PM', () => {
    const date = dateTimeInputValueToDate('2024-01-25 02:30 PM', 'YMD', { separator: '-', hourCycle: 12 })
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
  })

  it('returns null when date part is invalid', () => {
    expect(dateTimeInputValueToDate('31/02/2024 10:00', 'DMY', { separator: '/' })).toBeNull()
  })

  it('returns null when no space separator', () => {
    expect(dateTimeInputValueToDate('25/01/2024', 'DMY', { separator: '/' })).toBeNull()
  })
})

describe('dateToDateTimeInputValue', () => {
  it('formats DMY slash 24h minute', () => {
    const d = new Date(2024, 0, 25, 14, 30, 0)
    expect(dateToDateTimeInputValue(d, 'DMY', { separator: '/' })).toBe('25/01/2024 14:30')
  })

  it('formats YMD dash 12h second', () => {
    const d = new Date(2024, 0, 25, 14, 30, 45)
    const value = dateToDateTimeInputValue(d, 'YMD', { separator: '-', granularity: 'second', hourCycle: 12 })
    expect(value).toBe('2024-01-25 02:30:45 PM')
  })

  it('returns empty string for invalid date', () => {
    expect(dateToDateTimeInputValue('not-a-date', 'DMY')).toBe('')
  })

  it('round-trips with dateTimeInputValueToDate', () => {
    const original = new Date(2024, 5, 15, 9, 45, 0)
    const opts = { separator: '/' as const, granularity: 'minute' as const, hourCycle: 24 as const }
    const value = dateToDateTimeInputValue(original, 'DMY', opts)
    const parsed = dateTimeInputValueToDate(value, 'DMY', opts)
    expect(parsed?.getFullYear()).toBe(2024)
    expect(parsed?.getMonth()).toBe(5)
    expect(parsed?.getDate()).toBe(15)
    expect(parsed?.getHours()).toBe(9)
    expect(parsed?.getMinutes()).toBe(45)
  })
})

describe('getDateMaxLength', () => {
  it('returns 10 for single-char separator', () => {
    expect(getDateMaxLength('-')).toBe(10)
    expect(getDateMaxLength('/')).toBe(10)
    expect(getDateMaxLength('.')).toBe(10)
  })
})

describe('getTimeMaxLength', () => {
  it('returns 5 for 24h minute', () => {
    expect(getTimeMaxLength('minute', 24)).toBe(5)
  })

  it('returns 8 for 24h second', () => {
    expect(getTimeMaxLength('second', 24)).toBe(8)
  })

  it('returns 8 for 12h minute', () => {
    expect(getTimeMaxLength('minute', 12)).toBe(8)
  })

  it('returns 11 for 12h second', () => {
    expect(getTimeMaxLength('second', 12)).toBe(11)
  })
})
