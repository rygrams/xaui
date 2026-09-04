import { describe, expect, it } from 'vitest'
import { decoratorPadding } from '../../../components/input-group/input-group.utils'

describe('decoratorPadding', () => {
  it('is nothing at all when neither decorator is there', () => {
    expect(decoratorPadding(0, 0)).toBeUndefined()
  })

  it('clears the prefix on the leading edge and the suffix on the trailing one', () => {
    expect(decoratorPadding(44, 52)).toEqual({ paddingStart: 44, paddingEnd: 52 })
  })

  it('leaves the edge the missing decorator would have taken to the recipe', () => {
    expect(decoratorPadding(44, 0)).toEqual({
      paddingStart: 44,
      paddingEnd: undefined,
    })
    expect(decoratorPadding(0, 52)).toEqual({
      paddingStart: undefined,
      paddingEnd: 52,
    })
  })

  it('ignores a width that is not one — a decorator is never negative', () => {
    expect(decoratorPadding(-1, 0)).toBeUndefined()
  })
})
