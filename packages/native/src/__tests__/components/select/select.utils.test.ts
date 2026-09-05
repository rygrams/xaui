import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import {
  collectItemLabels,
  resolvePlacement,
} from '../../../components/select/select.utils'
import type { PlacementInput } from '../../../components/select/select.utils'

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

/** Stand-ins: the collector matches by identity, so any two components will do. */
const Item = () => null
const Other = () => null
const isItem = (type: unknown) => type === Item

describe('collectItemLabels', () => {
  it('reads the label off the prop when there is one', () => {
    const tree = createElement(Item, { value: 'fr', label: 'Français' })

    expect(collectItemLabels(tree, isItem)).toEqual([['fr', 'Français']])
  })

  it('falls back to the row’s own text', () => {
    const tree = createElement(Item, { value: 'en' }, 'English')

    expect(collectItemLabels(tree, isItem)).toEqual([['en', 'English']])
  })

  it('prefers the prop over the text', () => {
    const tree = createElement(Item, { value: 'en', label: 'Anglais' }, 'English')

    expect(collectItemLabels(tree, isItem)).toEqual([['en', 'Anglais']])
  })

  it('walks past anything that is not an item', () => {
    const tree = createElement(
      Other,
      null,
      createElement(Other, null, createElement(Item, { value: 'de' }, 'Deutsch'))
    )

    expect(collectItemLabels(tree, isItem)).toEqual([['de', 'Deutsch']])
  })

  it('reads a whole list, in order', () => {
    const tree = ['fr', 'en', 'es'].map(value =>
      createElement(Item, { key: value, value, label: value.toUpperCase() })
    )

    expect(collectItemLabels(tree, isItem)).toEqual([
      ['fr', 'FR'],
      ['en', 'EN'],
      ['es', 'ES'],
    ])
  })

  it('skips a row whose children are elements and that named no label', () => {
    // childrenToString returns null for a composed tree — there is no one string to use,
    // and guessing one is what `label` exists to avoid.
    const tree = createElement(Item, { value: 'fr' }, createElement(Other))

    expect(collectItemLabels(tree, isItem)).toEqual([])
  })

  it('does not descend into an item — a nested one is not a row', () => {
    const tree = createElement(
      Item,
      { value: 'fr', label: 'Français' },
      createElement(Item, { value: 'x', label: 'Nested' })
    )

    expect(collectItemLabels(tree, isItem)).toEqual([['fr', 'Français']])
  })

  it('is empty for an empty tree', () => {
    expect(collectItemLabels(null, isItem)).toEqual([])
  })
})
