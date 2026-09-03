import { describe, expect, it } from 'vitest'
import {
  PRESS_SCALE,
  RIPPLE_BASE_DURATION,
  RIPPLE_MIN_DURATION,
  RIPPLE_REFERENCE_DIAGONAL,
  SCALE_REFERENCE_WIDTH,
  pressScaleFor,
  resolveAnimation,
  resolveSlotAnimation,
  rippleDurationFor,
} from '../../../system/pressable-feedback/pressable-feedback.animation'

describe('resolveAnimation', () => {
  it('animates everything when the prop is absent or true', () => {
    for (const prop of [undefined, true] as const) {
      expect(resolveAnimation(prop)).toEqual({
        scale: true,
        highlight: true,
        ripple: true,
        none: false,
        disableAll: false,
      })
    }
  })

  it('treats false and "disabled" the same, and only for this component', () => {
    for (const prop of [false, 'disabled'] as const) {
      expect(resolveAnimation(prop)).toEqual({
        scale: false,
        highlight: false,
        ripple: false,
        none: true,
        disableAll: false,
      })
    }
  })

  it('marks "disable-all" so descendants inherit it', () => {
    expect(resolveAnimation('disable-all')).toEqual({
      scale: false,
      highlight: false,
      ripple: false,
      none: true,
      disableAll: true,
    })
  })

  it('switches sub-animations off one at a time, the rest staying on', () => {
    expect(resolveAnimation({ scale: false })).toMatchObject({
      scale: false,
      highlight: true,
      ripple: true,
      none: false,
    })
  })

  it('reports `none` only when every sub-animation is off', () => {
    expect(resolveAnimation({ scale: false, highlight: false }).none).toBe(false)
    expect(
      resolveAnimation({ scale: false, highlight: false, ripple: false }).none
    ).toBe(true)
  })

  it('lets an ancestor win over anything the component asked for', () => {
    // A list that switched its rows' animations off cannot be overridden by a row.
    expect(resolveAnimation(true, true)).toMatchObject({
      none: true,
      disableAll: true,
    })
    expect(resolveAnimation({ scale: true }, true)).toMatchObject({ scale: false })
  })
})

describe('resolveSlotAnimation', () => {
  const ROOT_ON = true
  const ROOT_OFF = false

  it('falls back to the root and the defaults when the slot says nothing', () => {
    expect(resolveSlotAnimation(undefined, ROOT_ON, 0.08, 100)).toEqual({
      enabled: true,
      duration: 100,
      opacity: 0.08,
    })
  })

  it('lets a slot switch itself off while the root stays on', () => {
    expect(resolveSlotAnimation(false, ROOT_ON, 0.08).enabled).toBe(false)
  })

  it('cannot switch itself back on once the root turned everything off', () => {
    // `animation="disable-all"` on an ancestor is not negotiable from an overlay.
    expect(resolveSlotAnimation(true, ROOT_OFF, 0.08).enabled).toBe(false)
    expect(resolveSlotAnimation({ duration: 20 }, ROOT_OFF, 0.08).enabled).toBe(
      false
    )
  })

  it('overrides one knob and keeps the default for the other', () => {
    expect(resolveSlotAnimation({ duration: 400 }, ROOT_ON, 0.08, 100)).toEqual({
      enabled: true,
      duration: 400,
      opacity: 0.08,
    })
    expect(resolveSlotAnimation({ opacity: 0.5 }, ROOT_ON, 0.08, 100)).toEqual({
      enabled: true,
      duration: 100,
      opacity: 0.5,
    })
  })
})

describe('pressScaleFor', () => {
  it('applies PRESS_SCALE as written at the reference width', () => {
    expect(pressScaleFor(SCALE_REFERENCE_WIDTH)).toBeCloseTo(PRESS_SCALE, 10)
  })

  /**
   * The whole reason the coefficient exists: what the eye reads is the displacement, not
   * the ratio. A flat ratio moves a full-width row several times further than a chip.
   */
  it('moves a control by roughly the same distance whatever its width', () => {
    const travel = (width: number) => width * (1 - pressScaleFor(width))

    expect(travel(96)).toBeCloseTo(travel(360), 6)
    expect(travel(300)).toBeCloseTo(travel(180), 6)
  })

  it('shrinks a narrow control proportionally more than a wide one', () => {
    expect(pressScaleFor(100)).toBeLessThan(pressScaleFor(400))
  })

  it('falls back to the plain scale before the first layout', () => {
    expect(pressScaleFor(0)).toBeCloseTo(PRESS_SCALE, 10)
  })
})

describe('rippleDurationFor', () => {
  it('takes the base duration at the reference diagonal', () => {
    const side = RIPPLE_REFERENCE_DIAGONAL / Math.SQRT2
    expect(rippleDurationFor(side, side)).toBeCloseTo(RIPPLE_BASE_DURATION, 6)
  })

  it('gives a wider control a longer wave', () => {
    expect(rippleDurationFor(400, 200)).toBeGreaterThan(rippleDurationFor(120, 40))
  })

  it('clamps at both ends, so neither extreme flickers nor crawls', () => {
    expect(rippleDurationFor(10, 10)).toBe(RIPPLE_MIN_DURATION)
    expect(rippleDurationFor(4000, 4000)).toBe(RIPPLE_BASE_DURATION * 2)
  })

  it('falls back to the base duration before the first layout', () => {
    expect(rippleDurationFor(0, 0)).toBe(RIPPLE_BASE_DURATION)
  })
})
