import { describe, expect, it } from 'vitest'
import {
  centreOffset,
  hingeOf,
  liftFor,
  menuPlace,
  within,
} from '../../../components/menu/menu.place'
import type { MenuPlaceInput } from '../../../components/menu/menu.place'
import { recede } from '../../../motion/motion-tokens'

const SCREEN = 800
const INSETS = { top: 40, bottom: 20 }

function place(
  anchorY: number,
  panel: number,
  preferred: 'top' | 'bottom' = 'bottom'
) {
  const input: MenuPlaceInput = {
    anchor: { x: 0, y: anchorY, width: 400, height: 80 },
    panel,
    screen: SCREEN,
    insets: INSETS,
    preferred,
  }

  return menuPlace(input)
}

describe('menuPlace', () => {
  it('hangs the panel under its anchor when it fits there', () => {
    expect(place(100, 300)).toEqual({ side: 'bottom', top: 180, maxHeight: 600 })
  })

  it('keeps the side asked for when the panel fits there', () => {
    expect(place(500, 300, 'top')).toEqual({ side: 'top', top: 200, maxHeight: 460 })
  })

  it('rests the panel on its anchor when only the top has room', () => {
    // 220 below, 560 above the anchor.
    expect(place(600, 300)).toEqual({ side: 'top', top: 300, maxHeight: 560 })
  })

  it('takes the roomier side, no taller than the room, when neither fits', () => {
    // 320 above, 340 below.
    expect(place(360, 700)).toEqual({ side: 'bottom', top: 440, maxHeight: 340 })
    // 460 above, 240 below: the panel fills the room and touches the top inset.
    expect(place(500, 700)).toEqual({ side: 'top', top: 40, maxHeight: 460 })
  })

  it('never counts a room below zero', () => {
    expect(place(10, 300, 'top')).toEqual({
      side: 'bottom',
      top: 90,
      maxHeight: 690,
    })
  })
})

describe('hingeOf', () => {
  it('turns a panel on the edge it shares with its anchor', () => {
    expect(hingeOf('bottom')).toBe('top')
    expect(hingeOf('top')).toBe('bottom')
  })
})

describe('centreOffset', () => {
  it('is the anchor centre less the page centre', () => {
    const anchor = { x: 0, y: 100, width: 400, height: 80 }
    const page = { x: 0, y: 60, width: 400, height: 740 }

    expect(centreOffset(anchor, page)).toEqual({ x: 0, y: 140 - 430 })
  })
})

describe('liftFor', () => {
  it('moves nothing while the page is in place', () => {
    const lift = liftFor(0, { x: 20, y: -300 })

    expect(lift.scale).toBe(1)
    expect(lift.translateX).toBeCloseTo(0)
    expect(lift.translateY).toBeCloseTo(0)
  })

  it.each([0.4, 1])('keeps the anchor where it was at depth %s', depth => {
    const offset = { x: 20, y: -300 }
    const lift = liftFor(depth, offset)
    const page = 1 - (1 - recede.scale) * depth

    // The anchor's centre, from the page's: lifted, then shrunk with the page.
    const x = (offset.x + lift.translateX) * page
    const y = (offset.y + lift.translateY) * page

    expect(x).toBeCloseTo(offset.x)
    expect(y).toBeCloseTo(offset.y)
    // And at its size.
    expect(lift.scale * page).toBeCloseTo(1)
  })
})

describe('within', () => {
  it('places a box laid out inside another in the window', () => {
    expect(
      within(
        { x: 24, y: 300, width: 352, height: 48 },
        { x: 0, y: 0, width: 120, height: 48 }
      )
    ).toEqual({ x: 24, y: 300, width: 120, height: 48 })
  })
})
