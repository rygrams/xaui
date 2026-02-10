import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  DonutChartCard,
  HeatmapChartCard,
  LineChartCard,
  PieChartCard,
  VerticalBarChartCard,
} from '../../../components/chart'

const sampleData = [
  { label: 'Cuts', value: 100, color: '#ffffff' },
  { label: 'Braiding', value: 98, color: '#e2af63', labelColor: '#f4f6f8' },
  { label: 'Shave', value: 97, color: '#b13cff' },
]

const barData = [
  { label: 'Monday', value: 20, color: '#57C9ED' },
  { label: 'Tuesday', value: 40, color: '#31D76A' },
  { label: 'Wednesday', value: 30, color: '#F9E300' },
]

const pieData = [
  { label: 'Cuts', value: 30, color: '#ffffff' },
  { label: 'Coloring', value: 20, color: '#57C9ED' },
  { label: 'Facials', value: 10, color: '#31D76A' },
]

const lineData = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 24 },
]

describe('DonutChartCard', () => {
  it('renders center title and total', () => {
    const { getByText } = render(
      <DonutChartCard data={sampleData} title="Total Services" total={522} />
    )

    expect(getByText('Total Services')).toBeTruthy()
    expect(getByText('522')).toBeTruthy()
  })

  it('renders legend by default', () => {
    const { getByText } = render(<DonutChartCard data={sampleData} />)
    expect(getByText('Cuts')).toBeTruthy()
    expect(getByText('Braiding')).toBeTruthy()
  })

  it('hides legend when showLegend is false', () => {
    const { queryByText } = render(
      <DonutChartCard data={sampleData} showLegend={false} />
    )
    expect(queryByText('Cuts')).toBeNull()
  })

  it('renders svg chart', () => {
    const { container } = render(<DonutChartCard data={sampleData} />)
    const circles = (container as HTMLElement).querySelectorAll('circle')
    expect(circles.length).toBeGreaterThan(1)
  })
})

describe('VerticalBarChartCard', () => {
  it('renders title, abbreviated x axis labels and full legend below', () => {
    const { getByText, getAllByText } = render(
      <VerticalBarChartCard data={barData} title="Services / Day" />
    )

    expect(getByText('Services / Day')).toBeTruthy()
    expect(getByText('Mon.')).toBeTruthy()
    expect(getByText('Tue.')).toBeTruthy()
    expect(getByText('Wed.')).toBeTruthy()
    expect(getByText('Monday')).toBeTruthy()
    expect(getByText('Tuesday')).toBeTruthy()
    expect(getByText('Wednesday')).toBeTruthy()
    expect(getAllByText('20').length).toBeGreaterThan(0)
    expect(getAllByText('40').length).toBeGreaterThan(0)
    expect(getAllByText('30').length).toBeGreaterThan(0)
  })

  it('renders min max mean axis labels when showAxes is true', () => {
    const { getAllByText } = render(<VerticalBarChartCard data={barData} showAxes />)

    expect(getAllByText('40').length).toBeGreaterThan(0)
    expect(getAllByText('30').length).toBeGreaterThan(0)
    expect(getAllByText('20').length).toBeGreaterThan(0)
  })

  it('hides y axis labels when showAxes is false', () => {
    const { getByText, queryAllByText } = render(
      <VerticalBarChartCard data={barData} showAxes={false} />
    )

    expect(getByText('Monday')).toBeTruthy()
    expect(queryAllByText('40').length).toBe(1)
    expect(queryAllByText('30').length).toBe(1)
    expect(queryAllByText('20').length).toBe(1)
  })

  it('can show full labels on x axis and hide legend below', () => {
    const { getByText, queryByText } = render(
      <VerticalBarChartCard
        data={barData}
        abbreviateXAxisLabels={false}
        showFullLegendBelow={false}
      />
    )

    expect(getByText('Monday')).toBeTruthy()
    expect(queryByText('Mon.')).toBeNull()
  })
})

describe('PieChartCard', () => {
  it('renders title, total and legend', () => {
    const { getByText } = render(
      <PieChartCard data={pieData} title="Pie" total={60} />
    )

    expect(getByText('Pie')).toBeTruthy()
    expect(getByText('60')).toBeTruthy()
    expect(getByText('Cuts')).toBeTruthy()
  })
})

describe('LineChartCard', () => {
  it('renders smooth line chart by default', () => {
    const { getByText } = render(<LineChartCard data={lineData} title="Line" />)
    expect(getByText('Line')).toBeTruthy()
    expect(getByText('Mon')).toBeTruthy()
  })

  it('renders direct line mode', () => {
    const { getByText } = render(<LineChartCard data={lineData} lineMode="direct" />)
    expect(getByText('Tue')).toBeTruthy()
  })
})

describe('HeatmapChartCard', () => {
  const heatmapData = [
    [10, 20, 30],
    [15, 25, 35],
  ]
  const xLabels = ['Monday', 'Tuesday', 'Wednesday']
  const yLabels = ['Morning', 'Afternoon']

  it('renders heatmap with title and abbreviated labels', () => {
    const { getByText } = render(
      <HeatmapChartCard
        data={heatmapData}
        title="Activity"
        xLabels={xLabels}
        yLabels={yLabels}
      />
    )
    expect(getByText('Activity')).toBeTruthy()
    expect(getByText('Mon.')).toBeTruthy()
    expect(getByText('Morni.')).toBeTruthy()
  })

  it('renders values when showValues is true', () => {
    const { getByText } = render(<HeatmapChartCard data={heatmapData} showValues />)
    expect(getByText('10')).toBeTruthy()
    expect(getByText('30')).toBeTruthy()
  })
})
