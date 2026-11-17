import { describe, expect, it } from 'vitest'
import { colorOf, pointsOf } from '../../system/style-values'

describe('pointsOf', () => {
  it('keeps a number', () => {
    expect(pointsOf(12)).toBe(12)
  })

  it('counts a percentage, `auto` or nothing as zero', () => {
    expect(pointsOf('50%')).toBe(0)
    expect(pointsOf('auto')).toBe(0)
    expect(pointsOf(undefined)).toBe(0)
  })
})

describe('colorOf', () => {
  it('reads a colour written as a string', () => {
    expect(colorOf({ color: '#FF0000' }, 'color')).toBe('#FF0000')
    expect(colorOf({ borderColor: '#00FF00' }, 'borderColor')).toBe('#00FF00')
  })

  it('is undefined for a key that is not set', () => {
    expect(colorOf({}, 'borderColor')).toBeUndefined()
  })
})
