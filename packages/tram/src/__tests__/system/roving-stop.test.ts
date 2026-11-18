import { describe, expect, it } from 'vitest'
import { nextStop } from '../../system/roving-stop'
import type { RovingStop } from '../../system/roving-stop'

describe('nextStop', () => {
  const stops: RovingStop[] = [
    { value: 'all', isDisabled: false },
    { value: 'unread', isDisabled: true },
    { value: 'flagged', isDisabled: false },
    { value: 'sent', isDisabled: false },
  ]

  it('steps to the neighbour', () => {
    expect(nextStop(stops, 'flagged', 1)).toBe('sent')
    expect(nextStop(stops, 'sent', -1)).toBe('flagged')
  })

  it('skips a disabled stop, both ways', () => {
    expect(nextStop(stops, 'all', 1)).toBe('flagged')
    expect(nextStop(stops, 'flagged', -1)).toBe('all')
  })

  it('goes round at either end', () => {
    expect(nextStop(stops, 'sent', 1)).toBe('all')
    expect(nextStop(stops, 'all', -1)).toBe('sent')
  })

  it('starts from the near end when nothing is chosen', () => {
    expect(nextStop(stops, undefined, 1)).toBe('all')
    expect(nextStop(stops, undefined, -1)).toBe('sent')
    expect(nextStop(stops, 'drafts', 1)).toBe('all')
  })

  it('stays on the only stop left, and finds none when all are disabled', () => {
    const one = stops.map(stop => ({ ...stop, isDisabled: stop.value !== 'sent' }))
    const none = stops.map(stop => ({ ...stop, isDisabled: true }))

    expect(nextStop(one, 'sent', 1)).toBe('sent')
    expect(nextStop(none, 'sent', 1)).toBeUndefined()
    expect(nextStop([], undefined, 1)).toBeUndefined()
  })
})
