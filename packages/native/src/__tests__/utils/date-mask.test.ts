import { describe, expect, it } from 'vitest'
import {
  dateOrderFor,
  dateSeparatorFor,
  datePlaceholder,
  formatDate,
  maskDate,
  parseDate,
} from '../../utils/date-mask'

const LABELS = { day: 'DD', month: 'MM', year: 'YYYY' }

describe('dateOrderFor', () => {
  it('reads the order out of the locale', () => {
    expect(dateOrderFor('fr-FR')).toBe('DMY')
    expect(dateOrderFor('en-US')).toBe('MDY')
    expect(dateOrderFor('ja-JP')).toBe('YMD')
  })

  it('always names one of the three, whatever it is handed', () => {
    // A tag `Intl` does not know resolves through its own fallback rather than reaching the
    // one here — which is the right outcome and the reason the fallback is untestable: it
    // exists for a formatter that yields parts in an order none of the three describe.
    for (const locale of ['zz-ZZ', 'en', 'ar-EG', 'hu-HU']) {
      expect(['DMY', 'MDY', 'YMD']).toContain(dateOrderFor(locale))
    }
  })
})

describe('dateSeparatorFor', () => {
  it('reads the separator out of the locale', () => {
    expect(dateSeparatorFor('fr-FR')).toBe('/')
    expect(dateSeparatorFor('de-DE')).toBe('.')
  })
})

describe('datePlaceholder', () => {
  it('writes the parts in the order they are typed', () => {
    expect(datePlaceholder('DMY', '/', LABELS)).toBe('DD/MM/YYYY')
    expect(datePlaceholder('MDY', '/', LABELS)).toBe('MM/DD/YYYY')
    expect(datePlaceholder('YMD', '-', LABELS)).toBe('YYYY-MM-DD')
  })
})

describe('maskDate', () => {
  it('puts the separators in as the parts fill', () => {
    expect(maskDate('0', 'DMY', '/')).toBe('0')
    expect(maskDate('04', 'DMY', '/')).toBe('04')
    expect(maskDate('047', 'DMY', '/')).toBe('04/7')
    expect(maskDate('04071995', 'DMY', '/')).toBe('04/07/1995')
  })

  it('keeps only the digits, whatever else arrives', () => {
    // A paste, a keyboard with its own punctuation, a backspace over a separator — one
    // representation, and this is the only thing that turns it into text.
    expect(maskDate('04/07/1995', 'DMY', '/')).toBe('04/07/1995')
    expect(maskDate('04-07-1995', 'DMY', '.')).toBe('04.07.1995')
    // The separator is put back rather than kept, so pasting one shape into a field that
    // writes another lands correctly instead of doubling the marks.
    expect(maskDate('1995.07.04', 'YMD', '-')).toBe('1995-07-04')
  })

  it('stops at eight digits', () => {
    expect(maskDate('040719950000', 'DMY', '/')).toBe('04/07/1995')
  })

  it('is empty for nothing', () => {
    expect(maskDate('', 'DMY', '/')).toBe('')
    expect(maskDate('abc', 'DMY', '/')).toBe('')
  })

  it('follows the order it was given', () => {
    expect(maskDate('07041995', 'MDY', '/')).toBe('07/04/1995')
    expect(maskDate('19950704', 'YMD', '-')).toBe('1995-07-04')
  })

  it('caps a month once it is complete, and not before', () => {
    // `9` on its way to `09` is left alone; `95` is not a month anyone meant.
    expect(maskDate('049', 'DMY', '/')).toBe('04/9')
    expect(maskDate('0495', 'DMY', '/')).toBe('04/12')
  })

  it('caps a day at 31 while the month is unknown', () => {
    expect(maskDate('99', 'DMY', '/')).toBe('31')
  })

  it('caps a day at the length of its month once the month is known', () => {
    // The month comes first in MDY, so February is already on the table.
    expect(maskDate('0231', 'MDY', '/')).toBe('02/29')
    expect(maskDate('19950231', 'YMD', '-')).toBe('1995-02-28')
    expect(maskDate('20000231', 'YMD', '-')).toBe('2000-02-29')
  })

  it('never raises a part under the reader', () => {
    // Halfway through `01`, the reader has typed a zero. Moving it loses the keystroke.
    expect(maskDate('00', 'DMY', '/')).toBe('00')
    expect(maskDate('0100', 'DMY', '/')).toBe('01/00')
  })
})

describe('parseDate', () => {
  it('is the date those digits are', () => {
    const date = parseDate('04/07/1995', 'DMY')

    expect(date?.getFullYear()).toBe(1995)
    expect(date?.getMonth()).toBe(6)
    expect(date?.getDate()).toBe(4)
  })

  it('reads each order the way it is written', () => {
    expect(parseDate('07/04/1995', 'MDY')?.getDate()).toBe(4)
    expect(parseDate('1995-07-04', 'YMD')?.getDate()).toBe(4)
  })

  it('is null while the date is not finished', () => {
    expect(parseDate('04/07/19', 'DMY')).toBeNull()
    expect(parseDate('', 'DMY')).toBeNull()
  })

  it('is null for a day that does not exist', () => {
    // The one thing a mask cannot catch on its own: 31 typed before the month.
    expect(parseDate('31/02/1995', 'DMY')).toBeNull()
    expect(parseDate('29/02/1995', 'DMY')).toBeNull()
    expect(parseDate('29/02/1996', 'DMY')).not.toBeNull()
  })

  it('is null for a month that does not exist', () => {
    expect(parseDate('04/00/1995', 'DMY')).toBeNull()
    expect(parseDate('04/13/1995', 'DMY')).toBeNull()
  })

  it('takes a year as written rather than guessing a century', () => {
    // `new Date(23, …)` is 1923, which is the trap this exists to avoid.
    expect(parseDate('04/07/0023', 'DMY')?.getFullYear()).toBe(23)
  })
})

describe('formatDate', () => {
  it('is the inverse of parseDate', () => {
    const text = '04/07/1995'
    const date = parseDate(text, 'DMY')

    expect(date && formatDate(date, 'DMY', '/')).toBe(text)
  })

  it('pads every part', () => {
    expect(formatDate(new Date(823, 0, 2), 'YMD', '-')).toBe('0823-01-02')
  })

  it('writes the order it is given', () => {
    const date = new Date(1995, 6, 4)

    expect(formatDate(date, 'MDY', '/')).toBe('07/04/1995')
    expect(formatDate(date, 'DMY', '.')).toBe('04.07.1995')
  })
})
