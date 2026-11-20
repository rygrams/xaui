import { describe, expect, it, vi } from 'vitest'
import { barCorner, barLayout } from '../../../components/bar-chart/bar-chart.utils'
import type { ChartSeries } from '../../../components/chart'

vi.mock(
  '@xaui/native/system',
  () => import('../../../../../native/src/system/chart')
)

const band = { center: (index: number) => 10 + 20 * index, width: 10, step: 20 }
const scaleY = (value: number) => 100 - value

function series(key: string, values: number[]): ChartSeries {
  return { key, color: `#${key}`, values, points: [] }
}

describe('barCorner', () => {
  it('is square by default', () => {
    expect(barCorner(undefined)).toBe(0)
  })

  it('holds the corner at the Tram ceiling of 2', () => {
    expect(barCorner(4)).toBe(2)
    expect(barCorner(1.5)).toBe(1.5)
  })

  it('reads a negative or broken radius as square', () => {
    expect(barCorner(-1)).toBe(0)
    expect(barCorner(Number.NaN)).toBe(0)
  })
})

describe('barLayout', () => {
  const base = { band, scaleY, domainY: [0, 100] as const, corner: 2 }

  it('stands a bar per row on the baseline', () => {
    const bars = barLayout({
      ...base,
      series: [series('a', [30, 50])],
      isGrouped: false,
    })

    expect(bars.map(({ x, y, width, height }) => ({ x, y, width, height }))).toEqual(
      [
        { x: 5, y: 70, width: 10, height: 30 },
        { x: 25, y: 50, width: 10, height: 50 },
      ]
    )
    expect(bars.every(bar => bar.corner === 2)).toBe(true)
  })

  it('stacks running totals with no gap, the corner on the top only', () => {
    const [low, high] = barLayout({
      ...base,
      series: [series('a', [30]), series('b', [50])],
      isGrouped: false,
    })

    expect(low).toMatchObject({ y: 70, height: 30, corner: 0 })
    expect(high).toMatchObject({ y: 50, height: 20, corner: 2 })
    expect(high.y + high.height).toBe(low.y)
  })

  it('shares the slot between grouped bars', () => {
    const [first, second] = barLayout({
      ...base,
      series: [series('a', [30]), series('b', [50])],
      isGrouped: true,
    })

    expect(first).toMatchObject({ x: 5, width: 5, corner: 2 })
    expect(second).toMatchObject({ x: 10, width: 5, corner: 2 })
  })

  it('draws nothing for a reading that is not a number, or is nothing', () => {
    const bars = barLayout({
      ...base,
      series: [series('a', [Number.NaN, 0, 10])],
      isGrouped: false,
    })

    expect(bars).toHaveLength(1)
    expect(bars[0].key).toBe('a-2')
  })

  it('stands on the floor of a domain that starts above zero', () => {
    const [bar] = barLayout({
      ...base,
      domainY: [50, 100],
      series: [series('a', [80])],
      isGrouped: false,
    })

    expect(bar).toMatchObject({ y: 20, height: 30 })
  })
})
