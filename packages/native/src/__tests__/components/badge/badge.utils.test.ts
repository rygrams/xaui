import { describe, expect, it } from 'vitest'
import { placementInsets } from '../../../components/badge/badge.utils'
import type { BadgePlacement } from '../../../components/badge/badge.type'

const PLACEMENTS: BadgePlacement[] = [
  'top-end',
  'top-start',
  'bottom-end',
  'bottom-start',
]

describe('placementInsets', () => {
  it('produces nothing without a placement, so a badge in flow is not nudged', () => {
    expect(placementInsets(undefined, 10)).toBeUndefined()
  })

  it('pulls the badge out of the corner it names', () => {
    expect(placementInsets('top-end', 10)).toEqual({
      position: 'absolute',
      top: -10,
      end: -10,
    })
    expect(placementInsets('bottom-start', 8)).toEqual({
      position: 'absolute',
      bottom: -8,
      start: -8,
    })
  })

  it('writes exactly one vertical and one horizontal key, never the opposite edge', () => {
    for (const placement of PLACEMENTS) {
      const insets = placementInsets(placement, 6)
      const keys = Object.keys(insets ?? {})

      expect(keys).toHaveLength(3)
      expect(keys.filter(key => key === 'top' || key === 'bottom')).toHaveLength(1)
      expect(keys.filter(key => key === 'start' || key === 'end')).toHaveLength(1)
    }
  })

  it('never writes left or right — R13', () => {
    for (const placement of PLACEMENTS) {
      const insets = placementInsets(placement, 6)

      expect(insets).not.toHaveProperty('left')
      expect(insets).not.toHaveProperty('right')
    }
  })

  it('leaves a zero offset at zero rather than dropping the position', () => {
    expect(placementInsets('top-end', 0)).toEqual({
      position: 'absolute',
      top: -0,
      end: -0,
    })
  })
})
