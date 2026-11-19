import { describe, expect, it } from 'vitest'
import { turnstile } from '../../motion/motion-tokens'
import { hingeAt, hingeFor, turnstileAngle } from '../../system/turnstile'

describe('turnstileAngle', () => {
  it('is flat at rest', () => {
    expect(turnstileAngle(0, false)).toBeCloseTo(0)
  })

  it('turns away by the token at a whole turn, and the other way at -1', () => {
    expect(turnstileAngle(1, false)).toBe(turnstile.degrees)
    expect(turnstileAngle(-1, false)).toBe(-turnstile.degrees)
  })

  it('mirrors in a right-to-left layout', () => {
    expect(turnstileAngle(1, true)).toBe(-turnstile.degrees)
  })

  it('holds a turn past its end, as a spring overshoots', () => {
    expect(turnstileAngle(1.3, false)).toBe(turnstile.degrees)
    expect(turnstileAngle(-1.3, false)).toBe(-turnstile.degrees)
  })
})

describe('hingeFor', () => {
  it('hinges on the start edge, half-way down', () => {
    expect(hingeFor(false)).toEqual([0, '50%', 0])
    expect(hingeFor(true)).toEqual(['100%', '50%', 0])
  })
})

describe('hingeAt', () => {
  it('hinges a box on an edge before its start, left to right', () => {
    expect(hingeAt(12, 80, false)).toEqual([-12, '50%', 0])
  })

  it('reaches past the box’s physical left to its start, right to left', () => {
    expect(hingeAt(12, 80, true)).toEqual([92, '50%', 0])
  })

  it('is the box’s own start edge with no inset', () => {
    expect(hingeAt(0, 80, false)).toEqual([0, '50%', 0])
    expect(hingeAt(0, 80, true)).toEqual([80, '50%', 0])
  })
})
