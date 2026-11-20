import { describe, expect, it } from 'vitest'
import { radarWeb } from '../../../system/chart/chart-radar'
import type { RadarBox } from '../../../system/chart/chart-radar'

const AXES = ['vitesse', 'endurance', 'précision', 'force']

function web(overrides: Partial<RadarBox> = {}) {
  return radarWeb({
    axes: AXES,
    series: [[100, 50, 0, 25]],
    box: 200,
    hasLabels: false,
    levels: 4,
    ...overrides,
  })
}

describe('radarWeb', () => {
  it('has no web under three axes', () => {
    expect(web({ axes: ['a', 'b'] })).toBeNull()
  })

  it('gives the labels a quarter of the radius', () => {
    expect(web()?.radius).toBe(100)
    expect(web({ hasLabels: true })?.radius).toBe(76)
  })

  it('points the first axis up, and the next clockwise', () => {
    const spokes = web()?.spokes ?? []

    expect(spokes[0].end.x).toBeCloseTo(100)
    expect(spokes[0].end.y).toBeCloseTo(0)
    expect(spokes[1].end.x).toBeCloseTo(200)
    expect(spokes[1].label).toBe('endurance')
  })

  it('sets a name just outside the web', () => {
    expect(web()?.spokes[0].labelAt.y).toBeCloseTo(100 - 116)
  })

  it('draws as many rings as levels, and at least one', () => {
    expect(web()?.rings).toHaveLength(4)
    expect(web({ levels: 0 })?.rings).toHaveLength(1)
  })

  it('reaches the rim with the highest reading', () => {
    const [series] = web()?.series ?? []

    expect(series.points[0].y).toBeCloseTo(0)
    expect(series.points[1].x).toBeCloseTo(150)
    expect(series.d.endsWith('Z')).toBe(true)
  })

  it('scales every axis to `maxValue` when it is given', () => {
    const [series] = web({ maxValue: 200 })?.series ?? []
    expect(series.points[0].y).toBeCloseTo(50)
  })

  it('sits a reading that is not a number at the centre', () => {
    const [series] = web({ series: [[Number.NaN, 50, 50, 50]] })?.series ?? []
    expect(series.points[0]).toEqual({ x: 100, y: 100 })
  })

  it('keeps the web when no reading is above zero', () => {
    const result = web({ series: [[0, 0, 0, 0]] })

    expect(result?.rings).toHaveLength(4)
    expect(result?.series[0].points.every(point => point.x === 100)).toBe(true)
  })
})
