import { describe, expect, it } from 'vitest'
import { keepOnMark, pressedShare } from '../../../components/rating/rating.utils'

describe('pressedShare', () => {
  it('reads the press as a share of the mark, from the left', () => {
    expect(pressedShare({ x: 12, markSize: 24, isRTL: false })).toBe(0.5)
    expect(pressedShare({ x: 18, markSize: 24, isRTL: false })).toBe(0.75)
  })

  it('reads it from the right in a row read right to left', () => {
    expect(pressedShare({ x: 18, markSize: 24, isRTL: true })).toBe(0.25)
    expect(pressedShare({ x: 0, markSize: 24, isRTL: true })).toBe(1)
  })

  it('clamps a press in the reach to the edge it is past', () => {
    expect(pressedShare({ x: -8, markSize: 24, isRTL: false })).toBe(0)
    expect(pressedShare({ x: 40, markSize: 24, isRTL: false })).toBe(1)
    expect(pressedShare({ x: 40, markSize: 24, isRTL: true })).toBe(0)
  })

  it('counts a press it cannot measure as the whole mark', () => {
    expect(pressedShare({ x: undefined, markSize: 24, isRTL: false })).toBe(1)
    expect(pressedShare({ x: Number.NaN, markSize: 24, isRTL: false })).toBe(1)
    expect(pressedShare({ x: 12, markSize: 0, isRTL: false })).toBe(1)
  })
})

describe('keepOnMark', () => {
  it('leaves a value already on the pressed mark alone', () => {
    expect(keepOnMark({ value: 3, index: 2, precision: 1, max: 5 })).toBe(3)
    expect(keepOnMark({ value: 2.5, index: 2, precision: 0.5, max: 5 })).toBe(2.5)
    expect(keepOnMark({ value: 3, index: 2, precision: 0.5, max: 5 })).toBe(3)
  })

  it("lifts a press at the mark's start edge, snapped to the mark before, onto it", () => {
    // `2 + 0` snaps to 2: the third mark's own reach would select the second.
    expect(keepOnMark({ value: 2, index: 2, precision: 1, max: 5 })).toBe(3)
    expect(keepOnMark({ value: 4, index: 4, precision: 1, max: 5 })).toBe(5)
    expect(keepOnMark({ value: 2, index: 2, precision: 0.5, max: 5 })).toBe(2.5)
    expect(keepOnMark({ value: 1, index: 0, precision: 1, max: 5 })).toBe(1)
  })

  it('never passes the end of the row', () => {
    expect(keepOnMark({ value: 5, index: 4, precision: 1, max: 5 })).toBe(5)
  })
})
