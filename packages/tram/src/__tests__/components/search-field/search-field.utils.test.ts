import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import {
  glassGeometry,
  restLine,
  splitByType,
} from '../../../components/search-field/search-field.utils'

describe('restLine', () => {
  const base = { invalidLine: 'danger', muted: 'muted', surface: 'surface' }

  it('is muted on primary and the fill on secondary', () => {
    expect(restLine({ ...base, variant: 'primary', isInvalid: false })).toBe('muted')
    expect(restLine({ ...base, variant: 'secondary', isInvalid: false })).toBe(
      'surface'
    )
  })

  it("keeps the TextField's invalid line in both variants", () => {
    expect(restLine({ ...base, variant: 'primary', isInvalid: true })).toBe('danger')
    expect(restLine({ ...base, variant: 'secondary', isInvalid: true })).toBe(
      'danger'
    )
  })
})

describe('glassGeometry', () => {
  it('fits the ring and the handle inside the square', () => {
    for (const side of [16, 20, 24]) {
      const { lens, handle } = glassGeometry(side, 2)
      const reach =
        handle.start + handle.length / 2 + (handle.length / 2) * Math.SQRT1_2

      expect(lens).toBeLessThan(side)
      expect(reach).toBeLessThanOrEqual(side)
    }
  })

  it("centres the handle on the ring's diagonal", () => {
    const { lens, handle } = glassGeometry(20, 2)
    const centreX = handle.start + handle.length / 2
    const centreY = handle.top + 1

    expect(centreX).toBeCloseTo(centreY, 0)
    expect(centreX).toBeGreaterThan(lens / 2)
  })
})

describe('splitByType', () => {
  const Start = () => null
  const Other = () => null

  it('puts the start type first and the rest after, in order', () => {
    const { start, end } = splitByType(
      [
        createElement(Other, { key: 'a' }),
        createElement(Start, { key: 'b' }),
        'text',
      ],
      Start
    )

    expect(start).toHaveLength(1)
    expect(end).toHaveLength(2)
  })

  it('drops empty children', () => {
    expect(splitByType([null, undefined, false], Start)).toEqual({
      start: [],
      end: [],
    })
  })
})
