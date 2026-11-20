import { describe, expect, it, vi } from 'vitest'
import { arcPath, pieSlices } from '../../../../../native/src/system/chart'
import { drawnSlices } from '../../../components/pie-chart/pie-chart.utils'

vi.mock(
  '@xaui/native/system',
  () => import('../../../../../native/src/system/chart')
)

const RING = { cx: 50, cy: 50, outerRadius: 50 }

describe('drawnSlices', () => {
  it('draws what Native draws for a chart of several parts', () => {
    const box = { values: [3, 2, 1], diameter: 100, innerRadius: 0.62, gap: 1.5 }
    expect(drawnSlices(box)).toEqual(pieSlices(box))
  })

  it('has no slice for a row of nothing, where Native keeps a hairline', () => {
    const box = { values: [3, 0, 1], diameter: 100, innerRadius: 0, gap: 4 }
    const [first, nothing, last] = drawnSlices(box)

    expect(pieSlices(box)[1]).not.toBe('')
    expect(nothing).toBe('')
    expect([first, last]).toEqual([pieSlices(box)[0], pieSlices(box)[2]])
  })

  it('makes a sole part a whole ring, with no gap', () => {
    const [only, nothing] = drawnSlices({
      values: [5, 0],
      diameter: 100,
      innerRadius: 0.5,
      gap: 10,
    })

    expect(only).toBe(
      arcPath({ ...RING, innerRadius: 25, startAngle: 0, endAngle: Math.PI * 2 })
    )
    expect(nothing).toBe('')
  })

  it('has no slice when there is nothing to share', () => {
    expect(
      drawnSlices({ values: [0, -1], diameter: 100, innerRadius: 0, gap: 0 })
    ).toEqual([])
  })
})
