import { describe, expect, it } from 'vitest'
import { resolvePlacement } from '../../utils/placement'
import type { PlacementInput } from '../../utils/placement'

/** A 320-wide trigger a third of the way down an iPhone-sized screen. */
function input(overrides: Partial<PlacementInput> = {}): PlacementInput {
  return {
    anchor: { x: 20, y: 300, width: 320, height: 48 },
    content: { width: 200, height: 240 },
    window: { width: 390, height: 844 },
    placement: 'bottom',
    align: 'center',
    width: 'trigger',
    offset: 8,
    alignOffset: 0,
    avoidCollisions: true,
    insets: { top: 12, bottom: 12, start: 12, end: 12 },
    ...overrides,
  }
}

describe('resolvePlacement', () => {
  it('hangs the list under the trigger, offset by the gap', () => {
    const { top, placement } = resolvePlacement(input())

    expect(placement).toBe('bottom')
    expect(top).toBe(356) // 300 + 48 + 8
  })

  it('takes the trigger width by default, and lines the two up', () => {
    const { width, start } = resolvePlacement(input())

    expect(width).toBe(320)
    expect(start).toBe(20)
  })

  it('hugs its content when asked, centred on the trigger', () => {
    const { width, start } = resolvePlacement(input({ width: 'content-fit' }))

    expect(width).toBe(200)
    expect(start).toBe(80) // 20 + (320 - 200) / 2
  })

  it('pins a content-fit list to either edge of the trigger', () => {
    const start = resolvePlacement(input({ width: 'content-fit', align: 'start' }))
    const end = resolvePlacement(input({ width: 'content-fit', align: 'end' }))

    expect(start.start).toBe(20)
    expect(end.start).toBe(140) // 20 + 320 - 200
  })

  it('flips above when there is not enough room below', () => {
    // 48 tall at y=700 leaves 88 below and 688 above.
    const { placement, top } = resolvePlacement(
      input({ anchor: { x: 20, y: 700, width: 320, height: 48 } })
    )

    expect(placement).toBe('top')
    expect(top).toBe(452) // 700 - 8 - 240
  })

  it('stays where it was asked when the requested side fits', () => {
    // 496 below is more than the 240 it wants, even though above has more room still.
    expect(resolvePlacement(input()).placement).toBe('bottom')
  })

  it('does not flip when neither side fits — it keeps the requested one', () => {
    const { placement } = resolvePlacement(
      input({
        anchor: { x: 20, y: 300, width: 320, height: 48 },
        content: { width: 200, height: 2000 },
      })
    )

    expect(placement).toBe('bottom')
  })

  it('never flips at all when collisions are not avoided', () => {
    const { placement, maxHeight } = resolvePlacement(
      input({
        anchor: { x: 20, y: 800, width: 320, height: 48 },
        avoidCollisions: false,
      })
    )

    expect(placement).toBe('bottom')
    // Below the fold: the room is clamped at zero rather than going negative.
    expect(maxHeight).toBe(0)
  })

  it('reports the room on the chosen side as the ceiling', () => {
    const { maxHeight } = resolvePlacement(input())

    expect(maxHeight).toBe(476) // 844 - 12 - (300 + 48) - 8
  })

  it('keeps the list inside the screen insets', () => {
    const nearEnd = resolvePlacement(
      input({
        anchor: { x: 300, y: 300, width: 80, height: 48 },
        content: { width: 300, height: 100 },
        width: 'content-fit',
        align: 'start',
      })
    )

    expect(nearEnd.start).toBe(78) // 390 - 12 - 300
  })

  it('clamps a list wider than the screen to what the insets leave', () => {
    const { width } = resolvePlacement(input({ width: 1000 }))

    expect(width).toBe(366) // 390 - 12 - 12
  })

  it('shifts along the alignment axis by alignOffset', () => {
    const { start } = resolvePlacement(input({ align: 'start', alignOffset: 16 }))

    expect(start).toBe(36)
  })
})

describe('resolvePlacement — beside the trigger', () => {
  /** A 120-wide trigger near the start edge, mid-screen. */
  function beside(overrides: Partial<PlacementInput> = {}): PlacementInput {
    return input({
      anchor: { x: 40, y: 300, width: 120, height: 48 },
      content: { width: 160, height: 200 },
      placement: 'end',
      ...overrides,
    })
  }

  it('sits past the trigger on the end side', () => {
    const { start, placement } = resolvePlacement(beside())

    expect(placement).toBe('end')
    expect(start).toBe(168) // 40 + 120 + 8
  })

  it('sits before the trigger on the start side', () => {
    // Room enough: 240 points before a trigger at x=260, for a panel 160 wide.
    const { start, placement } = resolvePlacement(
      beside({
        anchor: { x: 260, y: 300, width: 120, height: 48 },
        placement: 'start',
      })
    )

    expect(placement).toBe('start')
    expect(start).toBe(92) // 260 - 8 - 160
  })

  it('is pushed inside the insets rather than off the screen', () => {
    // 40 points before the trigger, 160 asked for, and collisions off so it cannot flip.
    // It used to sit at -128 and simply not be there.
    const { start } = resolvePlacement(
      beside({ placement: 'start', avoidCollisions: false })
    )

    expect(start).toBe(12)
  })

  it('is pushed inside on the end side too, overlapping the trigger if it must', () => {
    // A trigger near the end edge: past it there are 30 points, and 160 are wanted.
    // Overlapping the button that opened it is legible; being off the screen is not.
    const { start } = resolvePlacement(
      beside({
        anchor: { x: 340, y: 300, width: 40, height: 48 },
        placement: 'end',
        avoidCollisions: false,
      })
    )

    expect(start).toBe(218) // 390 - 12 - 160
  })

  it('flips to the other side when the one asked for has no room', () => {
    // 40 points before the trigger against 190 after it.
    const { placement } = resolvePlacement(beside({ placement: 'start' }))

    expect(placement).toBe('end')
  })

  it("ignores 'trigger' width beside the trigger and hugs the content instead", () => {
    // A panel as wide as the control it sits beside says nothing about the room it has.
    const { width } = resolvePlacement(beside({ width: 'trigger' }))

    expect(width).toBe(160)
  })

  it('aligns on the cross axis, which is vertical here', () => {
    const start = resolvePlacement(beside({ align: 'start' }))
    const center = resolvePlacement(beside({ align: 'center' }))
    const end = resolvePlacement(beside({ align: 'end' }))

    expect(start.top).toBe(300)
    expect(center.top).toBe(224) // 300 + (48 - 200) / 2
    expect(end.top).toBe(148) // 300 + 48 - 200
  })

  it('bounds the height by the screen rather than by the side, beside the trigger', () => {
    // A panel next to its trigger can be as tall as the window allows; only a panel above
    // or below is bounded by the room on its own side.
    const { maxHeight } = resolvePlacement(beside())

    expect(maxHeight).toBe(820) // 844 - 12 - 12
  })

  it('keeps the cross axis inside the insets', () => {
    const { top } = resolvePlacement(
      beside({ anchor: { x: 40, y: 800, width: 120, height: 48 }, align: 'start' })
    )

    expect(top).toBe(632) // 844 - 12 - 200
  })
})

describe('resolvePlacement — content-fit against a small trigger', () => {
  it('takes the panel’s own width, not the trigger’s', () => {
    // The bug this covers: the measuring pass used to lay the panel out at the anchor's
    // width, so against a 90-point trigger a paragraph measured as a column one character
    // wide and the panel held that width forever. The arithmetic was always right — what
    // was wrong was the width it was measured at — so this pins the contract the hook has
    // to keep: whatever `content` reports is what `content-fit` returns.
    const { width } = resolvePlacement(
      input({
        anchor: { x: 40, y: 300, width: 90, height: 40 },
        content: { width: 300, height: 120 },
        width: 'content-fit',
      })
    )

    expect(width).toBe(300)
  })

  it('still refuses to exceed the screen', () => {
    const { width } = resolvePlacement(
      input({ content: { width: 900, height: 120 }, width: 'content-fit' })
    )

    expect(width).toBe(366) // 390 - 12 - 12
  })
})

describe('resolvePlacement — full', () => {
  it('is the screen less its insets', () => {
    const { width, start } = resolvePlacement(input({ width: 'full' }))

    expect(width).toBe(366) // 390 - 12 - 12
    expect(start).toBe(12)
  })

  it('ignores what the content measured at', () => {
    const { width } = resolvePlacement(
      input({ width: 'full', content: { width: 80, height: 100 } })
    )

    expect(width).toBe(366)
  })
})
