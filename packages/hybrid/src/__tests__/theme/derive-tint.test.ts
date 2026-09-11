import { describe, expect, it } from 'vitest'
import { deriveTint } from '../../theme/derive-tint'
import { defaultTheme } from '../../theme'

describe('deriveTint', () => {
  it('memoizes each tint within a resolved theme mode', () => {
    const first = deriveTint('#7c3aed', defaultTheme.light)
    const second = deriveTint('#7c3aed', defaultTheme.light)
    expect(second).toBe(first)
    expect(first.base).toBe('#7c3aed')
  })

  it('rejects values that cannot produce the derived tint slices', () => {
    expect(() => deriveTint('purple', defaultTheme.light)).toThrow(
      'must be a hex value'
    )
  })
})
