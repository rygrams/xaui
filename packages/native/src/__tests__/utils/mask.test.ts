import { describe, expect, it } from 'vitest'
import {
  dateOrderFor,
  dateSeparatorFor,
  formatMaskedDate,
  formatMaskedTime,
  maskInput,
  parseMaskedDate,
  parseMaskedTime,
  resolveMask,
} from '../../utils/mask'

const dateMask = (
  locale = 'en-US',
  order?: 'DMY' | 'MDY' | 'YMD',
  separator?: string
) => resolveMask('date', { locale, order, separator })

const iso = resolveMask('date', { order: 'YMD', separator: '-' })

describe('dateOrderFor', () => {
  it('reads the order out of the locale', () => {
    expect(dateOrderFor('fr-FR')).toBe('DMY')
    expect(dateOrderFor('en-US')).toBe('MDY')
    expect(dateOrderFor('ja-JP')).toBe('YMD')
  })

  it('always names one of the three, whatever it is handed', () => {
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

describe('resolveMask', () => {
  it('gives the date presets a locale-driven order and separator', () => {
    expect(resolveMask('date', { locale: 'fr-FR' }).placeholder).toBe('DD/MM/YYYY')
    expect(resolveMask('date', { locale: 'en-US' }).placeholder).toBe('MM/DD/YYYY')
    expect(resolveMask('date', { locale: 'de-DE' }).placeholder).toBe('DD.MM.YYYY')
    expect(resolveMask('date', { order: 'YMD', separator: '-' }).placeholder).toBe(
      'YYYY-MM-DD'
    )
  })

  it('names the date parts from `labels`', () => {
    const mask = resolveMask('date', {
      locale: 'fr-FR',
      labels: { day: 'JJ', month: 'MM', year: 'AAAA' },
    })
    expect(mask.placeholder).toBe('JJ/MM/AAAA')
  })

  it('builds the fixed presets', () => {
    expect(resolveMask('time').placeholder).toBe('HH:MM')
    expect(resolveMask('credit-card').placeholder).toBe('#### #### #### ####')
    expect(resolveMask('credit-card').length).toBe(19)
  })

  it('reads any other string as a pattern', () => {
    const mask = resolveMask('+33 # ## ## ## ##')
    expect(mask.placeholder).toBe('+33 # ## ## ## ##')
    expect(mask.length).toBe('+33 # ## ## ## ##'.length)
  })

  it('takes the number pad only when every fill is digits', () => {
    expect(resolveMask('date', { locale: 'fr-FR' }).keyboard).toBe('number-pad')
    expect(resolveMask('credit-card').keyboard).toBe('number-pad')
    expect(resolveMask('AAA-###').keyboard).toBe('default')
  })
})

describe('maskInput — date', () => {
  it('puts the separators in as the parts fill', () => {
    const fr = dateMask('fr-FR')
    expect(maskInput('0', fr)).toBe('0')
    expect(maskInput('04', fr)).toBe('04')
    expect(maskInput('047', fr)).toBe('04/7')
    expect(maskInput('04071995', fr)).toBe('04/07/1995')
  })

  it('keeps only the digits, whatever else arrives', () => {
    expect(maskInput('04/07/1995', dateMask('fr-FR'))).toBe('04/07/1995')
    expect(maskInput('04-07-1995', dateMask('de-DE'))).toBe('04.07.1995')
    // The separator is put back rather than kept, so pasting one shape into a field that
    // writes another lands correctly instead of doubling the marks.
    expect(maskInput('1995.07.04', iso)).toBe('1995-07-04')
  })

  it('stops at the end of the shape', () => {
    expect(maskInput('040719950000', dateMask('fr-FR'))).toBe('04/07/1995')
  })

  it('is empty for nothing', () => {
    expect(maskInput('', dateMask('fr-FR'))).toBe('')
    expect(maskInput('abc', dateMask('fr-FR'))).toBe('')
  })

  it('follows the order it was given', () => {
    expect(maskInput('07041995', dateMask('en-US'))).toBe('07/04/1995')
    expect(maskInput('19950704', iso)).toBe('1995-07-04')
  })

  it('caps a month once it is complete, and not before', () => {
    expect(maskInput('049', dateMask('fr-FR'))).toBe('04/9')
    expect(maskInput('0495', dateMask('fr-FR'))).toBe('04/12')
  })

  it('caps a day at 31 while the month is unknown', () => {
    expect(maskInput('99', dateMask('fr-FR'))).toBe('31')
  })

  it('caps a day at the length of its month once the month is known', () => {
    expect(maskInput('0231', dateMask('en-US'))).toBe('02/29')
    expect(maskInput('19950231', iso)).toBe('1995-02-28')
    expect(maskInput('20000231', iso)).toBe('2000-02-29')
  })

  it('never raises a part under the reader', () => {
    expect(maskInput('00', dateMask('fr-FR'))).toBe('00')
    expect(maskInput('0100', dateMask('fr-FR'))).toBe('01/00')
  })
})

describe('maskInput — time', () => {
  const time = resolveMask('time')

  it('writes HH:MM as it fills', () => {
    expect(maskInput('9', time)).toBe('9')
    expect(maskInput('09', time)).toBe('09')
    expect(maskInput('095', time)).toBe('09:5')
    expect(maskInput('0930', time)).toBe('09:30')
  })

  it('caps the hour at 23 and the minute at 59', () => {
    expect(maskInput('99', time)).toBe('23')
    expect(maskInput('2399', time)).toBe('23:59')
  })
})

describe('maskInput — credit-card and patterns', () => {
  it('groups a card into four', () => {
    const card = resolveMask('credit-card')
    expect(maskInput('4111', card)).toBe('4111')
    expect(maskInput('41111111', card)).toBe('4111 1111')
    expect(maskInput('4111111111111111', card)).toBe('4111 1111 1111 1111')
    expect(maskInput('41111111111111119999', card)).toBe('4111 1111 1111 1111')
  })

  it('puts a pattern literal back once there is a part after it', () => {
    const phone = resolveMask('+33 # ## ## ## ##')
    expect(maskInput('', phone)).toBe('')
    expect(maskInput('6', phone)).toBe('+33 6')
    expect(maskInput('612345678', phone)).toBe('+33 6 12 34 56 78')
  })

  it('keeps only the characters a pattern accepts', () => {
    expect(maskInput('ab-12-cd', resolveMask('AA ## AA'))).toBe('ab 12 cd')
    expect(maskInput('a1b2c3', resolveMask('*** ***'))).toBe('a1b 2c3')
  })

  it('is idempotent — run over its own output, it does not move', () => {
    // The controlled path feeds the masked value straight back on every render, and a
    // pattern with digits in a literal (`+33`) would eat them a second time without this.
    for (const [mask, input] of [
      [resolveMask('+33 # ## ## ## ##'), '612345678'],
      [resolveMask('credit-card'), '4111111111111111'],
      [dateMask('fr-FR'), '04071995'],
      [dateMask('de-DE'), '04-07-1995'],
      [resolveMask('time'), '0930'],
      [resolveMask('AA## ####'), 'ab12cd34'],
    ] as const) {
      const once = maskInput(input, mask)
      expect(maskInput(once, mask)).toBe(once)
    }
  })
})

describe('parseMaskedDate', () => {
  it('is the date those digits are', () => {
    const date = parseMaskedDate('04/07/1995', 'fr-FR')
    expect(date?.getFullYear()).toBe(1995)
    expect(date?.getMonth()).toBe(6)
    expect(date?.getDate()).toBe(4)
  })

  it('reads each order the way it is written', () => {
    expect(parseMaskedDate('07/04/1995', 'en-US')?.getDate()).toBe(4)
    expect(parseMaskedDate('1995-07-04', 'ja-JP')?.getDate()).toBe(4)
  })

  it('is null while the date is not finished', () => {
    expect(parseMaskedDate('04/07/19', 'fr-FR')).toBeNull()
    expect(parseMaskedDate('', 'fr-FR')).toBeNull()
  })

  it('is null for a day that does not exist', () => {
    expect(parseMaskedDate('31/02/1995', 'fr-FR')).toBeNull()
    expect(parseMaskedDate('29/02/1995', 'fr-FR')).toBeNull()
    expect(parseMaskedDate('29/02/1996', 'fr-FR')).not.toBeNull()
  })

  it('is null for a month that does not exist', () => {
    expect(parseMaskedDate('04/00/1995', 'fr-FR')).toBeNull()
    expect(parseMaskedDate('04/13/1995', 'fr-FR')).toBeNull()
  })

  it('takes a year as written rather than guessing a century', () => {
    expect(parseMaskedDate('04/07/0023', 'fr-FR')?.getFullYear()).toBe(23)
  })
})

describe('formatMaskedDate', () => {
  it('is the inverse of parseMaskedDate', () => {
    const text = '04/07/1995'
    const date = parseMaskedDate(text, 'fr-FR')
    expect(date && formatMaskedDate(date, 'fr-FR')).toBe(text)
  })

  it('pads every part', () => {
    expect(formatMaskedDate(new Date(823, 0, 2), 'en-US', 'YMD', '-')).toBe(
      '0823-01-02'
    )
  })

  it('writes the order it is given', () => {
    const date = new Date(1995, 6, 4)
    expect(formatMaskedDate(date, 'en-US')).toBe('07/04/1995')
    expect(formatMaskedDate(date, 'de-DE')).toBe('04.07.1995')
  })
})

describe('parseMaskedTime / formatMaskedTime', () => {
  it('is the hours and minutes those digits are', () => {
    expect(parseMaskedTime('09:30')).toEqual({ hours: 9, minutes: 30 })
  })

  it('is null while it is not both, or out of range', () => {
    expect(parseMaskedTime('09:3')).toBeNull()
    expect(parseMaskedTime('24:00')).toBeNull()
    expect(parseMaskedTime('12:60')).toBeNull()
  })

  it('is the inverse of the parse', () => {
    expect(formatMaskedTime({ hours: 9, minutes: 5 })).toBe('09:05')
  })
})
