import { describe, expect, it } from 'vitest'
import { swipe, swivel } from '../../motion/motion-tokens'
import { swipeDim, swipeLeaves, swipeTurn } from '../../system/swipe-away'

describe('swipeTurn', () => {
  it('lies flat under a finger that has not moved', () => {
    expect(swipeTurn(0, 200)).toBe(1)
  })

  it('turns in proportion to the way up', () => {
    expect(swipeTurn(-50, 200)).toBe(0.75)
    expect(swipeTurn(-100, 200)).toBe(0.5)
  })

  it('is edge-on once the finger climbed its whole height, and no further', () => {
    expect(swipeTurn(-200, 200)).toBe(0)
    expect(swipeTurn(-900, 200)).toBe(0)
  })

  it('does not move downward', () => {
    expect(swipeTurn(120, 200)).toBe(1)
  })

  it('stays flat until it has been measured', () => {
    expect(swipeTurn(-80, 0)).toBe(1)
  })

  it('follows over a few degrees when it may not be dismissed', () => {
    const most = swipe.resist / Math.abs(swivel.degrees)

    expect(swipeTurn(-100, 200, true)).toBeCloseTo(1 - most / 2)
    expect(swipeTurn(-900, 200, true)).toBeCloseTo(1 - most)
    expect(swipeTurn(120, 200, true)).toBe(1)
  })
})

describe('swipeLeaves', () => {
  it('comes back short of the threshold', () => {
    expect(swipeLeaves(1, 0)).toBe(false)
    expect(swipeLeaves(1 - swipe.distance + 0.01, 0)).toBe(false)
  })

  it('leaves once turned past it', () => {
    expect(swipeLeaves(1 - swipe.distance, 0)).toBe(true)
    expect(swipeLeaves(0, 0)).toBe(true)
  })

  it('leaves when flung upward, however little it turned', () => {
    expect(swipeLeaves(0.95, -swipe.velocity)).toBe(true)
    expect(swipeLeaves(0.95, -swipe.velocity + 1)).toBe(false)
  })

  it('does not leave on a downward fling', () => {
    expect(swipeLeaves(0.95, swipe.velocity * 2)).toBe(false)
  })

  it('never leaves on what a held banner gives', () => {
    expect(swipeLeaves(swipeTurn(-900, 200, true), 0)).toBe(false)
  })
})

describe('swipeDim', () => {
  it('lightens at the pace of the banner', () => {
    expect(swipeDim(1)).toBe(1)
    expect(swipeDim(0.4)).toBe(0.4)
    expect(swipeDim(0)).toBe(0)
  })

  it('does not darken past its token when a spring overshoots', () => {
    expect(swipeDim(1.08)).toBe(1)
    expect(swipeDim(-0.02)).toBe(0)
  })
})
