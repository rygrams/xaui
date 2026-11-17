import { describe, expect, it } from 'vitest'
import { progressPlace, progressText } from '../../system/progress'

describe('progressPlace', () => {
  it('is the share of the range covered', () => {
    expect(progressPlace(40, 0, 100)).toBe(0.4)
    expect(progressPlace(150, 100, 200)).toBe(0.5)
    expect(progressPlace(0, -50, 50)).toBe(0.5)
  })

  it('holds a value outside the range at its end', () => {
    expect(progressPlace(-20, 0, 100)).toBe(0)
    expect(progressPlace(180, 0, 100)).toBe(1)
  })

  it('reads an empty or inverted range as empty', () => {
    expect(progressPlace(5, 5, 5)).toBe(0)
    expect(progressPlace(5, 10, 0)).toBe(0)
  })

  it('reads what is not a finite number as zero', () => {
    expect(progressPlace(Number.NaN, 0, 100)).toBe(0)
    expect(progressPlace(50, 0, Number.POSITIVE_INFINITY)).toBe(0)
    expect(progressPlace(50, Number.NaN, 100)).toBe(0)
  })
})

describe('progressText', () => {
  it('formats the share as a percentage by default', () => {
    expect(progressText(0.4, 40).replace(/\s/g, '')).toBe('40%')
    expect(progressText(1, 250).replace(/\s/g, '')).toBe('100%')
  })

  it('formats the value itself for any other style', () => {
    const text = progressText(0.63, 1250, { style: 'decimal', useGrouping: false })

    expect(text).toBe('1250')
  })

  it('falls back to the plain number where the options cannot be resolved', () => {
    const broken = { style: 'currency' } as Intl.NumberFormatOptions

    expect(progressText(0.5, 30, broken)).toBe('30')
  })
})
