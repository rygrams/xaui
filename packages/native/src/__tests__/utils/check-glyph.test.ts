import { describe, expect, it } from 'vitest'
import { CHECK_SPAN, checkGlyph } from '../../utils/check-glyph'

describe('checkGlyph', () => {
  it('derives both strokes from the box rather than from a table', () => {
    const small = checkGlyph(16, 2)
    const large = checkGlyph(32, 2)

    expect(small.width).toBe(8)
    expect(small.height).toBe(4)
    expect(large.width).toBe(16)
    expect(large.height).toBe(8)
  })

  it('draws the L with the two borders that survive the turn', () => {
    const glyph = checkGlyph(24, 2)

    expect(glyph.borderStartWidth).toBe(2)
    expect(glyph.borderBottomWidth).toBe(2)
  })

  it('lifts the mark by the ink centre the rotation leaves below the box centre', () => {
    const side = 24
    const stroke = 2
    const rise = side * 0.25

    expect(checkGlyph(side, stroke).transform).toEqual([
      { translateY: -((rise - stroke) * Math.SQRT2) / 4 },
      { rotate: '-45deg' },
    ])
  })

  it('keeps the lift and the turn in one value, in that order', () => {
    // `transform` is whole: a caller merging a second transform replaces this one rather
    // than blending into it, so both steps have to leave here together.
    const transform = checkGlyph(24, 2).transform

    expect(Array.isArray(transform) && transform).toHaveLength(2)
  })

  it('a mark with no rise is not lifted at all', () => {
    expect(checkGlyph(8, 2).transform).toEqual([
      { translateY: -0 },
      { rotate: '-45deg' },
    ])
  })

  it('exports the span the dash shares with the tick', () => {
    expect(checkGlyph(20, 2).width).toBe(20 * CHECK_SPAN)
  })
})
