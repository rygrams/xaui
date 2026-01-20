import { describe, expect, it } from 'vitest'
import { withOpacity } from '../../utils/colors-utils'

describe('withOpacity', () => {
  it('returns hex with full opacity', () => {
    expect(withOpacity('#ff0000', 1)).toBe('#ff0000ff')
  })

  it('returns hex with zero opacity', () => {
    expect(withOpacity('#ff0000', 0)).toBe('#ff000000')
  })

  it('rounds to the nearest alpha value', () => {
    expect(withOpacity('#ff0000', 0.5)).toBe('#ff000080')
  })

  it('clamps values outside the 0-1 range', () => {
    expect(withOpacity('#ff0000', -1)).toBe('#ff000000')
    expect(withOpacity('#ff0000', 2)).toBe('#ff0000ff')
  })
})
