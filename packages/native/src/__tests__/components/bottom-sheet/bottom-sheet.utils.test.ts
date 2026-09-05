import { describe, expect, it } from 'vitest'
import {
  collapsedExtent,
  nextSheetState,
  paddingUnderSeam,
  sheetOffset,
} from '../../../components/bottom-sheet/bottom-sheet.utils'

const TALL = { height: 600, collapsedHeight: 200 }
const PLAIN = { height: 600 }

/** A release that is decisive on distance alone, so each test varies one thing. */
const drag = (
  from: 'expanded' | 'collapsed',
  translationY: number,
  velocityY = 0
) => ({
  from,
  translationY,
  velocityY,
  projection: 0.15,
  dismissThreshold: 1 / 3,
  dismissVelocity: 900,
})

describe('sheetOffset', () => {
  it('rests where it was measured when expanded, one height down when closed', () => {
    expect(sheetOffset('expanded', TALL)).toBe(0)
    expect(sheetOffset('closed', TALL)).toBe(600)
  })

  it('shows exactly collapsedHeight of the sheet when reduced', () => {
    expect(sheetOffset('collapsed', TALL)).toBe(400)
  })

  it('has no reduced state to offset to without a collapsedHeight', () => {
    expect(sheetOffset('collapsed', PLAIN)).toBe(0)
  })

  it('never lifts off the bottom when collapsedHeight exceeds the sheet', () => {
    expect(sheetOffset('collapsed', { height: 150, collapsedHeight: 400 })).toBe(0)
  })
})

describe('nextSheetState', () => {
  it('puts an indecisive drag back where it came from', () => {
    expect(nextSheetState(drag('expanded', 40), TALL)).toBe('expanded')
    expect(nextSheetState(drag('collapsed', 40), TALL)).toBe('collapsed')
  })

  it('counts a flick that covered no distance', () => {
    expect(nextSheetState(drag('expanded', 20, 1200), TALL)).toBe('collapsed')
  })

  it('reduces before it dismisses', () => {
    expect(nextSheetState(drag('expanded', 250), TALL)).toBe('collapsed')
  })

  it('dismisses a drag aimed at the bottom rather than stopping half open', () => {
    // 520 of 600 lands past the collapsed notch by more than half of what is left.
    expect(nextSheetState(drag('expanded', 520), TALL)).toBe('closed')
  })

  it('dismisses from collapsed, which has nowhere lower to go', () => {
    expect(nextSheetState(drag('collapsed', 250), TALL)).toBe('closed')
  })

  it('goes straight out when the sheet has no reduced state', () => {
    expect(nextSheetState(drag('expanded', 250), PLAIN)).toBe('closed')
  })

  it('expands on a decisive drag up, from either state', () => {
    expect(nextSheetState(drag('collapsed', -250), TALL)).toBe('expanded')
    expect(nextSheetState(drag('expanded', -250), TALL)).toBe('expanded')
  })

  it('lets velocity carry a short drag past the notch', () => {
    // 210 alone reduces; the same drag thrown at 2000 points a second is aimed lower.
    expect(nextSheetState(drag('expanded', 210), TALL)).toBe('collapsed')
    expect(nextSheetState(drag('expanded', 210, 2000), TALL)).toBe('closed')
  })
})

describe('paddingUnderSeam', () => {
  it('reads the most specific padding the style sets', () => {
    expect(paddingUnderSeam({ padding: 20 })).toBe(20)
    expect(paddingUnderSeam({ padding: 20, paddingVertical: 12 })).toBe(12)
    expect(paddingUnderSeam({ padding: 20, paddingBottom: 8 })).toBe(8)
  })

  it('counts a padding it cannot add as none', () => {
    expect(paddingUnderSeam({})).toBe(0)
    expect(paddingUnderSeam({ padding: '10%' })).toBe(0)
  })
})

describe('collapsedExtent', () => {
  it("gives a summary's seam the padding the sheet ends with", () => {
    expect(collapsedExtent(160, 20, undefined)).toBe(180)
  })

  it('leaves collapsedHeight alone — the number said what shows', () => {
    expect(collapsedExtent(undefined, 20, 200)).toBe(200)
  })

  it('has no reduced state when neither says where to cut', () => {
    expect(collapsedExtent(undefined, 20, undefined)).toBeUndefined()
  })
})
