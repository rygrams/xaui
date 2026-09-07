import { describe, expect, it } from 'vitest'
import {
  carouselMetrics,
  indexFromOffset,
  progressFromOffset,
  stepIndex,
} from '../../utils/carousel'

describe('carouselMetrics', () => {
  it('gives the whole width to a single slide with no gap and no peek', () => {
    const { itemWidth, step, inset } = carouselMetrics({
      width: 360,
      itemsPerView: 1,
      gap: 0,
      peek: 0,
    })

    expect(itemWidth).toBe(360)
    expect(step).toBe(360)
    expect(inset).toBe(0)
  })

  it('divides the width between the slides and the gaps between them', () => {
    const { itemWidth, step } = carouselMetrics({
      width: 340,
      itemsPerView: 3,
      gap: 20,
      peek: 0,
    })

    // 340 = 3 × 100 + 2 × 20
    expect(itemWidth).toBe(100)
    expect(step).toBe(120)
  })

  it('charges the peek a gap of its own', () => {
    // Otherwise the peeking neighbour touches the slide in view, and a carousel whose
    // slides touch reads as one wide image that has been cut.
    const { itemWidth, inset } = carouselMetrics({
      width: 400,
      itemsPerView: 1,
      gap: 12,
      peek: 32,
    })

    expect(inset).toBe(44)
    expect(itemWidth).toBe(400 - 88)
  })

  it('charges nothing when there is no peek', () => {
    expect(
      carouselMetrics({ width: 400, itemsPerView: 1, gap: 12, peek: 0 }).inset
    ).toBe(0)
  })

  it('never asks for a negative slide', () => {
    // A negative width renders as nothing at all, rather than as the too-small thing the
    // caller could have seen and fixed.
    const { itemWidth } = carouselMetrics({
      width: 40,
      itemsPerView: 3,
      gap: 20,
      peek: 30,
    })

    expect(itemWidth).toBe(0)
  })

  it('treats a fractional or absent itemsPerView as at least one', () => {
    expect(
      carouselMetrics({ width: 300, itemsPerView: 0, gap: 0, peek: 0 }).itemWidth
    ).toBe(300)
    expect(
      carouselMetrics({ width: 300, itemsPerView: 2.7, gap: 0, peek: 0 }).itemWidth
    ).toBe(150)
  })
})

describe('indexFromOffset', () => {
  it('rounds to the nearest slide rather than flooring', () => {
    // An indicator that waits for the halfway point to pass lags a drag the reader can see.
    expect(indexFromOffset(0, 100, 5)).toBe(0)
    expect(indexFromOffset(49, 100, 5)).toBe(0)
    expect(indexFromOffset(51, 100, 5)).toBe(1)
    expect(indexFromOffset(150, 100, 5)).toBe(2)
  })

  it('stays inside the series when the scroll bounces past either end', () => {
    expect(indexFromOffset(-80, 100, 5)).toBe(0)
    expect(indexFromOffset(9000, 100, 5)).toBe(4)
  })

  it('is the first slide before the track has been measured', () => {
    expect(indexFromOffset(120, 0, 5)).toBe(0)
    expect(indexFromOffset(120, 100, 0)).toBe(0)
  })
})

describe('progressFromOffset', () => {
  it('reports where the track is between two slides', () => {
    expect(progressFromOffset(140, 100, 5)).toBeCloseTo(1.4)
  })

  it('clamps the rubber band at either end', () => {
    expect(progressFromOffset(-60, 100, 5)).toBe(0)
    expect(progressFromOffset(700, 100, 5)).toBe(4)
  })
})

describe('stepIndex', () => {
  it('moves one slide at a time', () => {
    expect(stepIndex(1, 1, 5, false)).toBe(2)
    expect(stepIndex(1, -1, 5, false)).toBe(0)
  })

  it('stops at the ends without a loop', () => {
    expect(stepIndex(4, 1, 5, false)).toBe(4)
    expect(stepIndex(0, -1, 5, false)).toBe(0)
  })

  it('wraps in both directions with one', () => {
    // `%` keeps the sign of its left operand in JS, so stepping back from the first slide
    // gives −1 rather than the last one.
    expect(stepIndex(4, 1, 5, true)).toBe(0)
    expect(stepIndex(0, -1, 5, true)).toBe(4)
  })

  it('survives an empty carousel', () => {
    expect(stepIndex(0, 1, 0, true)).toBe(0)
    expect(stepIndex(0, 1, 0, false)).toBe(0)
  })
})
