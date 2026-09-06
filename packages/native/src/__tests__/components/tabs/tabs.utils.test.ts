import { describe, expect, it } from 'vitest'
import { hasLeadingSeparator } from '../../../components/tabs/tabs.utils'

/** Three tabs laid out left to right, in the order a row lays them out. */
const RECTS = {
  all: { x: 0, width: 80 },
  open: { x: 80, width: 90 },
  done: { x: 170, width: 70 },
}

describe('hasLeadingSeparator', () => {
  it('never draws one before the first tab', () => {
    expect(hasLeadingSeparator(RECTS, 'all', 'done')).toBe(false)
  })

  it('draws one between two tabs the pill is nowhere near', () => {
    expect(hasLeadingSeparator(RECTS, 'done', 'all')).toBe(true)
  })

  it('leaves both edges of the pill clear', () => {
    // `open` is selected: neither its own leading rule nor `done`'s, which sits on the
    // pill's other side, is drawn.
    expect(hasLeadingSeparator(RECTS, 'open', 'open')).toBe(false)
    expect(hasLeadingSeparator(RECTS, 'done', 'open')).toBe(false)
  })

  it('reads the order off the rectangles rather than off the object', () => {
    const shuffled = { done: RECTS.done, all: RECTS.all, open: RECTS.open }

    expect(hasLeadingSeparator(shuffled, 'all', 'done')).toBe(false)
    expect(hasLeadingSeparator(shuffled, 'open', 'all')).toBe(false)
    expect(hasLeadingSeparator(shuffled, 'done', 'all')).toBe(true)
  })

  it('draws nothing before the first layout', () => {
    expect(hasLeadingSeparator({}, 'all', 'all')).toBe(false)
  })

  it('draws every rule when nothing is selected', () => {
    expect(hasLeadingSeparator(RECTS, 'open', undefined)).toBe(true)
    expect(hasLeadingSeparator(RECTS, 'done', undefined)).toBe(true)
  })
})
