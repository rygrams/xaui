import { describe, expect, it } from 'vitest'
import { deriveColors } from '../../theme/derive-colors'
import { tokens } from '../../theme/tokens.gen'
import type { XAUISourceColors } from '../../theme/theme.type'

const light: XAUISourceColors = tokens.light

describe('deriveColors', () => {
  it('derives the pressed states from the source pair', () => {
    const derived = deriveColors(light)
    expect(derived.accentPressed).toBe('#9c4eee')
    expect(derived.dangerPressed).toBe('#e2473f')
  })

  it('derives the soft variants as translucent, not opaque', () => {
    const derived = deriveColors(light)
    expect(derived.accentSoft).toBe('rgba(147, 51, 234, 0.15)')
    expect(derived.dangerSoft).toBe('rgba(220, 38, 38, 0.15)')
  })

  it('follows the source when the brand colour changes', () => {
    const before = deriveColors(light)
    const after = deriveColors({ ...light, accent: '#3b82f6' })
    expect(after.accentSoft).not.toBe(before.accentSoft)
    expect(after.accentPressed).not.toBe(before.accentPressed)
    expect(after.dangerSoft).toBe(before.dangerSoft)
  })

  it('leaves backgroundInverse as the plain foreground', () => {
    expect(deriveColors(light).backgroundInverse).toBe(light.foreground)
  })
})

describe('tokens.gen', () => {
  it('exposes the same keys in both modes', () => {
    expect(Object.keys(tokens.light).sort()).toEqual(Object.keys(tokens.dark).sort())
  })

  it('carries no oklch value — React Native cannot parse it', () => {
    const values = [...Object.values(tokens.light), ...Object.values(tokens.dark)]
    expect(values.some(v => v.includes('oklch'))).toBe(false)
  })
})
