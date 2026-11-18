import { describe, expect, it } from 'vitest'
import { isPastVisible, stackPlaces } from '../../system/toast-stack'

const GAP = 8

function staying(height: number) {
  return { height, isLeaving: false }
}

describe('stackPlaces', () => {
  it('is empty for an empty pile', () => {
    expect(stackPlaces([], GAP)).toEqual([])
  })

  it('puts a single toast against the edge', () => {
    expect(stackPlaces([staying(56)], GAP)).toEqual([{ rank: 0, offset: 0 }])
  })

  it('puts the newest against the edge and the earlier ones past it', () => {
    // Oldest first, as in the queue.
    expect(stackPlaces([staying(56), staying(56), staying(56)], GAP)).toEqual([
      { rank: 2, offset: 128 },
      { rank: 1, offset: 64 },
      { rank: 0, offset: 0 },
    ])
  })

  it('counts the height of each toast in front, not a fixed one', () => {
    expect(stackPlaces([staying(56), staying(80), staying(40)], GAP)).toEqual([
      { rank: 2, offset: 40 + GAP + 80 + GAP },
      { rank: 1, offset: 40 + GAP },
      { rank: 0, offset: 0 },
    ])
  })

  it('closes up behind a toast that is leaving, and leaves it where it was', () => {
    const places = stackPlaces(
      [staying(56), { height: 56, isLeaving: true }, staying(56)],
      GAP
    )

    expect(places).toEqual([
      { rank: 1, offset: 64 },
      { rank: 1, offset: 64 },
      { rank: 0, offset: 0 },
    ])
  })

  it('keeps each toast where it was when they all leave together', () => {
    const leaving = { height: 56, isLeaving: true }

    expect(stackPlaces([leaving, leaving, leaving], GAP)).toEqual([
      { rank: 2, offset: 128 },
      { rank: 1, offset: 64 },
      { rank: 0, offset: 0 },
    ])
  })

  it('counts a leaving toast in front of another leaving one, not of one that stays', () => {
    const leaving = { height: 56, isLeaving: true }

    expect(stackPlaces([staying(56), leaving, leaving], GAP)).toEqual([
      { rank: 0, offset: 0 },
      { rank: 1, offset: 64 },
      { rank: 0, offset: 0 },
    ])
  })

  it('moves everything up one rank when the newest leaves', () => {
    const places = stackPlaces(
      [staying(56), staying(56), { height: 56, isLeaving: true }],
      GAP
    )

    expect(places[0]).toEqual({ rank: 1, offset: 64 })
    expect(places[1]).toEqual({ rank: 0, offset: 0 })
  })
})

describe('isPastVisible', () => {
  it('keeps the first `maxVisible` ranks in sight', () => {
    expect(isPastVisible(0, 3)).toBe(false)
    expect(isPastVisible(2, 3)).toBe(false)
  })

  it('hides the ranks from `maxVisible` on', () => {
    expect(isPastVisible(3, 3)).toBe(true)
    expect(isPastVisible(7, 3)).toBe(true)
  })

  it('hides everything when nothing may be seen', () => {
    expect(isPastVisible(0, 0)).toBe(true)
  })
})
