import { describe, expect, it } from 'vitest'
import {
  dateRangeLength,
  dateRangePlaceholder,
  formatDateRange,
  isSameRange,
  maskDateRange,
  parseDateRange,
} from '../../utils/date-range-mask'

const LABELS = { day: 'DD', month: 'MM', year: 'YYYY' }

describe('dateRangeLength', () => {
  it('is two dates and what is between them', () => {
    expect(dateRangeLength()).toBe(23)
  })
})

describe('dateRangePlaceholder', () => {
  it('writes the shape twice', () => {
    expect(dateRangePlaceholder('DMY', '/', LABELS)).toBe('DD/MM/YYYY – DD/MM/YYYY')
  })

  it('uses an en dash, not a hyphen', () => {
    // A hyphen is already the date separator in half the locales this field serves.
    expect(dateRangePlaceholder('YMD', '-', LABELS)).toBe('YYYY-MM-DD – YYYY-MM-DD')
  })
})

describe('maskDateRange', () => {
  it('fills the first date, then the second', () => {
    expect(maskDateRange('0407', 'DMY', '/')).toBe('04/07')
    expect(maskDateRange('04071995', 'DMY', '/')).toBe('04/07/1995')
    expect(maskDateRange('040719951', 'DMY', '/')).toBe('04/07/1995 – 1')
    expect(maskDateRange('0407199511071995', 'DMY', '/')).toBe(
      '04/07/1995 – 11/07/1995'
    )
  })

  it('keeps the rules of the mask it is made of, at both ends', () => {
    expect(maskDateRange('0495199509951995', 'DMY', '/')).toBe(
      '04/12/1995 – 09/12/1995'
    )
  })

  it('keeps only the digits, whatever else arrives', () => {
    expect(maskDateRange('04/07/1995 – 11/07/1995', 'DMY', '/')).toBe(
      '04/07/1995 – 11/07/1995'
    )
    expect(maskDateRange('04.07.1995 au 11.07.1995', 'DMY', '/')).toBe(
      '04/07/1995 – 11/07/1995'
    )
  })

  it('stops at sixteen digits', () => {
    expect(maskDateRange('04071995110719950000', 'DMY', '/')).toBe(
      '04/07/1995 – 11/07/1995'
    )
  })

  it('is empty for nothing', () => {
    expect(maskDateRange('', 'DMY', '/')).toBe('')
    expect(maskDateRange('abc', 'DMY', '/')).toBe('')
  })
})

describe('parseDateRange', () => {
  it('reads the two ends independently', () => {
    // A reader who has finished the start and is halfway through the end has a start.
    const half = parseDateRange('04/07/1995 – 11', 'DMY')

    expect(half.start?.getDate()).toBe(4)
    expect(half.end).toBeNull()
  })

  it('reads a whole range', () => {
    const range = parseDateRange('04/07/1995 – 11/07/1995', 'DMY')

    expect(range.start?.getDate()).toBe(4)
    expect(range.end?.getDate()).toBe(11)
  })

  it('is two nulls for nothing', () => {
    expect(parseDateRange('', 'DMY')).toEqual({ start: null, end: null })
  })

  it('leaves an end that is not a real day as null', () => {
    expect(parseDateRange('04/07/1995 – 31/02/1995', 'DMY').end).toBeNull()
  })

  it('does not decide whether the end is after the start', () => {
    // That is a rule about the range, not about what was typed, and it differs by feature.
    const backwards = parseDateRange('11/07/1995 – 04/07/1995', 'DMY')

    expect(backwards.start).not.toBeNull()
    expect(backwards.end).not.toBeNull()
  })
})

describe('formatDateRange', () => {
  it('is the inverse of parseDateRange', () => {
    const text = '04/07/1995 – 11/07/1995'

    expect(formatDateRange(parseDateRange(text, 'DMY'), 'DMY', '/')).toBe(text)
  })

  it('writes a start with no end as just the start', () => {
    expect(
      formatDateRange({ start: new Date(1995, 6, 4), end: null }, 'DMY', '/')
    ).toBe('04/07/1995')
  })

  it('is empty without a start, whatever the end says', () => {
    // There is nowhere to write an end: the dash would have nothing before it.
    expect(
      formatDateRange({ start: null, end: new Date(1995, 6, 11) }, 'DMY', '/')
    ).toBe('')
  })
})

describe('isSameRange', () => {
  it('compares both ends, absent or not', () => {
    const a = { start: new Date(1995, 6, 4), end: new Date(1995, 6, 11) }

    expect(isSameRange(a, { ...a })).toBe(true)
    expect(isSameRange(a, { ...a, end: null })).toBe(false)
    expect(isSameRange({ start: null, end: null }, { start: null, end: null })).toBe(
      true
    )
  })
})
