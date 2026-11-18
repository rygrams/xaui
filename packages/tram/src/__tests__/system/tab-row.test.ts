import { describe, expect, it } from 'vitest'
import {
  fromStart,
  isRowReversed,
  nextTab,
  scrollToTab,
  tabTravel,
} from '../../system/tab-row'
import type { RowView, TabStop } from '../../system/tab-row'

const ORDER = ['all', 'unread', 'flagged', 'sent']

describe('tabTravel', () => {
  it('goes toward the end for a tab further along the row', () => {
    expect(tabTravel(ORDER, 'all', 'sent')).toBe(1)
    expect(tabTravel(ORDER, 'unread', 'flagged')).toBe(1)
  })

  it('goes toward the start for a tab before the current one', () => {
    expect(tabTravel(ORDER, 'sent', 'all')).toBe(-1)
  })

  it('goes nowhere for the same tab, a first choice or an unknown tab', () => {
    expect(tabTravel(ORDER, 'all', 'all')).toBe(0)
    expect(tabTravel(ORDER, undefined, 'all')).toBe(0)
    expect(tabTravel(ORDER, 'all', undefined)).toBe(0)
    expect(tabTravel(ORDER, 'all', 'drafts')).toBe(0)
    expect(tabTravel(ORDER, 'drafts', 'all')).toBe(0)
  })
})

describe('scrollToTab', () => {
  const view: RowView = {
    offset: 0,
    width: 300,
    content: 900,
    margin: 20,
    isReversed: false,
  }

  it('leaves a tab that is entirely visible where it is', () => {
    expect(scrollToTab({ x: 20, width: 80 }, view)).toBeUndefined()
    expect(scrollToTab({ x: 220, width: 80 }, view)).toBeUndefined()
    expect(
      scrollToTab({ x: 400, width: 80 }, { ...view, offset: 350 })
    ).toBeUndefined()
  })

  it('brings a tab cut by the end edge to the margin', () => {
    expect(scrollToTab({ x: 260, width: 80 }, view)).toBe(240)
  })

  it('brings a tab before the offset back to the margin', () => {
    expect(scrollToTab({ x: 120, width: 80 }, { ...view, offset: 400 })).toBe(100)
  })

  it('never scrolls past either end of the row', () => {
    expect(scrollToTab({ x: 820, width: 80 }, view)).toBe(600)
    expect(scrollToTab({ x: 10, width: 80 }, { ...view, offset: 50 })).toBe(0)
  })

  it('does not scroll a row that fits', () => {
    expect(scrollToTab({ x: 250, width: 80 }, { ...view, content: 280 })).toBe(0)
  })

  it('aligns the far edge on the margin in a reversed row', () => {
    const reversed = { ...view, offset: 600, isReversed: true }

    expect(scrollToTab({ x: 560, width: 80 }, reversed)).toBe(360)
    expect(scrollToTab({ x: 0, width: 80 }, reversed)).toBe(0)
    expect(scrollToTab({ x: 700, width: 80 }, reversed)).toBeUndefined()
  })
})

describe('nextTab', () => {
  const stops: TabStop[] = [
    { value: 'all', isDisabled: false },
    { value: 'unread', isDisabled: true },
    { value: 'flagged', isDisabled: false },
    { value: 'sent', isDisabled: false },
  ]

  it('steps to the neighbour', () => {
    expect(nextTab(stops, 'flagged', 1)).toBe('sent')
    expect(nextTab(stops, 'sent', -1)).toBe('flagged')
  })

  it('skips a disabled tab, both ways', () => {
    expect(nextTab(stops, 'all', 1)).toBe('flagged')
    expect(nextTab(stops, 'flagged', -1)).toBe('all')
  })

  it('goes round at either end', () => {
    expect(nextTab(stops, 'sent', 1)).toBe('all')
    expect(nextTab(stops, 'all', -1)).toBe('sent')
  })

  it('starts from the near end when nothing is chosen', () => {
    expect(nextTab(stops, undefined, 1)).toBe('all')
    expect(nextTab(stops, undefined, -1)).toBe('sent')
    expect(nextTab(stops, 'drafts', 1)).toBe('all')
  })

  it('stays on the only tab left, and finds none when all are disabled', () => {
    const one = stops.map(stop => ({ ...stop, isDisabled: stop.value !== 'sent' }))
    const none = stops.map(stop => ({ ...stop, isDisabled: true }))

    expect(nextTab(one, 'sent', 1)).toBe('sent')
    expect(nextTab(none, 'sent', 1)).toBeUndefined()
    expect(nextTab([], undefined, 1)).toBeUndefined()
  })
})

describe('isRowReversed', () => {
  it('reads the direction from the first and the last tab', () => {
    const row = [
      { x: 0, width: 80 },
      { x: 100, width: 80 },
    ]

    expect(isRowReversed(row, true)).toBe(false)
    expect(isRowReversed([...row].reverse(), false)).toBe(true)
  })

  it('falls back on the system for a row of one tab or none', () => {
    expect(isRowReversed([{ x: 0, width: 80 }], true)).toBe(true)
    expect(isRowReversed([], false)).toBe(false)
  })
})

describe('fromStart', () => {
  it('is the span x in a row that runs from the left', () => {
    expect(fromStart({ x: 120, width: 80 }, 900, false)).toBe(120)
  })

  it('is measured from the far side in a reversed row', () => {
    expect(fromStart({ x: 120, width: 80 }, 900, true)).toBe(700)
  })
})
