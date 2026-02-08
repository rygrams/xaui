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
