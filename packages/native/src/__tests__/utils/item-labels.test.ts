import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { collectItemLabels } from '../../utils/item-labels'

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
