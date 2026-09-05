import { describe, expect, it } from 'vitest'
import {
  fromFraction,
  fromValues,
  nearestThumb,
  snap,
  toFraction,
  toValues,
  withThumbAt,
} from '../../../components/slider/slider.utils'

const percent = { min: 0, max: 100, step: 1 }

describe('toFraction', () => {
  it('is zero at the minimum and one at the maximum', () => {
    expect(toFraction(0, percent)).toBe(0)
    expect(toFraction(100, percent)).toBe(1)
  })

  it('is the proportion in between', () => {
    expect(toFraction(25, percent)).toBe(0.25)
  })

  it('handles a range that does not start at zero', () => {
    expect(toFraction(20, { min: 10, max: 30, step: 1 })).toBe(0.5)
  })

  it('clamps rather than going outside', () => {
    expect(toFraction(-40, percent)).toBe(0)
    expect(toFraction(400, percent)).toBe(1)
  })

  it('is zero for an empty range rather than dividing by it', () => {
    expect(toFraction(5, { min: 5, max: 5, step: 1 })).toBe(0)
  })
})

describe('fromFraction', () => {
  it('reads the ends', () => {
    expect(fromFraction(0, percent)).toBe(0)
    expect(fromFraction(1, percent)).toBe(100)
  })

  it('snaps to the nearest step', () => {
    expect(fromFraction(0.24, { min: 0, max: 100, step: 10 })).toBe(20)
    expect(fromFraction(0.26, { min: 0, max: 100, step: 10 })).toBe(30)
  })

  it('clamps a position past either end', () => {
    expect(fromFraction(-1, percent)).toBe(0)
    expect(fromFraction(2, percent)).toBe(100)
  })
})

describe('snap', () => {
  it('counts steps from the minimum, not from zero', () => {
    // Rounding the value itself would give 0.1, 0.2, 0.3 and move every stop.
    const range = { min: 0.05, max: 1.05, step: 0.1 }

    expect(snap(0.06, range)).toBe(0.05)
    expect(snap(0.16, range)).toBe(0.15)
  })

  it('keeps the step’s own precision', () => {
    // 0.1 * 3 is 0.30000000000000004 in floating point, and a slider reporting that is a
    // slider whose value cannot be compared or displayed.
    expect(snap(0.3, { min: 0, max: 1, step: 0.1 })).toBe(0.3)
    expect(snap(0.7, { min: 0, max: 1, step: 0.1 })).toBe(0.7)
  })

  it('never leaves the range, even when a step would', () => {
    expect(snap(98, { min: 0, max: 100, step: 30 })).toBe(90)
    expect(snap(100, { min: 0, max: 100, step: 30 })).toBe(90)
  })

  it('clamps without snapping when the step is zero or negative', () => {
    expect(snap(42.7, { min: 0, max: 100, step: 0 })).toBe(42.7)
    expect(snap(142.7, { min: 0, max: 100, step: 0 })).toBe(100)
  })

  it('rounds half up, as the platform does', () => {
    expect(snap(25, { min: 0, max: 100, step: 10 })).toBe(30)
  })
})

describe('toValues and fromValues', () => {
  it('keeps a number a number and a pair a pair', () => {
    expect(toValues(40, percent)).toEqual([40])
    expect(toValues([20, 60], percent)).toEqual([20, 60])
    expect(fromValues([40])).toBe(40)
    expect(fromValues([20, 60])).toEqual([20, 60])
  })

  it('snaps both ends of a pair', () => {
    expect(toValues([22, 68], { min: 0, max: 100, step: 10 })).toEqual([20, 70])
  })
})

describe('withThumbAt', () => {
  const range = { min: 0, max: 100, step: 1 }

  it('moves the one it was given', () => {
    expect(withThumbAt([20, 60], 0, 30, range)).toEqual([30, 60])
    expect(withThumbAt([20, 60], 1, 80, range)).toEqual([20, 80])
  })

  it('stops the lower thumb at the upper rather than swapping them', () => {
    // A swap loses the finger's grip mid-drag: it ends up pushing the thumb it did not
    // pick up, and the value it was dragging runs away in the other direction.
    expect(withThumbAt([20, 60], 0, 90, range)).toEqual([60, 60])
  })

  it('stops the upper thumb at the lower', () => {
    expect(withThumbAt([20, 60], 1, 5, range)).toEqual([20, 20])
  })

  it('bounds a single thumb by the range itself', () => {
    expect(withThumbAt([40], 0, 400, range)).toEqual([100])
    expect(withThumbAt([40], 0, -400, range)).toEqual([0])
  })

  it('snaps what it lands on', () => {
    expect(withThumbAt([20, 60], 0, 34, { min: 0, max: 100, step: 10 })).toEqual([
      30, 60,
    ])
  })
})

describe('nearestThumb', () => {
  it('picks the closer one', () => {
    expect(nearestThumb([20, 60], 25)).toBe(0)
    expect(nearestThumb([20, 60], 55)).toBe(1)
  })

  it('gives a tie to the lower one, every time', () => {
    expect(nearestThumb([20, 60], 40)).toBe(0)
    expect(nearestThumb([50, 50], 50)).toBe(0)
  })

  it('is the only thumb when there is one', () => {
    expect(nearestThumb([40], 90)).toBe(0)
  })
})
