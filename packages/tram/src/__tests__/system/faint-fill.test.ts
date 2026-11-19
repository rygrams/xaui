import { describe, expect, it } from 'vitest'
import { faintFill } from '../../system/faint-fill'

describe('faintFill', () => {
  it('lays a fifth of the ink over the ground, in sRGB', () => {
    expect(faintFill('#FFFFFF', '#000000')).toBe('#333333')
    expect(faintFill('#000000', '#FFFFFF')).toBe('#CCCCCC')
  })

  it('reads the short hex form', () => {
    expect(faintFill('#fff', '#000')).toBe('#333333')
  })

  it('takes another share', () => {
    expect(faintFill('#FFFFFF', '#000000', 0.5)).toBe('#808080')
  })

  it('gives up on a colour it cannot mix', () => {
    expect(faintFill('rgb(255, 255, 255)', '#000000')).toBeUndefined()
    expect(faintFill('#FFFFFF', 'black')).toBeUndefined()
  })
})
