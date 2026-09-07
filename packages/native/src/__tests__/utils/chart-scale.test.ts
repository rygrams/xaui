import { describe, expect, it } from 'vitest'
import {
  bandScale,
  extent,
  linearScale,
  niceScale,
  pointScale,
} from '../../utils/chart-scale'

describe('linearScale', () => {
  it('maps the domain onto the range', () => {
    const scale = linearScale([0, 100], [0, 200])

    expect(scale(0)).toBe(0)
    expect(scale(50)).toBe(100)
    expect(scale(100)).toBe(200)
  })

  it('runs backwards when the range does, which is what a y axis is', () => {
    // Screen coordinates grow downwards, so the top of the plot is the smaller number.
    const scale = linearScale([0, 100], [200, 0])

    expect(scale(0)).toBe(200)
    expect(scale(100)).toBe(0)
  })

  it('extrapolates rather than clamping', () => {
    const scale = linearScale([0, 10], [0, 100])

    expect(scale(15)).toBe(150)
    expect(scale(-5)).toBe(-50)
  })

  it('puts a flat series in the middle instead of dividing by zero', () => {
    const scale = linearScale([7, 7], [0, 200])

    expect(scale(7)).toBe(100)
    expect(scale(99)).toBe(100)
  })
})

describe('niceScale', () => {
  it('rounds the domain out to whole steps', () => {
    const { domain } = niceScale(3, 47, 4)

    expect(domain[0]).toBeLessThanOrEqual(3)
    expect(domain[1]).toBeGreaterThanOrEqual(47)
    expect(domain[1] % 10).toBe(0)
  })

  it('never leaves a value above the top tick', () => {
    // An axis whose top label is below the tallest bar is an axis that lies.
    for (const max of [7, 59, 101, 4321, 0.37]) {
      const { ticks } = niceScale(0, max, 4)
      expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(max)
    }
  })

  it('steps by 1, 2, 2.5, 5 or 10 times a power of ten', () => {
    for (const max of [9, 60, 240, 1900, 0.045]) {
      const { ticks } = niceScale(0, max, 4)
      const step = ticks[1] - ticks[0]
      const magnitude = 10 ** Math.floor(Math.log10(step))

      expect([1, 2, 2.5, 5, 10]).toContain(Number((step / magnitude).toFixed(6)))
    }
  })

  it('aims for the count without forcing it', () => {
    const { ticks } = niceScale(0, 100, 4)

    // Five labels for four gaps, which is what "about four ticks" means on an axis.
    expect(ticks).toEqual([0, 25, 50, 75, 100])
  })

  it('gives a flat series an axis to sit on', () => {
    const { domain, ticks } = niceScale(42, 42, 4)

    expect(domain[0]).toBeLessThan(42)
    expect(domain[1]).toBeGreaterThan(42)
    expect(ticks).toContain(42)
  })

  it('keeps a half step’s own decimal', () => {
    // Rounding to the step's *magnitude* rather than to the step turns 0, 2.5, 5, 7.5, 10
    // into 0, 3, 5, 8, 10 — an axis whose labels are not multiples of its own step.
    expect(niceScale(0, 9, 4).ticks).toEqual([0, 2.5, 5, 7.5, 10])
  })

  it('does not leave floating point dust in a label', () => {
    const { ticks } = niceScale(0, 1, 5)

    // 0.1 + 0.2 is 0.30000000000000004, and a tick is a label.
    for (const tick of ticks) expect(String(tick).length).toBeLessThan(6)
  })

  it('falls back rather than throwing on numbers that are not', () => {
    expect(niceScale(Number.NaN, 10).ticks.length).toBeGreaterThan(0)
    expect(niceScale(0, Number.POSITIVE_INFINITY).ticks.length).toBeGreaterThan(0)
  })
})

describe('bandScale', () => {
  it('centres each category in its own slot', () => {
    const band = bandScale(4, [0, 400])

    expect(band.center(0)).toBe(50)
    expect(band.center(3)).toBe(350)
    expect(band.step).toBe(100)
  })

  it('leaves the padding empty', () => {
    const band = bandScale(4, [0, 400], 0.4)

    expect(band.width).toBeCloseTo(60)
  })

  it('never leaves a bar with no width at all', () => {
    // A padding of 1 would be a bar of nothing, which renders as a gap in the chart.
    expect(bandScale(4, [0, 400], 1).width).toBeGreaterThan(0)
  })

  it('survives an empty series', () => {
    const band = bandScale(0, [0, 400])

    expect(band.width).toBe(0)
    expect(band.center(0)).toBe(0)
  })
})

describe('pointScale', () => {
  it('puts the first and last readings on the ends', () => {
    // A line inset by half a slot at either end reads as a chart that has been cut off.
    const scale = pointScale(4, [0, 300])

    expect(scale.center(0)).toBe(0)
    expect(scale.center(3)).toBe(300)
    expect(scale.step).toBe(100)
  })

  it('centres a single reading rather than pinning it to an edge', () => {
    expect(pointScale(1, [0, 300]).center(0)).toBe(150)
  })

  it('survives an empty series', () => {
    expect(pointScale(0, [0, 300]).width).toBe(0)
  })

  it('spaces evenly, unlike the band scale it sits beside', () => {
    const points = pointScale(3, [0, 300])
    const bands = bandScale(3, [0, 300])

    expect(points.center(0)).toBe(0)
    expect(bands.center(0)).toBe(50)
  })
})

describe('extent', () => {
  it('finds the lowest and the highest', () => {
    expect(extent([3, 9, 1, 7])).toEqual([1, 9])
  })

  it('ignores what is not a number', () => {
    expect(extent([3, Number.NaN, 9, Number.POSITIVE_INFINITY])).toEqual([3, 9])
  })

  it('is zero to zero when there is nothing', () => {
    expect(extent([])).toEqual([0, 0])
    expect(extent([Number.NaN])).toEqual([0, 0])
  })
})
