import { Fragment, createElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import {
  markBackground,
  partitionBackground,
} from '../../../components/card/card.utils'

const Background = markBackground(function Background() {
  return null
})
function Header() {
  return null
}
function Footer() {
  return null
}

const el = (type: (...args: never[]) => null, key: string) =>
  createElement(type, { key })

const typesOf = (nodes: ReactNode) =>
  (Array.isArray(nodes) ? nodes : [nodes])
    .filter(isValidElement)
    .map(node => (node as ReactElement).type)

describe('partitionBackground', () => {
  it('leaves children untouched when none is marked', () => {
    const children = [el(Header, 'h'), el(Footer, 'f')]
    const { background, content } = partitionBackground(children)

    expect(background).toBeNull()
    // The same reference, so the caller's own keys survive rather than being replaced by
    // the positional ones `Children.toArray` assigns.
    expect(content).toBe(children)
  })

  /** The whole point: source order must not decide what sits on top of what. */
  it('hoists the background even when it is written last', () => {
    const { background, content } = partitionBackground([
      el(Header, 'h'),
      el(Footer, 'f'),
      el(Background, 'b'),
    ])

    expect(typesOf(background)).toEqual([Background])
    expect(typesOf(content)).toEqual([Header, Footer])
  })

  it('finds it written first, and does not duplicate it into the content', () => {
    const { background, content } = partitionBackground([
      el(Background, 'b'),
      el(Header, 'h'),
    ])

    expect(typesOf(background)).toEqual([Background])
    expect(typesOf(content)).toEqual([Header])
  })

  /** Two backgrounds is a caller error; painting both would stack them silently. */
  it('takes only the first mark', () => {
    const { background, content } = partitionBackground([
      el(Background, 'a'),
      el(Background, 'b'),
    ])

    expect(typesOf(background)).toEqual([Background])
    expect(typesOf(content)).toEqual([Background])
  })

  it('ignores a host element and a fragment, neither of which can carry the mark', () => {
    const children = [
      createElement('view', { key: 'v' }),
      createElement(Fragment, { key: 'f' }),
    ]

    expect(partitionBackground(children).background).toBeNull()
  })

  it('handles a single child that is the background', () => {
    const { background, content } = partitionBackground(el(Background, 'b'))

    expect(typesOf(background)).toEqual([Background])
    expect(typesOf(content)).toEqual([])
  })
})
