import { describe, expect, it } from 'vitest'
import { cornerFor } from '../../../components/button/button.corner'

/** The scale a base of 2 derives — what the default Tram theme carries. */
const radius = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  '2xl': 4,
  '3xl': 6,
  '4xl': 8,
  field: 2,
  full: 9999,
}

describe('cornerFor', () => {
  it('keeps the keys at or under the Tram corner', () => {
    expect(cornerFor('sm', radius)).toBe(1)
    expect(cornerFor('lg', radius)).toBe(2)
  })

  it('caps the keys that climb past it', () => {
    expect(cornerFor('xl', radius)).toBe(2)
    expect(cornerFor('4xl', radius)).toBe(2)
  })

  it('lets a circle through', () => {
    expect(cornerFor('full', radius)).toBe(9999)
  })
})
