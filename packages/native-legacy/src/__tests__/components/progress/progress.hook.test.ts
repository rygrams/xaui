import { describe, expect, it } from 'vitest'
import { clampProgress } from '../../../components/progress/progress.hook'

describe('clampProgress', () => {
  it('should return 0 when value is 0', () => {
    expect(clampProgress(0)).toBe(0)
  })

  it('should return 1 when value is 1', () => {
    expect(clampProgress(1)).toBe(1)
  })

  it('should return 0.5 when value is 0.5', () => {
    expect(clampProgress(0.5)).toBe(0.5)
  })

  it('should clamp negative value to 0', () => {
    expect(clampProgress(-0.5)).toBe(0)
  })

  it('should clamp value above 1 to 1', () => {
    expect(clampProgress(1.5)).toBe(1)
  })

  it('should clamp very large positive value to 1', () => {
    expect(clampProgress(100)).toBe(1)
  })
})
