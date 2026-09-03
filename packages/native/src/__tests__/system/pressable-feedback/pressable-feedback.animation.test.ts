import { describe, expect, it } from 'vitest'
import {
  HIGHLIGHT_OPACITY,
  PRESS_DURATION,
  PRESS_SCALE,
  pressScaleFor,
  resolveAnimation,
  resolveSlotAnimation,
  rippleRadiusFor,
} from '../../../system/pressable-feedback/pressable-feedback.animation'

describe('pressScaleFor', () => {
  /**
   * The whole point of the coefficient, as one assertion: what the eye reads is the
   * displacement in points, not the ratio. A flat scale moved a 360pt row nine points and a
   * 96pt chip two, which is why wide controls lurched.
   */
  it('moves every control the same distance whatever its width', () => {
    const travel = (width: number) => width * (1 - pressScaleFor(width))

    expect(travel(96)).toBeCloseTo(travel(360), 10)
    expect(travel(360)).toBeCloseTo(travel(1024), 10)
  })

  it('applies the scale as written at the reference width', () => {
    expect(pressScaleFor(300)).toBeCloseTo(PRESS_SCALE, 10)
  })

  it('shrinks a narrow control more than a wide one', () => {
    expect(pressScaleFor(96)).toBeLessThan(pressScaleFor(360))
  })

  // Reached on the first frame, before `onLayout` has measured anything. Dividing by it
  // would send the scale to -Infinity and the control would vanish.
  it('falls back to the base scale before the first measurement', () => {
    expect(pressScaleFor(0)).toBe(PRESS_SCALE)
  })
})

describe('rippleRadiusFor', () => {
  it('covers the box from its centre — half the diagonal, plus the overshoot', () => {
    expect(rippleRadiusFor(300, 400)).toBe(255)
  })

  it('grows with the diagonal, not with either side alone', () => {
    expect(rippleRadiusFor(100, 100)).toBeGreaterThan(rippleRadiusFor(100, 10))
  })
})

describe('resolveAnimation', () => {
  it('turns everything on when unset', () => {
    expect(resolveAnimation(undefined)).toEqual({
      scale: true,
      highlight: true,
      ripple: true,
      none: false,
      disableAll: false,
    })
  })

  it.each([false, 'disabled'] as const)(
    '%s switches this component off only',
    value => {
      expect(resolveAnimation(value)).toEqual({
        scale: false,
        highlight: false,
        ripple: false,
        none: true,
        disableAll: false,
      })
    }
  )

  it("'disable-all' also marks the flag descendants inherit", () => {
    expect(resolveAnimation('disable-all').disableAll).toBe(true)
  })

  it('leaves the unnamed sub-animations on', () => {
    expect(resolveAnimation({ ripple: false })).toMatchObject({
      scale: true,
      highlight: true,
      ripple: false,
      none: false,
    })
  })

  it('reports `none` only when every sub-animation is off', () => {
    expect(resolveAnimation({ scale: false }).none).toBe(false)
    expect(
      resolveAnimation({ scale: false, highlight: false, ripple: false }).none
    ).toBe(true)
  })

  /** A list that switched its rows off cannot be overridden by a row. */
  it('lets an ancestor win over anything the component asks for', () => {
    expect(resolveAnimation(true, true)).toEqual({
      scale: false,
      highlight: false,
      ripple: false,
      none: true,
      disableAll: true,
    })
  })
})

describe('resolveSlotAnimation', () => {
  it('follows the root when the slot says nothing', () => {
    expect(resolveSlotAnimation(undefined, true, HIGHLIGHT_OPACITY)).toEqual({
      enabled: true,
      duration: PRESS_DURATION,
      opacity: HIGHLIGHT_OPACITY,
    })
  })

  it('lets the slot switch itself off while the root is on', () => {
    expect(resolveSlotAnimation(false, true, HIGHLIGHT_OPACITY).enabled).toBe(false)
  })

  it('tunes the two knobs without re-enabling anything', () => {
    expect(resolveSlotAnimation({ duration: 90, opacity: 0.3 }, true, 0.1)).toEqual({
      enabled: true,
      duration: 90,
      opacity: 0.3,
    })
  })

  /** `animation="disable-all"` on an ancestor cannot be undone by an overlay asking nicely. */
  it('stays off when the root switched everything off', () => {
    expect(resolveSlotAnimation({ opacity: 0.4 }, false, 0.1).enabled).toBe(false)
    expect(resolveSlotAnimation(true, false, 0.1).enabled).toBe(false)
  })
})
