import { describe, expect, it } from 'vitest'
import { clampProgress } from '../../../components/progress/progress.hook'

describe('clampProgress', () => {
  it('returns 0 when value is 0', () => {
    expect(clampProgress(0)).toBe(0)
  })

  it('returns 1 when value is 1', () => {
    expect(clampProgress(1)).toBe(1)
  })

  it('returns 0.5 when value is 0.5', () => {
    expect(clampProgress(0.5)).toBe(0.5)
  })

  it('clamps negative value to 0', () => {
    expect(clampProgress(-0.5)).toBe(0)
  })

  it('clamps value above 1 to 1', () => {
    expect(clampProgress(1.5)).toBe(1)
  })

  it('clamps very large positive value to 1', () => {
    expect(clampProgress(100)).toBe(1)
  })
})
