import { describe, expect, it } from 'vitest'
import {
  collapsedExtent,
  draggedOffset,
  nextSheetState,
  paddingUnderSeam,
  sheetOffset,
  sheetShade,
} from '../../../components/bottom-sheet/bottom-sheet.utils'
import type { SheetRelease } from '../../../components/bottom-sheet/bottom-sheet.utils'

const TALL = { height: 600, collapsedHeight: 200 }
const PLAIN = { height: 400 }

function release(overrides: Partial<SheetRelease>): SheetRelease {
  return {
    from: 'expanded',
    translationY: 0,
    velocityY: 0,
    projection: 0.15,
    dismissThreshold: 0.35,
    dismissVelocity: 800,
    ...overrides,
  }
}

describe('sheetOffset', () => {
  it('rests a full band at 0 and sends a closed one its whole height down', () => {
    expect(sheetOffset('expanded', TALL)).toBe(0)
    expect(sheetOffset('closed', TALL)).toBe(600)
  })

  it('moves a reduced band down by what is cut off', () => {
    expect(sheetOffset('collapsed', TALL)).toBe(400)
  })

  it('treats a band with no reduced state as full', () => {
    expect(sheetOffset('collapsed', PLAIN)).toBe(0)
  })

  it('never lifts a band whose reduced height is taller than itself', () => {
    expect(sheetOffset('collapsed', { height: 100, collapsedHeight: 300 })).toBe(0)
  })
})

describe('paddingUnderSeam', () => {
  it('reads the most specific padding', () => {
    expect(
      paddingUnderSeam({ padding: 4, paddingVertical: 8, paddingBottom: 12 })
    ).toBe(12)
    expect(paddingUnderSeam({ padding: 4, paddingVertical: 8 })).toBe(8)
    expect(paddingUnderSeam({ padding: 4 })).toBe(4)
  })

  it('counts a percentage as none', () => {
    expect(paddingUnderSeam({ paddingBottom: '10%' })).toBe(0)
  })
})

describe('collapsedExtent', () => {
  it('adds the bottom padding to a summary’s edge', () => {
    expect(collapsedExtent(120, 24, undefined)).toBe(144)
  })

  it('takes collapsedHeight as written without a summary', () => {
    expect(collapsedExtent(undefined, 24, 200)).toBe(200)
  })

  it('lets the summary win over collapsedHeight', () => {
    expect(collapsedExtent(120, 24, 200)).toBe(144)
  })

  it('is undefined for a band with neither', () => {
    expect(collapsedExtent(undefined, 24, undefined)).toBeUndefined()
  })
})

describe('nextSheetState', () => {
  it('puts back a drag neither far nor fast enough', () => {
    expect(nextSheetState(release({ translationY: 100 }), PLAIN)).toBe('expanded')
  })

  it('closes a band with no reduced state on a long drag down', () => {
    expect(nextSheetState(release({ translationY: 200 }), PLAIN)).toBe('closed')
  })

  it('closes on a fast flick down, however short', () => {
    expect(
      nextSheetState(release({ translationY: 20, velocityY: 1200 }), PLAIN)
    ).toBe('closed')
  })

  it('reduces a full band dragged down to the notch', () => {
    expect(nextSheetState(release({ translationY: 300 }), TALL)).toBe('collapsed')
  })

  it('closes a full band thrown past the notch', () => {
    expect(
      nextSheetState(release({ translationY: 450, velocityY: 1500 }), TALL)
    ).toBe('closed')
  })

  it('closes a reduced band dragged down', () => {
    expect(
      nextSheetState(release({ from: 'collapsed', translationY: 250 }), TALL)
    ).toBe('closed')
  })

  it('expands on a decisive drag up', () => {
    expect(
      nextSheetState(release({ from: 'collapsed', translationY: -300 }), TALL)
    ).toBe('expanded')
  })
})

describe('draggedOffset', () => {
  it('follows the finger from where the band was taken', () => {
    expect(draggedOffset(100, 50, 600)).toBe(150)
  })

  it('stops at full height', () => {
    expect(draggedOffset(0, -80, 600)).toBe(0)
  })

  it('stops once the band is gone', () => {
    expect(draggedOffset(400, 500, 600)).toBe(600)
  })
})

describe('sheetShade', () => {
  it('is fully dimmed from the lowest open place up', () => {
    expect(sheetShade(0, 600, 400)).toBe(1)
    expect(sheetShade(400, 600, 400)).toBe(1)
  })

  it('lightens in proportion on the way out', () => {
    expect(sheetShade(500, 600, 400)).toBe(0.5)
  })

  it('is clear once the band is gone', () => {
    expect(sheetShade(600, 600, 400)).toBe(0)
    expect(sheetShade(2000, 0, 0)).toBe(0)
  })
})
