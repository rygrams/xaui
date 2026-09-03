import { describe, expect, it } from 'vitest'
import {
  resolveAnimation,
  resolveSlotAnimation,
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
