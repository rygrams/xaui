import { describe, expect, it } from 'vitest'
import { arcPath } from '../../../system/chart/chart-path'
import { pieSlices } from '../../../system/chart/chart-pie'

/** A hundred-point ring, centred in its box. */
const RING = { cx: 50, cy: 50, outerRadius: 50 }

describe('pieSlices', () => {
  it('has no slice when there is nothing to share', () => {
    expect(pieSlices({ values: [], diameter: 100, innerRadius: 0, gap: 0 })).toEqual(
      []
    )
    expect(
      pieSlices({
        values: [0, -3, Number.NaN],
        diameter: 100,
        innerRadius: 0,
        gap: 0,
      })
    ).toEqual([])
    expect(pieSlices({ values: [1], diameter: 0, innerRadius: 0, gap: 0 })).toEqual(
      []
    )
  })

  it('splits the turn by share, clockwise from twelve', () => {
    const [first, second] = pieSlices({
      values: [1, 1],
      diameter: 100,
      innerRadius: 0,
      gap: 0,
    })

    expect(first).toBe(
      arcPath({ ...RING, innerRadius: 0, startAngle: 0, endAngle: Math.PI })
    )
    expect(second).toBe(
      arcPath({
        ...RING,
        innerRadius: 0,
        startAngle: Math.PI,
        endAngle: Math.PI * 2,
      })
    )
  })

  it('draws the gap by shortening each slice by half of it at either end', () => {
    const half = (10 * Math.PI) / 180 / 2
    const [first] = pieSlices({
      values: [1, 1],
      diameter: 100,
      innerRadius: 0,
      gap: 10,
    })

    expect(first).toBe(
      arcPath({
        ...RING,
        innerRadius: 0,
        startAngle: half,
        endAngle: Math.PI - half,
      })
    )
  })

  it('holds the gap at twenty degrees', () => {
    expect(
      pieSlices({ values: [1, 1], diameter: 100, innerRadius: 0, gap: 90 })
    ).toEqual(pieSlices({ values: [1, 1], diameter: 100, innerRadius: 0, gap: 20 }))
  })

  it('holds the hole short of the rim', () => {
    const [first] = pieSlices({
      values: [1, 1],
      diameter: 100,
      innerRadius: 2,
      gap: 0,
    })

    expect(first).toBe(
      arcPath({ ...RING, innerRadius: 47.5, startAngle: 0, endAngle: Math.PI })
    )
  })

  it('keeps a hairline for a slice thinner than the gap', () => {
    const [, tiny] = pieSlices({
      values: [10000, 1],
      diameter: 100,
      innerRadius: 0.6,
      gap: 20,
    })

    expect(tiny).not.toBe('')
  })

  it('draws a whole ring for a single share with no gap', () => {
    const [only] = pieSlices({
      values: [5],
      diameter: 100,
      innerRadius: 0.5,
      gap: 0,
    })

    expect(only).toBe(
      arcPath({ ...RING, innerRadius: 25, startAngle: 0, endAngle: Math.PI * 2 })
    )
  })
})
