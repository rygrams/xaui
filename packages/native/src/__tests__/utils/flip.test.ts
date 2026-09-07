import { describe, expect, it } from 'vitest'
import { faceAngle } from '../../utils/flip'

describe('faceAngle', () => {
  it('starts with the front flat and the back face-down', () => {
    expect(faceAngle(0, 'front')).toBe(0)
    expect(faceAngle(0, 'back')).toBe(-180)
  })

  it('ends with the back flat and the front face-down', () => {
    expect(faceAngle(1, 'front')).toBe(180)
    expect(faceAngle(1, 'back')).toBe(0)
  })

  it('keeps the two faces a half turn apart at every moment', () => {
    // The whole trick: a hidden backface is not drawn, so exactly one face is on screen at
    // any angle. A back that does not track the front shows both through the middle.
    for (const progress of [0, 0.17, 0.5, 0.83, 1]) {
      expect(faceAngle(progress, 'front') - faceAngle(progress, 'back')).toBe(180)
    }
  })

  it('follows a spring past its own ends rather than clamping', () => {
    // An overshooting spring is what makes the turn feel physical; clamping here would
    // stop the card dead at the end of the flip and start it again on the bounce.
    expect(faceAngle(1.08, 'front')).toBeCloseTo(194.4)
    expect(faceAngle(-0.05, 'front')).toBeCloseTo(-9)
  })

  it('negates both faces on reverse, so they still follow each other', () => {
    expect(faceAngle(0.5, 'front', 'reverse')).toBe(-90)
    expect(faceAngle(0.5, 'back', 'reverse')).toBe(90)
    expect(
      faceAngle(0.5, 'back', 'reverse') - faceAngle(0.5, 'front', 'reverse')
    ).toBe(180)
  })
})
