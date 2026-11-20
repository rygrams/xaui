import { describe, expect, it } from 'vitest'
import { pulseStart } from '../../components/skeleton/skeleton.pulse'

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
