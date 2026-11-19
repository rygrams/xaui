import { describe, expect, it } from 'vitest'
import {
  draggedOffset,
  isDismissed,
  paddingBelow,
  sheetShade,
} from '../../../components/bottom-sheet/bottom-sheet.utils'

describe('paddingBelow', () => {
  it('reads the most specific bottom padding there is', () => {
    expect(paddingBelow({ paddingBottom: 24, padding: 8 })).toBe(24)
    expect(paddingBelow({ paddingVertical: 16, padding: 8 })).toBe(16)
    expect(paddingBelow({ padding: 8 })).toBe(8)
  })

  it('counts a percentage, or nothing, as none', () => {
    expect(paddingBelow({ paddingBottom: '10%' })).toBe(0)
    expect(paddingBelow({})).toBe(0)
  })
})

describe('isDismissed', () => {
  const release = {
    translationY: 0,
    velocityY: 0,
    height: 400,
    dismissThreshold: 0.35,
    dismissVelocity: 800,
  }

  it('sends the band away past the threshold, or on a fast enough throw down', () => {
    expect(isDismissed({ ...release, translationY: 150 })).toBe(true)
    expect(isDismissed({ ...release, translationY: 20, velocityY: 1200 })).toBe(true)
  })

  it('springs it back from a drag that was not decisive', () => {
    expect(isDismissed({ ...release, translationY: 100, velocityY: 300 })).toBe(
      false
    )
  })

  it('never closes on a drag up, however fast', () => {
    expect(isDismissed({ ...release, translationY: -200, velocityY: -2000 })).toBe(
      false
    )
    expect(isDismissed({ ...release, translationY: 0, velocityY: 2000 })).toBe(false)
  })
})

describe('draggedOffset', () => {
  it('follows the finger between up and gone', () => {
    expect(draggedOffset(0, 120, 400)).toBe(120)
  })

  it('goes neither above the top of the band nor further than gone', () => {
    expect(draggedOffset(0, -80, 400)).toBe(0)
    expect(draggedOffset(0, 900, 400)).toBe(400)
  })
})

describe('sheetShade', () => {
  it('keeps the dimming while up, loses it once gone, and in proportion between', () => {
    expect(sheetShade(0, 400)).toBe(1)
    expect(sheetShade(400, 400)).toBe(0)
    expect(sheetShade(100, 400)).toBe(0.75)
  })

  it('is fully dimmed before the band is measured', () => {
    expect(sheetShade(0, 0)).toBe(1)
  })
})
