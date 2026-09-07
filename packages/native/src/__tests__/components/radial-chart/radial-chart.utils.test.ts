import { describe, expect, it } from 'vitest'
import { radialRings } from '../../../components/radial-chart/radial-chart.utils'

/** A hundred-point box with three rings of ten, separated by five. */
const BOX = { diameter: 100, count: 3, thickness: 10, gap: 5 }

describe('radialRings', () => {
  it('walks outwards in, half a stroke inside the box', () => {
    const { strokeWidth, rings } = radialRings(BOX)

    expect(strokeWidth).toBe(10)
    // 50 − 5, then a whole stroke and a gap further in each time.
    expect(rings.map(ring => ring.radius)).toEqual([45, 30, 15])
  })

  it('keeps every ring inside the canvas', () => {
    const { strokeWidth, rings } = radialRings(BOX)

    // The stroke is centred on the path, so a ring drawn at the box's own radius would
    // lose its outer half to the canvas edge.
    for (const ring of rings) {
      expect(ring.radius + strokeWidth / 2).toBeLessThanOrEqual(BOX.diameter / 2)
      expect(ring.radius - strokeWidth / 2).toBeGreaterThanOrEqual(0)
    }
  })

  it('measures the path a dash offset runs against', () => {
    const [outer] = radialRings(BOX).rings

    expect(outer.circumference).toBeCloseTo(2 * Math.PI * 45)
  })

  it('thins the rings rather than dropping the innermost ones', () => {
    // Eight rings of ten with five between them ask for 115 points of a 50-point radius.
    const { strokeWidth, rings } = radialRings({ ...BOX, count: 8 })

    expect(rings).toHaveLength(8)
    expect(strokeWidth).toBeLessThan(10)
    expect(rings[7].radius - strokeWidth / 2).toBeGreaterThanOrEqual(0)
  })

  it('gives the gap at most half the room', () => {
    // Past that a chart of several series is mostly bare ground and the rings have gone
    // to nothing.
    const { strokeWidth, rings } = radialRings({ ...BOX, gap: 1000 })

    expect(strokeWidth).toBeGreaterThan(0)
    expect(rings[2].radius - strokeWidth / 2).toBeGreaterThanOrEqual(0)
  })

  it('draws nothing where there is nothing to draw', () => {
    expect(radialRings({ ...BOX, count: 0 })).toEqual({ strokeWidth: 0, rings: [] })
    expect(radialRings({ ...BOX, diameter: 0 })).toEqual({
      strokeWidth: 0,
      rings: [],
    })
  })

  it('survives a raw number prop that is not one', () => {
    // An SVG radius of NaN draws nothing at all, with no error, on any platform.
    const { strokeWidth, rings } = radialRings({
      ...BOX,
      thickness: Number.NaN,
      gap: Number.NaN,
    })

    expect(Number.isFinite(strokeWidth)).toBe(true)
    expect(rings.every(ring => Number.isFinite(ring.radius))).toBe(true)
  })
})
