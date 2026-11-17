import { describe, expect, it } from 'vitest'
import { markOpacity, markScale, markSide } from '../../system/selection-mark'

/** The design's `md`: a 26 frame, a line of 2, the mark 5 in from the line. */
const md = { box: 26, line: 2, inset: 5 }

describe('markSide', () => {
  it('is the box less its line and the inset, on both sides', () => {
    expect(markSide(md)).toBe(12)
    expect(markSide({ box: 34, line: 3, inset: 6 })).toBe(16)
  })

  it('is never negative', () => {
    expect(markSide({ box: 8, line: 3, inset: 6 })).toBe(0)
  })
})

describe('markScale', () => {
  it('follows the spring past full size', () => {
    expect(markScale(1.16)).toBe(1.16)
  })

  it('stops at nothing when the spring passes zero', () => {
    expect(markScale(-0.1)).toBe(0)
  })
})

describe('markOpacity', () => {
  it('stays between clear and solid', () => {
    expect(markOpacity(1.16)).toBe(1)
    expect(markOpacity(0.4)).toBe(0.4)
    expect(markOpacity(-0.1)).toBe(0)
  })
})
