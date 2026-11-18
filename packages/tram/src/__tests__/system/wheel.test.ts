import { describe, expect, it } from 'vitest'
import { wheel } from '../../motion/motion-tokens'
import {
  canLoop,
  landingOffset,
  loopIndex,
  offsetOf,
  restOffset,
  squareAt,
  squareDistance,
  squareOpacity,
  visibleSquares,
  wheelHeight,
  withinWheel,
} from '../../system/wheel'
import type { WheelShape } from '../../system/wheel'

const STEP = 92
const ended: WheelShape = { step: STEP, count: 12, isLooping: false }
const looping: WheelShape = { step: STEP, count: 12, isLooping: true }

describe('visibleSquares', () => {
  it('is five when nothing is asked', () => {
    expect(visibleSquares()).toBe(5)
    expect(visibleSquares(Number.NaN)).toBe(5)
  })

  it('keeps an odd count and rounds an even one up', () => {
    expect(visibleSquares(3)).toBe(3)
    expect(visibleSquares(4)).toBe(5)
    expect(visibleSquares(7)).toBe(7)
  })

  it('never goes under three', () => {
    expect(visibleSquares(1)).toBe(3)
    expect(visibleSquares(-2)).toBe(3)
  })
})

describe('wheelHeight', () => {
  it('counts a gap between two squares and none at the ends', () => {
    expect(wheelHeight(84, 8, 5)).toBe(5 * 84 + 4 * 8)
    expect(wheelHeight(64, 8, 3)).toBe(208)
  })
})

describe('canLoop', () => {
  it('takes one square more than are shown', () => {
    expect(canLoop(6, 5)).toBe(true)
    expect(canLoop(5, 5)).toBe(false)
    expect(canLoop(2, 3)).toBe(false)
  })
})

describe('loopIndex', () => {
  it('leaves a square of the wheel where it is', () => {
    expect(loopIndex(0, 12)).toBe(0)
    expect(loopIndex(11, 12)).toBe(11)
  })

  it('counts past the last square from the first, and before the first from the last', () => {
    expect(loopIndex(12, 12)).toBe(0)
    expect(loopIndex(25, 12)).toBe(1)
    expect(loopIndex(-1, 12)).toBe(11)
    expect(loopIndex(-13, 12)).toBe(11)
  })

  it('is the first square of an empty wheel', () => {
    expect(loopIndex(3, 0)).toBe(0)
  })
})

describe('withinWheel', () => {
  it('holds a wheel with ends between them', () => {
    expect(withinWheel(-40, ended)).toBe(0)
    expect(withinWheel(200, ended)).toBe(200)
    expect(withinWheel(5000, ended)).toBe(11 * STEP)
  })

  it('lets a looping wheel turn as far as it is taken', () => {
    expect(withinWheel(-40, looping)).toBe(-40)
    expect(withinWheel(5000, looping)).toBe(5000)
  })
})

describe('squareAt', () => {
  it('is the square nearest to the middle', () => {
    expect(squareAt(0, ended)).toBe(0)
    expect(squareAt(STEP * 2 + 40, ended)).toBe(2)
    expect(squareAt(STEP * 2 + 50, ended)).toBe(3)
  })

  it('stops at the ends of a wheel that has them', () => {
    expect(squareAt(-300, ended)).toBe(0)
    expect(squareAt(STEP * 40, ended)).toBe(11)
  })

  it('goes round on a looping wheel, both ways', () => {
    expect(squareAt(STEP * 12, looping)).toBe(0)
    expect(squareAt(STEP * 13, looping)).toBe(1)
    expect(squareAt(-STEP, looping)).toBe(11)
  })

  it('is the first square of a wheel with none, or with no step', () => {
    expect(squareAt(100, { step: STEP, count: 0, isLooping: false })).toBe(0)
    expect(squareAt(100, { step: 0, count: 4, isLooping: true })).toBe(0)
  })
})

describe('restOffset', () => {
  it('is always a whole square', () => {
    expect(restOffset(STEP * 3 + 12, ended)).toBe(STEP * 3)
    expect(restOffset(STEP * 3 + 60, ended)).toBe(STEP * 4)
  })

  it('stays inside a wheel with ends', () => {
    expect(restOffset(-70, ended)).toBe(0)
    expect(restOffset(STEP * 30, ended)).toBe(STEP * 11)
  })

  it('keeps counting on a looping wheel', () => {
    expect(restOffset(STEP * 30 + 10, looping)).toBe(STEP * 30)
    expect(restOffset(-STEP * 2 - 10, looping)).toBe(-STEP * 2)
  })
})

describe('landingOffset', () => {
  const carried = (velocity: number) => (velocity * wheel.carry) / 1000

  it('is the nearest square for a wheel that is not moving', () => {
    expect(landingOffset(STEP * 2 + 30, 0, ended)).toBe(STEP * 2)
  })

  it('goes on to the next square when the wheel is carried past half-way', () => {
    const velocity = 300
    const at = STEP * 2 + STEP / 2 - carried(velocity) + 1

    expect(landingOffset(at, velocity, ended)).toBe(STEP * 3)
    expect(landingOffset(at, 0, ended)).toBe(STEP * 2)
  })

  it('goes back as readily as forward', () => {
    const velocity = -300
    const at = STEP * 2 + STEP / 2 - carried(velocity) - 1

    expect(landingOffset(at, velocity, ended)).toBe(STEP * 2)
    expect(landingOffset(at, 0, ended)).toBe(STEP * 3)
  })

  it('never lands past an end, nor between two squares', () => {
    expect(landingOffset(STEP * 11, 4000, ended)).toBe(STEP * 11)
    expect(landingOffset(10, -4000, ended)).toBe(0)
    expect(landingOffset(STEP * 11, 4000, looping) % STEP).toBe(0)
  })
})

describe('offsetOf', () => {
  it('is the square times the step on a wheel with ends', () => {
    expect(offsetOf(4, STEP * 9, ended)).toBe(STEP * 4)
  })

  it('takes the short way round on a looping wheel', () => {
    // From the last square to the first: one square on, not eleven back.
    expect(offsetOf(0, STEP * 11, looping)).toBe(STEP * 12)
    expect(offsetOf(11, 0, looping)).toBe(-STEP)
    expect(offsetOf(3, STEP * 2, looping)).toBe(STEP * 3)
  })

  it('stays on the turn the wheel is on', () => {
    expect(offsetOf(2, STEP * 37, looping)).toBe(STEP * 38)
  })
})

describe('squareDistance', () => {
  it('is nothing for the current square, negative above and positive below', () => {
    expect(squareDistance(3, STEP * 3, ended)).toBe(0)
    expect(squareDistance(2, STEP * 3, ended)).toBe(-1)
    expect(squareDistance(5, STEP * 3, ended)).toBe(2)
    expect(squareDistance(3, STEP * 3.5, ended)).toBe(-0.5)
  })

  it('puts the last square right above the first on a looping wheel', () => {
    expect(squareDistance(11, 0, looping)).toBe(-1)
    expect(squareDistance(0, STEP * 11, looping)).toBe(1)
  })

  it('is the same square whatever turn the wheel is on', () => {
    expect(squareDistance(1, STEP * 25, looping)).toBe(0)
    expect(squareDistance(0, -STEP * 12, looping)).toBe(0)
  })

  it('does not jump while a square is on screen', () => {
    // Half-way round is the only place a square changes side.
    const before = squareDistance(0, STEP * 5.9, looping)
    const after = squareDistance(0, STEP * 6.1, looping)

    expect(before).toBeCloseTo(-5.9)
    expect(after).toBeCloseTo(5.9)
  })
})

describe('squareOpacity', () => {
  it('always shows the current square whole', () => {
    expect(squareOpacity(0, 0)).toBe(1)
    expect(squareOpacity(0, 1)).toBe(1)
  })

  it('shows a neighbour as far as the wheel is awake', () => {
    expect(squareOpacity(1, 0)).toBe(0)
    expect(squareOpacity(-2, 0.4)).toBeCloseTo(0.4)
    expect(squareOpacity(3, 1)).toBe(1)
  })

  it('brings a square in as it nears the middle of a resting wheel', () => {
    expect(squareOpacity(0.5, 0)).toBe(0.5)
    expect(squareOpacity(-0.25, 0)).toBe(0.75)
  })
})
