import { describe, expect, it } from 'vitest'
import {
  OTP_DIGITS,
  buildSlots,
  extractPastedCode,
  faintLine,
  isPaste,
  nextCode,
} from '../../../components/input-otp/input-otp.utils'

describe('buildSlots', () => {
  it('makes the box after the last character the active one while focused', () => {
    const slots = buildSlots({ value: '48', maxLength: 4, isFocused: true })

    expect(slots.map(s => s.char)).toEqual(['4', '8', null, null])
    expect(slots.map(s => s.isActive)).toEqual([false, false, true, false])
    expect(slots[2].isCaretVisible).toBe(true)
  })

  it('has no active box when the code is full, or when the field is not focused', () => {
    expect(
      buildSlots({ value: '4829', maxLength: 4, isFocused: true }).some(
        s => s.isActive
      )
    ).toBe(false)
    expect(
      buildSlots({ value: '48', maxLength: 4, isFocused: false }).some(
        s => s.isActive
      )
    ).toBe(false)
  })

  it('shows the placeholder only where there is neither a character nor the caret', () => {
    const repeated = buildSlots({
      value: '4',
      maxLength: 3,
      isFocused: true,
      placeholder: '·',
    })
    expect(repeated.map(s => s.placeholderChar)).toEqual([null, null, '·'])

    const perBox = buildSlots({
      value: '',
      maxLength: 3,
      isFocused: false,
      placeholder: 'abc',
    })
    expect(perBox.map(s => s.placeholderChar)).toEqual(['a', 'b', 'c'])
  })
})

describe('extractPastedCode', () => {
  it('finds the code in a message, not a number next to it', () => {
    expect(extractPastedCode('Your code is 482913, valid 10 minutes', 6)).toBe(
      '482913'
    )
  })

  it('ignores a longer run of digits and returns nothing when there is no code', () => {
    expect(extractPastedCode('order 12345678', 6)).toBe('')
    expect(extractPastedCode('hello', 6)).toBe('')
  })
})

describe('isPaste', () => {
  it('reads a jump of more than one character as a paste', () => {
    expect(isPaste('482', '4')).toBe(true)
    expect(isPaste('48', '4')).toBe(false)
    expect(isPaste('4', '48')).toBe(false)
  })
})

describe('nextCode', () => {
  const digits = new RegExp(OTP_DIGITS)

  it('takes a keystroke as typed', () => {
    expect(nextCode('48', '4', 6, digits)).toBe('48')
  })

  it('refuses a value the pattern rejects', () => {
    expect(nextCode('4a', '4', 6, digits)).toBeNull()
  })

  it('always lets the last character be deleted', () => {
    expect(nextCode('', '4', 6, digits)).toBe('')
  })

  it('searches a paste for the code and cuts to the length', () => {
    expect(nextCode('code: 482913', '', 6, digits)).toBe('482913')
    expect(nextCode('483', '48', 2, null)).toBe('48')
    expect(nextCode('4829', '4', 3, null)).toBe('')
  })
})

describe('faintLine', () => {
  it('flattens a share of the line over the ground into one opaque colour', () => {
    expect(faintLine('#FFFFFF', '#000000', 0.6)).toBe('#999999')
    expect(faintLine('#A3A3A3', '#000000', 1)).toBe('#A3A3A3')
    expect(faintLine('#666666', '#FFFFFF', 0)).toBe('#FFFFFF')
  })
})
