import { describe, expect, it } from 'vitest'
import { formatProgress, progressFraction } from '../../utils/progress'

describe('progressFraction', () => {
  it('reports where the value sits in the range', () => {
    expect(progressFraction(40, 0, 100)).toBeCloseTo(0.4)
    expect(progressFraction(5, 0, 10)).toBe(0.5)
    expect(progressFraction(15, 10, 20)).toBe(0.5)
  })

  it('clamps a value that is outside the range', () => {
    expect(progressFraction(-20, 0, 100)).toBe(0)
    expect(progressFraction(140, 0, 100)).toBe(1)
  })

  it('reads an empty or inverted range as empty', () => {
    expect(progressFraction(5, 10, 10)).toBe(0)
    expect(progressFraction(5, 100, 0)).toBe(0)
  })

  it('reads anything that is not a finite number as zero', () => {
    expect(progressFraction(Number.NaN, 0, 100)).toBe(0)
    expect(progressFraction(50, Number.NaN, 100)).toBe(0)
    expect(progressFraction(50, 0, Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe('formatProgress', () => {
  it('formats the fraction as a percentage', () => {
    expect(formatProgress(0.4, 40)).toMatch(/40\s?%/)
  })

  it('takes the caller’s format options', () => {
    expect(
      formatProgress(0.4, 40, { style: 'percent', minimumFractionDigits: 1 })
    ).toMatch(/40[.,]0\s?%/)
  })

  it('formats the value rather than the fraction for anything but a percentage', () => {
    const euros = formatProgress(0.625, 1250, { style: 'currency', currency: 'EUR' })

    // The bug this branch exists to prevent: a 1 250 € goal reported as 0,63 €.
    expect(euros).toMatch(/1\D?250/)
  })

  it('falls back to a plain number when Intl cannot be used', () => {
    const original = globalThis.Intl
    // A Hermes build with no ICU has no `Intl` at all, and that is the case the fallback
    // exists for — the constructor throwing is what it catches, so remove it outright.
    Object.defineProperty(globalThis, 'Intl', {
      value: undefined,
      configurable: true,
    })

    try {
      expect(formatProgress(0.406, 40.6)).toBe('41%')
      expect(formatProgress(0.5, 12, { style: 'decimal' })).toBe('12')
    } finally {
      Object.defineProperty(globalThis, 'Intl', {
        value: original,
        configurable: true,
      })
    }
  })
})
