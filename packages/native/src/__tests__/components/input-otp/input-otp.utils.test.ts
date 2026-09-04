import { describe, expect, it } from 'vitest'
import {
  buildSlots,
  extractPastedCode,
  isPaste,
} from '../../../components/input-otp/input-otp.utils'

describe('buildSlots', () => {
  it('gives one slot per box, in order', () => {
    const slots = buildSlots({ value: '', maxLength: 4, isFocused: false })

    expect(slots).toHaveLength(4)
    expect(slots.map(slot => slot.index)).toEqual([0, 1, 2, 3])
  })

  it('spreads the value one character to a box', () => {
    const slots = buildSlots({ value: '42', maxLength: 4, isFocused: false })

    expect(slots.map(slot => slot.char)).toEqual(['4', '2', null, null])
  })

  it('makes the box after the last character active, and only while focused', () => {
    const blurred = buildSlots({ value: '42', maxLength: 4, isFocused: false })
    const focused = buildSlots({ value: '42', maxLength: 4, isFocused: true })

    expect(blurred.some(slot => slot.isActive)).toBe(false)
    expect(focused.map(slot => slot.isActive)).toEqual([false, false, true, false])
  })

  it('has no active box once every box is filled', () => {
    const slots = buildSlots({ value: '4242', maxLength: 4, isFocused: true })

    expect(slots.some(slot => slot.isActive)).toBe(false)
  })

  it('shows the caret only in an active box that is still empty', () => {
    const slots = buildSlots({ value: '4', maxLength: 2, isFocused: true })

    expect(slots.map(slot => slot.isCaretVisible)).toEqual([false, true])
  })

  it('repeats a one-character placeholder across every box', () => {
    const slots = buildSlots({
      value: '',
      maxLength: 3,
      isFocused: false,
      placeholder: '•',
    })

    expect(slots.map(slot => slot.placeholderChar)).toEqual(['•', '•', '•'])
  })

  it('maps a longer placeholder one character to a box', () => {
    const slots = buildSlots({
      value: '',
      maxLength: 4,
      isFocused: false,
      placeholder: 'ab',
    })

    expect(slots.map(slot => slot.placeholderChar)).toEqual(['a', 'b', null, null])
  })

  it('drops the placeholder where a character or the caret already sits', () => {
    const slots = buildSlots({
      value: '4',
      maxLength: 3,
      isFocused: true,
      placeholder: '•',
    })

    expect(slots.map(slot => slot.placeholderChar)).toEqual([null, null, '•'])
  })
})

describe('extractPastedCode', () => {
  it('takes the code out of the message it arrived in', () => {
    expect(
      extractPastedCode('Your code is 482913, it expires in 10 minutes', 6)
    ).toBe('482913')
  })

  it('ignores a run of digits that is not the right length', () => {
    expect(extractPastedCode('code 12345', 6)).toBe('')
    expect(extractPastedCode('code 1234567', 6)).toBe('')
  })

  it('returns the code when it arrives on its own', () => {
    expect(extractPastedCode('482913', 6)).toBe('482913')
  })

  it('returns nothing when there is no code to find', () => {
    expect(extractPastedCode('no digits here', 6)).toBe('')
  })
})

describe('isPaste', () => {
  it('is false for a keystroke', () => {
    expect(isPaste('42', '4')).toBe(false)
  })

  it('is false for a backspace', () => {
    expect(isPaste('4', '42')).toBe(false)
  })

  it('is true when more than one character arrives at once', () => {
    expect(isPaste('482913', '')).toBe(true)
  })
})
