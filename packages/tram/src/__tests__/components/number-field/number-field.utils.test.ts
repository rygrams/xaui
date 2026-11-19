import { describe, expect, it } from 'vitest'
import { numberKeyboard } from '../../../components/number-field/number-field.utils'

describe('numberKeyboard', () => {
  it('opens the number pad for a whole step and no format', () => {
    expect(numberKeyboard(1)).toBe('number-pad')
    expect(numberKeyboard(5, { style: 'percent' })).toBe('number-pad')
  })

  it('opens the decimal pad for a fractional step', () => {
    expect(numberKeyboard(0.5)).toBe('decimal-pad')
    expect(numberKeyboard(0.01)).toBe('decimal-pad')
  })

  it('opens the decimal pad for a format that asks for decimals', () => {
    expect(numberKeyboard(1, { maximumFractionDigits: 2 })).toBe('decimal-pad')
    expect(numberKeyboard(1, { minimumFractionDigits: 1 })).toBe('decimal-pad')
  })

  it('keeps the number pad when the format forbids decimals', () => {
    expect(numberKeyboard(1, { maximumFractionDigits: 0 })).toBe('number-pad')
  })
})
