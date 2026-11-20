import { describe, expect, it, vi } from 'vitest'
import { areaPath } from '../../../../../native/src/system/chart'
import { areaShape } from '../../../components/area-chart/area-chart.utils'

vi.mock(
  '@xaui/native/system',
  () => import('../../../../../native/src/system/chart')
)

const TOP = [
  { x: 0, y: 10 },
  { x: 10, y: 20 },
]
const LOWER = [
  { x: 0, y: 30 },
  { x: 10, y: 40 },
]

describe('areaShape', () => {
  it('fills down to the baseline with no series under it', () => {
    expect(areaShape({ top: TOP, baseline: 50, curve: 'linear' })).toBe(
      areaPath(TOP, 50, 'linear')
    )
  })

  it('fills only the band between its edge and the one under it', () => {
    expect(
      areaShape({ top: TOP, lower: LOWER, baseline: 50, curve: 'linear' })
    ).toBe('M 0 10 L 10 20 L 10 40 L 0 30 Z')
  })

  it('curves both edges of a monotone band', () => {
    const path = areaShape({
      top: TOP,
      lower: LOWER,
      baseline: 50,
      curve: 'monotone',
    })

    expect(path.match(/C/g)).toHaveLength(2)
    expect(path.endsWith(' Z')).toBe(true)
  })

  it('draws nothing under two readings', () => {
    expect(
      areaShape({
        top: TOP.slice(0, 1),
        lower: LOWER,
        baseline: 50,
        curve: 'linear',
      })
    ).toBe('')
    expect(areaShape({ top: [], baseline: 50, curve: 'linear' })).toBe('')
  })
})
