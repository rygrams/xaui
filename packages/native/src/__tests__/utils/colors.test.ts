import { describe, expect, it } from 'vitest'
import {
  alpha,
  contrastOn,
  contrastRatio,
  hexToRgb,
  lightnessOf,
  mix,
  oklchToHex,
  rgbToHex,
} from '../../utils/colors'

describe('hexToRgb', () => {
  it('expands the three-digit form', () => {
    expect(hexToRgb('#fff')).toEqual(hexToRgb('#ffffff'))
  })

  it('accepts a value without the leading hash', () => {
    expect(hexToRgb('9333ea')).toEqual(hexToRgb('#9333ea'))
  })

  it('round-trips through rgbToHex', () => {
    expect(rgbToHex(hexToRgb('#dc2626'))).toBe('#dc2626')
  })

  it('rejects a value it cannot blend, by name', () => {
    // Without this, 'red' silently yields rgba(NaN, 238, 221, 0.15).
    expect(() => hexToRgb('red')).toThrow(/not a hex colour/)
    expect(() => hexToRgb('rgba(0, 0, 0, 0.2)')).toThrow(/not a hex colour/)
    expect(() => hexToRgb('#12345')).toThrow(/not a hex colour/)
  })
})

describe('mix', () => {
  // Frozen values. A change here means the derived token layer moves, so it is a
  // decision to take deliberately — never an expectation to update until it passes.
  it('matches the published reference', () => {
    expect(mix('#dc2626', '#18181b', 0.2)).toBe('#b22b28')
  })

  it('returns the base at amount 0 and the other at amount 1', () => {
    expect(mix('#dc2626', '#18181b', 0)).toBe('#dc2626')
    expect(mix('#dc2626', '#18181b', 1)).toBe('#18181b')
  })

  it('mixes in OKLab, not sRGB', () => {
    // The sRGB midpoint of these two would be #808000; OKLab keeps the blend saturated.
    expect(mix('#ff0000', '#00ff00', 0.5)).not.toBe('#808000')
  })
})

describe('alpha', () => {
  it('emits the rgba form React Native understands', () => {
    expect(alpha('#9333ea', 0.15)).toBe('rgba(147, 51, 234, 0.15)')
  })
})

describe('lightnessOf', () => {
  it('puts white at 1 and black at 0', () => {
    expect(lightnessOf('#ffffff')).toBeCloseTo(1, 5)
    expect(lightnessOf('#000000')).toBeCloseTo(0, 5)
  })
})

describe('contrastOn', () => {
  it('picks the light primitive on a dark surface', () => {
    expect(contrastOn('#9333ea', '#fafafa', '#18181b')).toBe('#fafafa')
  })

  it('picks the dark primitive on a light surface', () => {
    expect(contrastOn('#fbbf24', '#fafafa', '#18181b')).toBe('#18181b')
  })
})

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for a colour on itself', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 4)
    expect(contrastRatio('#9333ea', '#9333ea')).toBeCloseTo(1, 4)
  })

  it('is symmetric', () => {
    expect(contrastRatio('#9333ea', '#faf5ff')).toBeCloseTo(
      contrastRatio('#faf5ff', '#9333ea'),
      10
    )
  })

  it('reports the accent pair of the default light theme', () => {
    expect(contrastRatio('#9333ea', '#faf5ff')).toBeCloseTo(5.015, 3)
  })
})

describe('oklchToHex', () => {
  it('converts the oklch design source to hex', () => {
    expect(oklchToHex(1, 0, 0)).toBe('#ffffff')
    expect(oklchToHex(0, 0, 0)).toBe('#000000')
  })
})
