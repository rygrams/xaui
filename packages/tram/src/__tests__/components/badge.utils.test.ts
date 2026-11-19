import { describe, expect, it } from 'vitest'
import { placementInsets } from '../../components/badge/badge.utils'

describe('placementInsets', () => {
  it('leaves an unplaced badge in the flow', () => {
    expect(placementInsets(undefined)).toBeUndefined()
  })

  it('pins each corner flush, on the logical edges', () => {
    expect(placementInsets('top-end')).toEqual({
      position: 'absolute',
      top: 0,
      end: 0,
    })
    expect(placementInsets('top-start')).toEqual({
      position: 'absolute',
      top: 0,
      start: 0,
    })
    expect(placementInsets('bottom-end')).toEqual({
      position: 'absolute',
      bottom: 0,
      end: 0,
    })
    expect(placementInsets('bottom-start')).toEqual({
      position: 'absolute',
      bottom: 0,
      start: 0,
    })
  })
})
