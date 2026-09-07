import { describe, expect, it } from 'vitest'
import {
  canStep,
  clampNumber,
  formatNumber,
  numberMarks,
  parseNumber,
  stepNumber,
} from '../../../components/number-field/number-field.utils'

describe('numberMarks', () => {
  it('reads the marks off the locale', () => {
    expect(numberMarks('en-US')).toEqual({ group: ',', decimal: '.' })
    expect(numberMarks('de-DE')).toEqual({ group: '.', decimal: ',' })
  })

  it('falls back rather than throwing on a locale it cannot resolve', () => {
    expect(numberMarks('not a locale')).toEqual({ group: ',', decimal: '.' })
  })
})

describe('parseNumber', () => {
  it('reads a plain number', () => {
    expect(parseNumber('42')).toBe(42)
    expect(parseNumber('-7')).toBe(-7)
    expect(parseNumber('3.5')).toBe(3.5)
  })

  it('drops the grouping the field itself wrote', () => {
    // The value the caret lands in is formatted; refusing its separators would make the
    // first keystroke on an existing value clear the box.
    expect(parseNumber('1,234,567', 'en-US')).toBe(1234567)
    expect(parseNumber('1.234,5', 'de-DE')).toBe(1234.5)
    expect(parseNumber('1 234,5', 'fr-FR')).toBe(1234.5)
  })

  it('drops whatever else the format put in', () => {
    expect(parseNumber('$1,250.00', 'en-US')).toBe(1250)
    expect(parseNumber('60 %', 'en-US')).toBe(60)
  })

  it('takes a full stop as the decimal mark wherever it is not the grouping', () => {
    expect(parseNumber('1.5', 'fr-FR')).toBe(1.5)
    expect(parseNumber('1.234', 'de-DE')).toBe(1234)
  })

  it('keeps only the first separator and only a leading sign', () => {
    expect(parseNumber('1.2.3', 'en-US')).toBe(1.23)
    expect(parseNumber('4-2')).toBe(42)
  })

  it('is null while what was typed is not a number yet', () => {
    expect(parseNumber('')).toBeNull()
    expect(parseNumber('-')).toBeNull()
    expect(parseNumber('.')).toBeNull()
    expect(parseNumber('abc')).toBeNull()
  })

  it('reads back the minus sign a formatter wrote', () => {
    expect(parseNumber('−7')).toBe(-7)
  })
})

describe('formatNumber', () => {
  it('writes the value the way the locale does', () => {
    expect(formatNumber(1234.5, 'en-US')).toBe('1,234.5')
  })

  it('falls back to the bare number when the options cannot be honoured', () => {
    expect(formatNumber(12, 'en-US', { style: 'currency' })).toBe('12')
  })
})

describe('clampNumber', () => {
  it('brings the value inside its bounds', () => {
    expect(clampNumber(15, { min: 0, max: 10 })).toBe(10)
    expect(clampNumber(-3, { min: 0, max: 10 })).toBe(0)
    expect(clampNumber(5, { min: 0, max: 10 })).toBe(5)
  })

  it('is stopped by nothing where a bound is absent', () => {
    expect(clampNumber(-1000, {})).toBe(-1000)
    expect(clampNumber(1000, { min: 0 })).toBe(1000)
  })
})

describe('stepNumber', () => {
  it('moves by the step and clamps', () => {
    expect(stepNumber(4, 1, {})).toBe(5)
    expect(stepNumber(4, -1, {})).toBe(3)
    expect(stepNumber(10, 1, { max: 10 })).toBe(10)
  })

  it('starts from zero on an empty field, so the first press lands on the floor', () => {
    expect(stepNumber(null, 1, { min: 5 })).toBe(5)
    expect(stepNumber(null, 1, {})).toBe(1)
  })

  it('reaches a bound the step overshoots', () => {
    expect(stepNumber(9.5, 1, { max: 10 })).toBe(10)
  })

  it('rounds to the precision of the numbers that built it', () => {
    // Three steps of a tenth, which floating point otherwise writes as
    // 0.30000000000000004 — a value that can neither be compared nor displayed.
    expect(stepNumber(0.2, 0.1, {})).toBe(0.3)
    expect(stepNumber(0.05, 0.1, {})).toBe(0.15)
  })
})

describe('canStep', () => {
  it('is false only where the press would change nothing', () => {
    expect(canStep(10, 1, { max: 10 })).toBe(false)
    expect(canStep(0, -1, { min: 0 })).toBe(false)
    expect(canStep(9, 1, { max: 10 })).toBe(true)
  })

  it('lets the last part-step through', () => {
    // Asked of the result rather than of the bound: 9.5 cannot take a whole step, but it
    // can still reach the ceiling, and a dead button there strands the reader.
    expect(canStep(9.5, 1, { max: 10 })).toBe(true)
  })

  it('is true on an empty field, whatever the bounds', () => {
    expect(canStep(null, 1, { min: 5, max: 5 })).toBe(true)
  })
})
