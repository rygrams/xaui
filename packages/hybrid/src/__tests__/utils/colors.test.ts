import { describe, expect, it } from 'vitest'
import {
  alpha,
  contrastOn,
  hexToRgb,
  mix,
  oklchToHex,
  rgbToHex,
} from '../../utils/colors'

describe('Hybrid colour engine', () => {
  it('round-trips hex values and expands shorthand', () => {
    expect(rgbToHex(hexToRgb('#9333ea'))).toBe('#9333ea')
    expect(rgbToHex(hexToRgb('#abc'))).toBe('#aabbcc')
  })

  it('matches the shared OKLab and alpha operations', () => {
    expect(mix('#9333ea', '#18181b', 0.1)).toBe('#8533d3')
    expect(alpha('#9333ea', 0.15)).toBe('rgba(147, 51, 234, 0.15)')
    expect(oklchToHex(0.627, 0.265, 303.9)).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('selects readable primitive ink', () => {
    expect(contrastOn('#ffffff', '#fafafa', '#18181b')).toBe('#18181b')
    expect(contrastOn('#000000', '#fafafa', '#18181b')).toBe('#fafafa')
  })

  it('rejects colour formats the OKLab engine cannot derive', () => {
    expect(() => hexToRgb('rebeccapurple')).toThrow('is not a hex colour')
  })
})
