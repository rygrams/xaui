import { describe, expect, it } from 'vitest'
import { pressedShare } from '../../../components/rating/rating.utils'

describe('pressedShare', () => {
  it('reads the press as a share of the mark', () => {
    expect(pressedShare(12, 24)).toBe(0.5)
    expect(pressedShare(24, 24)).toBe(1)
  })

  it('keeps a press in the reach beside the mark on this mark', () => {
    expect(pressedShare(-8, 24)).toBe(Number.EPSILON)
    expect(pressedShare(0, 24)).toBe(Number.EPSILON)
    expect(pressedShare(40, 24)).toBe(1)
  })

  it('counts a press it cannot measure as the whole mark', () => {
    expect(pressedShare(undefined, 24)).toBe(1)
    expect(pressedShare(Number.NaN, 24)).toBe(1)
    expect(pressedShare(12, 0)).toBe(1)
  })
})
