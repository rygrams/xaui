import { describe, expect, it } from 'vitest'
import {
  arrowTop,
  barWidth,
  squareNearness,
} from '../../../components/carousel/carousel.utils'

describe('squareNearness', () => {
  it('is whole on its own slide', () => {
    expect(squareNearness(2, 2)).toBe(1)
  })

  it('shares the way between two squares', () => {
    expect(squareNearness(1.25, 1)).toBeCloseTo(0.75)
    expect(squareNearness(1.25, 2)).toBeCloseTo(0.25)
  })

  it('is nothing a slide away or more', () => {
    expect(squareNearness(0, 1)).toBe(0)
    expect(squareNearness(0, 3)).toBe(0)
  })

  it('gives as much to one neighbour as it takes from the other', () => {
    const progress = 2.4
    expect(squareNearness(progress, 2) + squareNearness(progress, 3)).toBeCloseTo(1)
  })
})

describe('barWidth', () => {
  it('is the square at rest', () => {
    expect(barWidth(8, 0)).toBe(8)
  })

  it('is three squares long when chosen', () => {
    expect(barWidth(8, 1)).toBe(24)
  })

  it('stretches in proportion between the two', () => {
    expect(barWidth(6, 0.5)).toBe(12)
  })

  it('holds a nearness outside 0–1 at its end', () => {
    expect(barWidth(10, 2)).toBe(30)
    expect(barWidth(10, -1)).toBe(10)
  })
})

describe('arrowTop', () => {
  it('centres the key on the track', () => {
    expect(arrowTop(176, 40)).toBe(68)
  })

  it('is the top before the track is measured', () => {
    expect(arrowTop(0, 40)).toBe(0)
  })

  it('is never above the track', () => {
    expect(arrowTop(24, 40)).toBe(0)
  })
})
