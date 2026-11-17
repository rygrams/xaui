import { describe, expect, it } from 'vitest'
import { leanFor } from '../../system/tilt'

const box = { width: 120, height: 48 }

describe('leanFor', () => {
  it('does not lean when pressed at the centre', () => {
    const lean = leanFor({ x: 60, y: 24 }, box)

    expect(lean.rotateX).toBeCloseTo(0)
    expect(lean.rotateY).toBeCloseTo(0)
  })

  it('leans toward the corner that was touched', () => {
    expect(leanFor({ x: 120, y: 0 }, box)).toEqual({ rotateX: 6, rotateY: 6 })
    expect(leanFor({ x: 0, y: 48 }, box)).toEqual({ rotateX: -6, rotateY: -6 })
  })

  it('leans half as far on a wide control', () => {
    expect(leanFor({ x: 320, y: 24 }, { width: 320, height: 48 }).rotateY).toBe(3)
  })

  it('clamps a touch reported outside the box', () => {
    expect(leanFor({ x: 400, y: 24 }, box).rotateY).toBe(6)
  })

  it('stays flat until the box is measured', () => {
    expect(leanFor({ x: 10, y: 10 }, { width: 0, height: 0 })).toEqual({
      rotateX: 0,
      rotateY: 0,
    })
  })
})
