import { describe, expect, it } from 'vitest'
import {
  inkFor,
  radiusFrom,
} from '../../../system/pressable-feedback/pressable-feedback.surface'

const COLORS = { snow: '#ffffff', eclipse: '#0a0a0a', foreground: '#3f3f46' }

describe('inkFor', () => {
  it('takes the light side on a saturated fill', () => {
    expect(inkFor('#9333ea', COLORS)).toBe(COLORS.snow)
  })

  it('takes the dark side on a pale surface', () => {
    expect(inkFor('#fafafa', COLORS)).toBe(COLORS.eclipse)
  })

  /**
   * The crash the perf harness caught. Every `…Soft` token is an `rgba()`, and `contrastOn`
   * throws on anything that is not hex rather than guessing — so every soft variant would
   * have taken the whole screen down on first press.
   */
  it('falls back to the foreground on a translucent background', () => {
    expect(inkFor('rgba(147, 51, 234, 0.12)', COLORS)).toBe(COLORS.foreground)
  })

  it('falls back to the foreground when there is no background at all', () => {
    expect(inkFor(undefined, COLORS)).toBe(COLORS.foreground)
  })

  // A `ghost` row is honest about it: the control is showing whatever is behind it.
  it('falls back to the foreground on a platform colour it cannot read', () => {
    expect(inkFor(0xff9333ea, COLORS)).toBe(COLORS.foreground)
  })
})

describe('radiusFrom', () => {
  it('copies the uniform radius', () => {
    expect(radiusFrom({ borderRadius: 12 })).toEqual({ borderRadius: 12 })
  })

  it('copies the logical corners', () => {
    expect(radiusFrom({ borderStartStartRadius: 8, borderEndEndRadius: 2 })).toEqual(
      { borderStartStartRadius: 8, borderEndEndRadius: 2 }
    )
  })

  /**
   * Absent rather than `undefined`: the result composes into a style array, and an explicit
   * `undefined` would wipe what an earlier entry set instead of leaving it alone.
   */
  it('omits the corners the root did not set', () => {
    expect(Object.keys(radiusFrom({ borderRadius: 4 }))).toEqual(['borderRadius'])
  })

  it('keeps nothing from a style that rounds nothing', () => {
    expect(radiusFrom({ backgroundColor: '#fff' })).toEqual({})
    expect(radiusFrom(undefined)).toEqual({})
  })
})
