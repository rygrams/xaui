import { describe, expect, it } from 'vitest'
import { stackKeys, stackRows } from '../../../system/chart/chart-stack'

const ROWS = [
  { month: 'Jan', organic: 10, paid: 4 },
  { month: 'Fév', organic: 40, paid: 'n/a' },
]

describe('stackRows', () => {
  it('adds a running total per series', () => {
    const [first] = stackRows(ROWS, ['organic', 'paid'])
    const [organic, paid] = stackKeys(['organic', 'paid'])

    expect(first[organic]).toBe(10)
    expect(first[paid]).toBe(14)
  })

  it('adds nothing for a reading that is not a number', () => {
    const [, second] = stackRows(ROWS, ['organic', 'paid'])
    expect(second[stackKeys(['paid'])[0]]).toBe(40)
  })

  it('never writes to the caller’s rows', () => {
    const rows = [{ organic: 1, paid: 2 }]
    const stacked = stackRows(rows, ['organic', 'paid'])

    expect(rows[0]).toEqual({ organic: 1, paid: 2 })
    expect(stacked[0]).not.toBe(rows[0])
  })

  it('keeps a total out of the way of the caller’s own keys', () => {
    expect(stackKeys(['organic'])).not.toContain('organic')
  })
})
