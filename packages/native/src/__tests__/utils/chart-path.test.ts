import { describe, expect, it } from 'vitest'
import { arcPath, areaPath, barPath, linePath } from '../../utils/chart-path'
import type { Point } from '../../utils/chart-scale'

const RISING: Point[] = [
  { x: 0, y: 100 },
  { x: 50, y: 60 },
  { x: 100, y: 20 },
]

/** Every coordinate in a path, in order. */
function numbers(path: string): number[] {
  return (path.match(/-?\d+(\.\d+)?/g) ?? []).map(Number)
}

describe('linePath', () => {
  it('draws nothing for fewer than two points', () => {
    expect(linePath([])).toBe('')
    expect(linePath([{ x: 0, y: 0 }])).toBe('')
  })

  it('joins the points with straight edges on linear', () => {
    expect(linePath(RISING, 'linear')).toBe('M 0 100 L 50 60 L 100 20')
  })

  it('starts at the first point and ends at the last on monotone', () => {
    const path = linePath(RISING, 'monotone')

    expect(path.startsWith('M 0 100')).toBe(true)
    expect(path.endsWith('100 20')).toBe(true)
  })

  it('passes through every point', () => {
    // A cubic's last pair per segment is the point itself, so each one has to appear.
    const path = linePath(RISING, 'monotone')

    for (const point of RISING) {
      expect(path).toContain(`${point.x} ${point.y}`)
    }
  })

  it('does not overshoot below a valley', () => {
    // The case the whole algorithm exists for: two high readings either side of a low one.
    // A midpoint-cubic bows under the valley, which on an area chart is ink below the axis.
    const valley: Point[] = [
      { x: 0, y: 0 },
      { x: 50, y: 100 },
      { x: 100, y: 0 },
    ]

    // y grows downwards, so "below the valley" is a y above 100.
    for (const value of numbers(linePath(valley, 'monotone'))) {
      expect(value).toBeLessThanOrEqual(100)
    }
  })

  it('does not overshoot above a peak', () => {
    const peak: Point[] = [
      { x: 0, y: 100 },
      { x: 50, y: 0 },
      { x: 100, y: 100 },
    ]

    for (const value of numbers(linePath(peak, 'monotone'))) {
      expect(value).toBeGreaterThanOrEqual(0)
    }
  })

  it('stays flat across a plateau', () => {
    const flat: Point[] = [
      { x: 0, y: 50 },
      { x: 50, y: 50 },
      { x: 100, y: 50 },
    ]

    for (const value of numbers(linePath(flat, 'monotone')).filter(
      (_, i) => i % 2
    )) {
      expect(value).toBe(50)
    }
  })
})

describe('areaPath', () => {
  it('draws nothing when the line does', () => {
    expect(areaPath([{ x: 0, y: 0 }], 200)).toBe('')
  })

  it('closes down to the baseline with vertical edges', () => {
    const path = areaPath(RISING, 200, 'linear')

    // Down at the last x, back at the first, then closed.
    expect(path.endsWith('L 100 200 L 0 200 Z')).toBe(true)
  })
})

describe('barPath', () => {
  it('draws nothing without width or height', () => {
    expect(barPath({ x: 0, y: 0, width: 0, height: 10 }, 4)).toBe('')
    expect(barPath({ x: 0, y: 0, width: 10, height: 0 }, 4)).toBe('')
  })

  it('is four straight edges at radius zero', () => {
    expect(barPath({ x: 0, y: 0, width: 10, height: 20 }, 0)).toBe(
      'M 0 0 L 10 0 L 10 20 L 0 20 Z'
    )
  })

  it('rounds the far end and leaves the near one square', () => {
    const path = barPath({ x: 0, y: 0, width: 20, height: 60 }, 10)

    // Two arcs at the top, and the bottom corners written as plain line joins.
    expect((path.match(/A /g) ?? []).length).toBe(2)
    expect(path).toContain('M 0 60')
  })

  it('clamps the corner to half the width', () => {
    // Otherwise the two arcs cross and the bar renders as a knot.
    const path = barPath({ x: 0, y: 0, width: 10, height: 60 }, 40)

    expect(path).toContain('A 5 5')
  })

  it('clamps the corner to the height of a bar shorter than it', () => {
    // The first bar of a chart that starts near zero, every time.
    const path = barPath({ x: 0, y: 0, width: 20, height: 3 }, 10)

    expect(path).toContain('A 3 3')
  })
})

describe('arcPath', () => {
  const base = { cx: 100, cy: 100, outerRadius: 80, innerRadius: 0 }

  it('draws nothing without a radius or a sweep', () => {
    expect(arcPath({ ...base, outerRadius: 0, startAngle: 0, endAngle: 1 })).toBe('')
    expect(arcPath({ ...base, startAngle: 1, endAngle: 1 })).toBe('')
  })

  it('starts a slice at twelve o’clock', () => {
    const path = arcPath({ ...base, startAngle: 0, endAngle: Math.PI / 2 })

    // Straight up from the centre: same x, radius above.
    expect(path).toContain('L 100 20')
  })

  it('goes clockwise', () => {
    const path = arcPath({ ...base, startAngle: 0, endAngle: Math.PI / 2 })

    // A quarter turn clockwise from the top is three o'clock.
    expect(path).toContain('180 100')
  })

  it('sets the large-arc flag past a half turn', () => {
    const small = arcPath({ ...base, startAngle: 0, endAngle: Math.PI / 2 })
    const large = arcPath({ ...base, startAngle: 0, endAngle: Math.PI * 1.5 })

    expect(small).toContain('0 1 ')
    expect(large).toContain('1 1 ')
  })

  it('draws a whole circle as two arcs rather than as nothing', () => {
    // An SVG arc from a point back to itself is a no-op, so a one-category pie would
    // otherwise render empty.
    const path = arcPath({ ...base, startAngle: 0, endAngle: Math.PI * 2 })

    expect(path).not.toBe('')
    expect((path.match(/A /g) ?? []).length).toBe(2)
  })

  it('cuts the hole out of a whole ring', () => {
    const path = arcPath({
      ...base,
      innerRadius: 40,
      startAngle: 0,
      endAngle: Math.PI * 2,
    })

    expect((path.match(/A /g) ?? []).length).toBe(4)
    expect((path.match(/Z/g) ?? []).length).toBe(2)
  })

  it('draws a donut slice as an outer arc, a step in, and an inner arc back', () => {
    const path = arcPath({
      ...base,
      innerRadius: 40,
      startAngle: 0,
      endAngle: Math.PI / 2,
    })

    expect((path.match(/A /g) ?? []).length).toBe(2)
    // Out along the outer radius first, in along the inner one after.
    expect(path.indexOf('A 80 80')).toBeLessThan(path.indexOf('A 40 40'))
  })
})
