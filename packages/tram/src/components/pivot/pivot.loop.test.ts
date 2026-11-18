import { describe, expect, it } from 'vitest'
import {
  closeness,
  forwardSteps,
  headerOffset,
  loopDelta,
  loopIndex,
  releaseStep,
} from './pivot.loop'

describe('loopIndex', () => {
  it('wraps a position into the sections, both ways', () => {
    expect(loopIndex(0, 4)).toBe(0)
    expect(loopIndex(5, 4)).toBe(1)
    expect(loopIndex(-1, 4)).toBe(3)
    expect(loopIndex(-6, 4)).toBe(2)
  })

  it('reads a fraction as the nearest section', () => {
    expect(loopIndex(2.4, 4)).toBe(2)
    expect(loopIndex(3.6, 4)).toBe(0)
  })

  it('is 0 with no section', () => {
    expect(loopIndex(3, 0)).toBe(0)
  })
})

describe('loopDelta', () => {
  it('is how far a section lies from the position', () => {
    expect(loopDelta(1, 0.3, 4)).toBeCloseTo(0.7)
    expect(loopDelta(0, 0.3, 4)).toBeCloseTo(-0.3)
  })

  it('goes the short way round', () => {
    expect(loopDelta(3, 0, 4)).toBe(-1)
    expect(loopDelta(0, 3.5, 4)).toBeCloseTo(0.5)
    expect(loopDelta(1, 9, 4)).toBe(0)
  })

  it('lets two sections share the screen during a drag either way', () => {
    expect(loopDelta(1, 0.3, 2)).toBeCloseTo(0.7)
    expect(loopDelta(1, -0.3, 2)).toBeCloseTo(-0.7)
  })

  it('is 0 for a single section', () => {
    expect(loopDelta(0, 0.6, 1)).toBe(0)
  })
})

describe('headerOffset', () => {
  // Titles 80, 120, 100 and 60 wide, 24 apart.
  const advances = [104, 144, 124, 84]

  it('puts the current title on the margin and the others after it, in loop order', () => {
    expect(headerOffset(1, 1, advances)).toBe(0)
    expect(headerOffset(2, 1, advances)).toBe(144)
    expect(headerOffset(3, 1, advances)).toBe(268)
    expect(headerOffset(0, 1, advances)).toBe(352)
  })

  it('slides every title by the share of the passed title the finger has dragged', () => {
    expect(headerOffset(1, 1.5, advances)).toBe(-72)
    expect(headerOffset(2, 1.5, advances)).toBe(72)
  })

  it('brings the previous title in from the start on a drag back', () => {
    // From 1 back toward 0: the position has passed 0, which comes in from the start.
    expect(headerOffset(0, 0.75, advances)).toBe(-78)
    expect(headerOffset(1, 0.75, advances)).toBe(26)
  })

  it('reads a position past the loop as the section it wraps to', () => {
    expect(headerOffset(2, 5, advances)).toBe(headerOffset(2, 1, advances))
    expect(headerOffset(2, -3, advances)).toBe(headerOffset(2, 1, advances))
  })

  it('is 0 for a title the row does not know', () => {
    expect(headerOffset(4, 0, advances)).toBe(0)
    expect(headerOffset(0, 0, [])).toBe(0)
  })
})

describe('releaseStep', () => {
  const threshold = { distance: 90, velocity: 500 }

  it('moves on when dragged far enough, either way', () => {
    expect(releaseStep({ distance: 120, velocity: 0 }, threshold)).toBe(1)
    expect(releaseStep({ distance: -120, velocity: 0 }, threshold)).toBe(-1)
  })

  it('moves on when flung, however short the drag', () => {
    expect(releaseStep({ distance: 20, velocity: 900 }, threshold)).toBe(1)
  })

  it('reads the fling before the distance', () => {
    expect(releaseStep({ distance: 200, velocity: -900 }, threshold)).toBe(-1)
  })

  it('stays when short of both', () => {
    expect(releaseStep({ distance: 60, velocity: 200 }, threshold)).toBe(0)
  })
})

describe('forwardSteps', () => {
  it('counts forward, going round', () => {
    expect(forwardSteps(1, 3, 4)).toBe(2)
    expect(forwardSteps(3, 1, 4)).toBe(2)
    expect(forwardSteps(3, 0, 4)).toBe(1)
    expect(forwardSteps(2, 2, 4)).toBe(0)
  })

  it('is 0 with no section', () => {
    expect(forwardSteps(0, 1, 0)).toBe(0)
  })
})

describe('closeness', () => {
  it('fades from 1 on the section to 0 a section away', () => {
    expect(closeness(0)).toBe(1)
    expect(closeness(-0.25)).toBe(0.75)
    expect(closeness(1.5)).toBe(0)
  })
})
