import { describe, it, expect } from 'vitest'
import { colors, getColor, withOpacity } from './index'

describe('colors', () => {
  it('should export colors object', () => {
    expect(colors).toBeDefined()
    expect(typeof colors).toBe('object')
  })

  it('should have all color families', () => {
    expect(colors.slate).toBeDefined()
    expect(colors.gray).toBeDefined()
    expect(colors.red).toBeDefined()
    expect(colors.blue).toBeDefined()
  })

  it('should have correct shade values', () => {
    expect(colors.blue[500]).toBe('#3b82f6')
    expect(colors.red[500]).toBe('#ef4444')
    expect(colors.green[500]).toBe('#22c55e')
  })

  it('should have special colors', () => {
    expect(colors.black).toBe('#000000')
    expect(colors.white).toBe('#ffffff')
    expect(colors.transparent).toBe('transparent')
  })
})

describe('getColor', () => {
  it('should return color with specified shade', () => {
    expect(getColor('blue', 500)).toBe('#3b82f6')
    expect(getColor('red', 600)).toBe('#dc2626')
  })

  it('should return 500 shade when no shade specified', () => {
    expect(getColor('blue')).toBe('#3b82f6')
    expect(getColor('red')).toBe('#ef4444')
  })

  it('should return special colors as-is', () => {
    expect(getColor('black')).toBe('#000000')
    expect(getColor('white')).toBe('#ffffff')
    expect(getColor('transparent')).toBe('transparent')
  })

  it('should fallback to 500 shade for invalid shade', () => {
    expect(getColor('blue', 999 as never)).toBe('#3b82f6')
  })
})

describe('withOpacity', () => {
  it('should add opacity to color', () => {
    expect(withOpacity('#3b82f6', 0.5)).toBe('#3b82f680')
    expect(withOpacity('#ef4444', 0.25)).toBe('#ef444440')
  })

  it('should handle full opacity', () => {
    expect(withOpacity('#3b82f6', 1)).toBe('#3b82f6ff')
  })

  it('should handle zero opacity', () => {
    expect(withOpacity('#3b82f6', 0)).toBe('#3b82f600')
  })

  it('should clamp opacity values', () => {
    expect(withOpacity('#3b82f6', 1.5)).toBe('#3b82f6ff')
    expect(withOpacity('#3b82f6', -0.5)).toBe('#3b82f600')
  })

  it('should pad single digit alpha values', () => {
    expect(withOpacity('#3b82f6', 0.02)).toBe('#3b82f605')
  })
})
