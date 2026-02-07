import { describe, expect, it } from 'vitest'
import { colors } from '../tokens'
import { withOpacity, withPaletteNumber } from './colors-utils'

describe('colors-utils', () => {
  it('withOpacity appends alpha channel', () => {
    expect(withOpacity('#3b82f6', 0.5)).toBe('#3b82f680')
  })

  it('withPaletteNumber returns requested shade from matching palette', () => {
    expect(withPaletteNumber(colors.blue[500], 200)).toBe(colors.blue[200])
  })

  it('withPaletteNumber matches 8-digit hex by ignoring alpha', () => {
    expect(withPaletteNumber('#3b82f680', 700)).toBe(colors.blue[700])
  })

  it('withPaletteNumber uses nearest palette when exact color is not found', () => {
    expect(withPaletteNumber('#3b80f0', 200)).toBe(colors.blue[200])
  })

  it('withPaletteNumber returns original color for non-hex input', () => {
    expect(withPaletteNumber('transparent', 200)).toBe('transparent')
  })
})
