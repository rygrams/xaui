import { describe, expect, it } from 'vitest'
import { discoveryGeometry } from '../../utils/discovery'
import type { DiscoveryInput } from '../../utils/discovery'

const WINDOW = { width: 390, height: 844 }

/** A 56-point FAB in the bottom trailing corner, sixteen points in — the ordinary case. */
const FAB = { x: 318, y: 756, width: 56, height: 56 }

function geometry(overrides: Partial<DiscoveryInput> = {}) {
  return discoveryGeometry({
    target: FAB,
    window: WINDOW,
    scale: 1.65,
    padding: 14,
    ...overrides,
  })
}

describe('discoveryGeometry — the disc', () => {
  it('centres the disc on the target', () => {
    const { circle } = geometry()

    expect(circle.start + circle.size / 2).toBeCloseTo(FAB.x + FAB.width / 2)
    expect(circle.top + circle.size / 2).toBeCloseTo(FAB.y + FAB.height / 2)
  })

  it('sizes the disc off the window rather than off the target', () => {
    expect(geometry({ scale: 2 }).circle.size).toBe(WINDOW.width * 2)
    expect(geometry({ target: { ...FAB, width: 200 } }).circle.size).toBe(
      WINDOW.width * 1.65
    )
  })

  it('stands the halo off the target by the padding, on every side', () => {
    const { halo } = geometry({ padding: 10 })

    expect(halo.size).toBe(FAB.width + 20)
    expect(halo.start).toBe(FAB.x - 10)
    expect(halo.top).toBe(FAB.y - 10)
  })

  it('keeps a target hanging off the edge on screen', () => {
    const { target } = geometry({ target: { ...FAB, x: -40, y: -40 } })

    expect(target.start).toBe(16)
    expect(target.top).toBe(16)
  })
})

describe('discoveryGeometry — the text inside the disc', () => {
  /**
   * The whole reason the chord is computed. A block laid out at the disc's full width runs
   * past the curve at both ends, which is every first coach mark ever drawn.
   */
  it('never lays the text out wider than the disc is at that height', () => {
    const { circle, message } = geometry({ target: { ...FAB, x: 167, y: 400 } })

    const radius = circle.size / 2
    const centreY = circle.top + radius
    const top = message.top ?? WINDOW.height - (message.bottom ?? 0) - 180
    const halfChord = Math.sqrt(radius ** 2 - (top - centreY) ** 2)

    expect(message.width).toBeLessThanOrEqual(halfChord * 2)
  })

  /**
   * Pinned by the edge nearest the target, never by the far one. A block above the FAB
   * that set its `top` from a constant would run down into the FAB the moment the
   * description gained a line — which is what the legacy's `targetY - 150` did.
   */
  it('pins the block by its bottom, just above a target in the bottom half', () => {
    const { message } = geometry()

    expect(message.top).toBeUndefined()
    expect(message.bottom).toBe(WINDOW.height - (FAB.y - 30))
  })

  it('pins the block by its top, just below a target in the top half', () => {
    const target = { ...FAB, y: 80 }
    const { message } = geometry({ target })

    expect(message.bottom).toBeUndefined()
    expect(message.top).toBe(target.y + target.height + 30)
  })

  it('keeps the gap to the target whatever the text does', () => {
    // The block has no height in the geometry at all — which is the point: nothing about
    // where it sits can change when the description gains a line.
    const short = geometry()
    const tall = geometry({ scale: 3 })

    expect(short.message.bottom).toBe(tall.message.bottom)
  })

  it('leaves the text a readable width even where the chord is a sliver', () => {
    // A target at the very top: the text lands far from the disc's centre, so the chord
    // there is next to nothing and the block has to set from a screen edge instead.
    const { message } = geometry({ target: { ...FAB, x: 16, y: 16 } })

    expect(message.width).toBeGreaterThanOrEqual(280)
    expect(message.start).toBe(24)
  })

  it("measures the chord at the block's far end, not at the edge it is pinned to", () => {
    // Pinned just above the FAB, the block grows towards the disc's crown, where the
    // curve pinches. Measuring at the pinned edge instead would hand it the disc's widest
    // chord and let its first line run past the curve.
    const { circle, message } = geometry({ target: { ...FAB, x: 167 } })

    const radius = circle.size / 2
    const centreY = circle.top + radius
    const pinnedY = WINDOW.height - (message.bottom ?? 0)
    const atPinned = 2 * Math.sqrt(radius ** 2 - (pinnedY - centreY) ** 2)

    expect(message.width).toBeLessThan(atPinned)
  })

  it('uses the measured message height after the first layout', () => {
    const target = { ...FAB, x: 167, y: 400 }
    const estimated = geometry({ target })
    const measured = geometry({ target, messageHeight: 240 })

    // The taller rendered block reaches nearer the disc's edge, leaving a narrower chord.
    expect(measured.message.width).toBeLessThan(estimated.message.width)
  })

  it('runs the text away from the side the target is on', () => {
    expect(geometry({ target: { ...FAB, x: 16 } }).message.align).toBe('start')
    expect(geometry({ target: { ...FAB, x: 318 } }).message.align).toBe('end')
  })

  it('keeps the block inside the screen at both edges', () => {
    for (const x of [0, 100, 200, 334]) {
      const { message } = geometry({ target: { ...FAB, x } })

      expect(message.start).toBeGreaterThanOrEqual(24)
      expect(message.start + message.width).toBeLessThanOrEqual(WINDOW.width - 23)
    }
  })

  it('gives the block a height to scroll in rather than a clipped one', () => {
    expect(geometry().message.maxHeight).toBeGreaterThanOrEqual(140)
  })
})
