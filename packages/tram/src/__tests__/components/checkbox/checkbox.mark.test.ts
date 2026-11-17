import { describe, expect, it } from 'vitest'
import { barScale, nextSelected } from '../../../components/checkbox/checkbox.mark'
import { markSide } from '../../../system/selection-mark'

/** The design's `md`: a 26 box, a line of 2, the mark 5 in from the line. */
const md = { box: 26, line: 2, inset: 5 }

describe('barScale', () => {
  it('leaves a square a square', () => {
    expect(barScale(0, md)).toBe(1)
  })

  it('flattens it to two line widths', () => {
    expect(barScale(1, md) * markSide(md)).toBeCloseTo(4)
  })

  it('is halfway there at half', () => {
    expect(barScale(0.5, md) * markSide(md)).toBeCloseTo(8)
  })

  it('does not follow a spring past either shape', () => {
    expect(barScale(1.2, md)).toBe(barScale(1, md))
    expect(barScale(-0.2, md)).toBe(1)
  })

  it('has nothing to flatten in a box with no room for a mark', () => {
    expect(barScale(1, { box: 8, line: 3, inset: 6 })).toBe(1)
  })
})

describe('nextSelected', () => {
  it('toggles', () => {
    expect(nextSelected(false, false)).toBe(true)
    expect(nextSelected(true, false)).toBe(false)
  })

  it('resolves the third state to selected, whatever was under it', () => {
    expect(nextSelected(false, true)).toBe(true)
    expect(nextSelected(true, true)).toBe(true)
  })
})
