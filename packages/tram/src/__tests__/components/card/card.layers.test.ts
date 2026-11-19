import { createElement } from 'react'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import {
  CARD_BACKGROUND,
  markBackground,
  partitionBackground,
} from '../../../components/card/card.layers'

const Header = () => null
const Layer = markBackground(() => null)

describe('partitionBackground', () => {
  it('leaves the children untouched when none is a background', () => {
    const children = [createElement(Header, { key: 'a' })]
    expect(partitionBackground(children)).toEqual({
      background: null,
      content: children,
    })
  })

  it('takes the background out wherever it was written', () => {
    const { background, content } = partitionBackground([
      createElement(Header, { key: 'a' }),
      createElement(Layer, { key: 'b' }),
    ])

    expect((background as ReactElement).type).toBe(Layer)
    expect((content as ReactElement[]).map(child => child.type)).toEqual([Header])
  })

  it('counts only the first background', () => {
    const { content } = partitionBackground([
      createElement(Layer, { key: 'a' }),
      createElement(Layer, { key: 'b' }),
    ])

    expect((content as ReactElement[]).map(child => child.type)).toEqual([Layer])
  })

  it("shares the Native card's mark, through the global registry", () => {
    expect(CARD_BACKGROUND).toBe(Symbol.for('xaui.Card.background'))
  })
})
