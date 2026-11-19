import { describe, expect, it } from 'vitest'
import { skeletonFill } from '../../components/skeleton/skeleton.fill'
import { pulseStart } from '../../components/skeleton/skeleton.pulse'

describe('skeletonFill', () => {
  it('lays a fifth of the ink over the ground, in sRGB', () => {
    expect(skeletonFill('#FFFFFF', '#000000')).toBe('#333333')
    expect(skeletonFill('#000000', '#FFFFFF')).toBe('#CCCCCC')
  })

  it('reads the short hex form', () => {
    expect(skeletonFill('#fff', '#000')).toBe('#333333')
  })

  it('takes another share', () => {
    expect(skeletonFill('#FFFFFF', '#000000', 0.5)).toBe('#808080')
  })

  it('gives up on a colour it cannot mix', () => {
    expect(skeletonFill('rgb(255, 255, 255)', '#000000')).toBeUndefined()
    expect(skeletonFill('#FFFFFF', 'black')).toBeUndefined()
  })
})

describe('pulseStart', () => {
  it('starts at full, on the way down, at the top of the cycle', () => {
    expect(pulseStart(0, 1000, 0.5)).toEqual({ from: 1, to: 0.5, ms: 1000, next: 1 })
  })

  it('picks the way down up halfway', () => {
    expect(pulseStart(500, 1000, 0.5)).toEqual({
      from: 0.75,
      to: 0.5,
      ms: 500,
      next: 1,
    })
  })

  it('turns back up after the first half of the cycle', () => {
    expect(pulseStart(1000, 1000, 0.5)).toEqual({
      from: 0.5,
      to: 1,
      ms: 1000,
      next: 0.5,
    })
    expect(pulseStart(1500, 1000, 0.5)).toEqual({
      from: 0.75,
      to: 1,
      ms: 500,
      next: 0.5,
    })
  })

  it('puts two blocks a cycle apart in step', () => {
    expect(pulseStart(2300, 1000, 0.5)).toEqual(pulseStart(300, 1000, 0.5))
  })
})
