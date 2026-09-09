import { describe, expect, it } from 'vitest'
import { fillFor, snapValue } from '../../../components/rating/rating.utils'

describe('fillFor', () => {
  it('fills a mark the value has passed', () => {
    expect(fillFor(3, 0)).toBe(1)
    expect(fillFor(3, 2)).toBe(1)
  })

  it('leaves a mark the value has not reached empty', () => {
    expect(fillFor(3, 3)).toBe(0)
    expect(fillFor(3, 4)).toBe(0)
  })

  /** The case the fraction exists for: an average must not be rounded to a whole mark. */
  it('fills the mark the value lands inside by the fraction', () => {
    expect(fillFor(4.3, 4)).toBeCloseTo(0.3)
    expect(fillFor(2.5, 2)).toBe(0.5)
  })

  it('clamps a negative value to empty', () => {
    expect(fillFor(-1, 0)).toBe(0)
  })
})

describe('snapValue', () => {
  it('rounds up, so a tap anywhere in the first mark is one', () => {
    expect(snapValue({ raw: 0.01, precision: 1, max: 5 })).toBe(1)
    expect(snapValue({ raw: 0.99, precision: 1, max: 5 })).toBe(1)
  })

  it('lands on whole marks at the default precision', () => {
    expect(snapValue({ raw: 2.34, precision: 1, max: 5 })).toBe(3)
  })

  it('splits a mark in two at a precision of a half', () => {
    expect(snapValue({ raw: 2.2, precision: 0.5, max: 5 })).toBe(2.5)
    expect(snapValue({ raw: 2.6, precision: 0.5, max: 5 })).toBe(3)
  })

  it('never exceeds the row it landed in', () => {
    expect(snapValue({ raw: 6.4, precision: 1, max: 5 })).toBe(5)
  })

  it('never returns less than one step', () => {
    expect(snapValue({ raw: 0, precision: 0.5, max: 5 })).toBe(0.5)
  })

  /** Steps like 0.1 accumulate float error the moment they are multiplied back out. */
  it('does not hand a caller 2.9000000000000004', () => {
    expect(snapValue({ raw: 2.85, precision: 0.1, max: 5 })).toBe(2.9)
  })

  it('falls back to a clamp when the precision is not a step at all', () => {
    expect(snapValue({ raw: 3.7, precision: 0, max: 5 })).toBe(3.7)
    expect(snapValue({ raw: 9, precision: 0, max: 5 })).toBe(5)
  })
})
