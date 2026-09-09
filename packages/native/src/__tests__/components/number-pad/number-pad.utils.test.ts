import { describe, expect, it } from 'vitest'
import {
  NUMBER_PAD_ROWS,
  appendKey,
  isComplete,
  removeLast,
} from '../../../components/number-pad/number-pad.utils'

describe('NUMBER_PAD_ROWS', () => {
  it('is three rows of three, one to nine in order', () => {
    expect(NUMBER_PAD_ROWS.flat()).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ])
  })
})

describe('appendKey', () => {
  it('appends when there is no limit', () => {
    expect(appendKey({ value: '12', insert: '3' })).toBe('123')
  })

  it('appends up to the limit', () => {
    expect(appendKey({ value: '123', insert: '4', maxLength: 4 })).toBe('1234')
  })

  it('clamps rather than truncating, so the value is unchanged at the limit', () => {
    expect(appendKey({ value: '1234', insert: '5', maxLength: 4 })).toBe('1234')
  })

  /**
   * The case the whole-insert measurement exists for: a `00` key that would land halfway
   * over the limit must not land at all, or the value ends up one character longer than the
   * pad promised.
   */
  it('refuses a multi-character key that would cross the limit', () => {
    expect(appendKey({ value: '123', insert: '00', maxLength: 4 })).toBe('123')
    expect(appendKey({ value: '12', insert: '00', maxLength: 4 })).toBe('1200')
  })

  it('treats a zero limit as accepting nothing', () => {
    expect(appendKey({ value: '', insert: '1', maxLength: 0 })).toBe('')
  })
})

describe('removeLast', () => {
  it('drops the last character', () => {
    expect(removeLast('123')).toBe('12')
  })

  it('leaves an empty value empty', () => {
    expect(removeLast('')).toBe('')
  })
})

describe('isComplete', () => {
  it('is false with no limit, however long the value', () => {
    expect(isComplete('123456')).toBe(false)
  })

  it('is true once the value reaches the limit', () => {
    expect(isComplete('1234', 4)).toBe(true)
    expect(isComplete('123', 4)).toBe(false)
  })
})
