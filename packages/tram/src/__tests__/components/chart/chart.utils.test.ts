import { describe, expect, it, vi } from 'vitest'
import {
  axisValue,
  plotLayout,
  stackKeys,
  stackRows,
  xLabelBox,
  xLabelEvery,
} from '../../../components/chart/chart.utils'
import type { PlotLayoutArgs } from '../../../components/chart/chart.utils'

// The entrypoint also pulls in React Native; the maths alone is what these cases need.
vi.mock(
  '@xaui/native/system',
  () => import('../../../../../native/src/system/chart')
)

const ROWS = [
  { month: 'jan', wifi: 10, mobile: 4 },
  { month: 'fév', wifi: 40, mobile: 'n/a' },
  { month: 'mar', wifi: 90, mobile: 12 },
]

function layout(overrides: Partial<PlotLayoutArgs> = {}) {
  return plotLayout({
    data: ROWS,
    yKeys: ['wifi', 'mobile'],
    colors: ['#0050EF', '#6A9CFF'],
    width: 300,
    height: 200,
    hasXAxis: true,
    hasYAxis: true,
    hasZeroBaseline: true,
    tickCount: 4,
    spacing: 'point',
    bandPadding: 0,
    ...overrides,
  })
}

describe('plotLayout', () => {
  it('draws nothing until the box is measured', () => {
    expect(layout({ width: 0 })).toBeNull()
    expect(layout({ height: 0 })).toBeNull()
  })

  it('reserves 40 for the y labels and 20 for the x', () => {
    expect(layout()?.frame).toEqual({ x: 40, y: 8, width: 260, height: 172 })
    expect(layout({ hasXAxis: false, hasYAxis: false })?.frame).toEqual({
      x: 0,
      y: 8,
      width: 300,
      height: 192,
    })
  })

  it('starts the axis at zero unless told otherwise', () => {
    const tall = [
      { month: 'a', wifi: 50 },
      { month: 'b', wifi: 90 },
    ]

    expect(layout({ data: tall, yKeys: ['wifi'] })?.domainY[0]).toBe(0)
    expect(
      layout({ data: tall, yKeys: ['wifi'], hasZeroBaseline: false })?.domainY[0]
    ).toBeGreaterThan(0)
  })

  it('never puts the top tick under the tallest reading', () => {
    const plot = layout()
    expect(plot?.domainY[1]).toBeGreaterThanOrEqual(90)
    expect(plot?.scaleY(90)).toBeGreaterThanOrEqual(plot?.frame.y ?? 0)
  })

  it('puts a line on the edges and a bar in its slot', () => {
    const line = layout()
    expect(line?.series[0].points[0].x).toBe(40)
    expect(line?.series[0].points[2].x).toBe(300)

    const bar = layout({ spacing: 'band' })
    expect(bar?.series[0].points[0].x).toBeCloseTo(40 + 260 / 6)
  })

  it('sits a reading that is not a number on the floor', () => {
    const plot = layout()
    expect(plot?.series[1].points[1].y).toBe(8 + 172)
  })

  it('hands each series its colour, and the first to a series past the palette', () => {
    const plot = layout({ colors: ['#0050EF'] })
    expect(plot?.series.map(one => one.color)).toEqual(['#0050EF', '#0050EF'])
  })
})

describe('axisValue', () => {
  it('is zero when the domain holds it', () => {
    expect(axisValue([0, 100])).toBe(0)
    expect(axisValue([-20, 40])).toBe(0)
  })

  it('is the edge nearest to zero otherwise', () => {
    expect(axisValue([50, 90])).toBe(50)
    expect(axisValue([-90, -10])).toBe(-10)
  })
})

describe('xLabelEvery', () => {
  it('labels every row that fits at 56 a label', () => {
    expect(xLabelEvery(12, 300)).toBe(3)
    expect(xLabelEvery(5, 1000)).toBe(1)
  })

  it('takes the count the caller asks for', () => {
    expect(xLabelEvery(12, 300, 12)).toBe(1)
    expect(xLabelEvery(12, 300, 4)).toBe(3)
  })

  it('is one for an empty chart', () => {
    expect(xLabelEvery(0, 300)).toBe(1)
  })
})

describe('xLabelBox', () => {
  const args = { center: 100, room: 40, count: 5 } as const

  it('centres a label on its reading', () => {
    expect(xLabelBox({ ...args, index: 2, spacing: 'point' })).toEqual({
      start: 80,
      width: 40,
      align: 'center',
    })
  })

  it('hangs the first and last point labels toward the inside', () => {
    expect(xLabelBox({ ...args, index: 0, spacing: 'point' })).toEqual({
      start: 100,
      width: 40,
      align: 'start',
    })
    expect(xLabelBox({ ...args, index: 4, spacing: 'point' })).toEqual({
      start: 60,
      width: 40,
      align: 'end',
    })
  })

  it('centres every bar label, and a sole point', () => {
    expect(xLabelBox({ ...args, index: 0, spacing: 'band' }).align).toBe('center')
    expect(xLabelBox({ ...args, count: 1, index: 0, spacing: 'point' }).align).toBe(
      'center'
    )
  })
})

describe('stackRows', () => {
  it('adds a running total per series', () => {
    const [first] = stackRows(ROWS, ['wifi', 'mobile'])
    const [wifi, mobile] = stackKeys(['wifi', 'mobile'])

    expect(first[wifi]).toBe(10)
    expect(first[mobile]).toBe(14)
  })

  it('adds nothing for a reading that is not a number', () => {
    const [, second] = stackRows(ROWS, ['wifi', 'mobile'])
    expect(second[stackKeys(['mobile'])[0]]).toBe(40)
  })

  it('never writes to the caller’s rows', () => {
    const rows = [{ wifi: 1, mobile: 2 }]
    const stacked = stackRows(rows, ['wifi', 'mobile'])

    expect(rows[0]).toEqual({ wifi: 1, mobile: 2 })
    expect(stacked[0]).not.toBe(rows[0])
  })

  it('keeps a total out of the way of the caller’s own keys', () => {
    expect(stackKeys(['wifi'])).not.toContain('wifi')
  })
})
