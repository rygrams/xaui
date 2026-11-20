import { describe, expect, it } from 'vitest'
import { radialFractions } from '../../../components/radial-chart/radial-chart.utils'

describe('radialFractions', () => {
  it('reads each row against its own target', () => {
    expect(
      radialFractions({ values: [1500, 5000], targets: [2000, 10000] })
    ).toEqual([0.75, 0.5])
  })

  it('reads every row against a shared target', () => {
    expect(radialFractions({ values: [300, 600], maxValue: 1200 })).toEqual([
      0.25, 0.5,
    ])
  })

  it('closes the biggest ring when no target is given', () => {
    expect(radialFractions({ values: [50, 100] })).toEqual([0.5, 1])
  })

  it('draws no arc for a negative or missing reading, and closes one past its target', () => {
    expect(
      radialFractions({ values: [-5, Number.NaN, 300], maxValue: 200 })
    ).toEqual([0, 0, 1])
  })

  it('draws no arc against a target of nothing', () => {
    expect(radialFractions({ values: [10], targets: [0] })).toEqual([0])
    expect(radialFractions({ values: [] })).toEqual([])
  })
})
