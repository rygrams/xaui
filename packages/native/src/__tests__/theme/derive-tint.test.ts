import { describe, expect, it } from 'vitest'
import { defaultTheme } from '../../theme/create-theme'
import { deriveTint } from '../../theme/derive-tint'
import { alpha, contrastOn, mix } from '../../utils/colors'

const light = defaultTheme.light
const dark = defaultTheme.dark
const color = '#7c3aed'

describe('deriveTint', () => {
  it('uses the formulas of the derived colour layer', () => {
    const tint = deriveTint(color, light)
    const foreground = contrastOn(color, light.colors.snow, light.colors.eclipse)

    // The same ratios `deriveColors` applies to `accent` — a free tint has to behave
    // like a token, not like a parallel mechanic.
    expect(tint.base).toBe(color)
    expect(tint.foreground).toBe(foreground)
    expect(tint.soft).toBe(alpha(color, 0.15))
    expect(tint.softPressed).toBe(alpha(color, 0.2))
    expect(tint.pressed).toBe(mix(color, foreground, 0.1))
    expect(tint.softForeground).toBe(mix(color, light.colors.foreground, 0.2))
  })

  it('returns the same object for the same tint and theme', () => {
    expect(deriveTint(color, light)).toBe(deriveTint(color, light))
  })

  it('derives per mode, because softForeground mixes with the mode foreground', () => {
    expect(deriveTint(color, dark)).not.toBe(deriveTint(color, light))
    expect(deriveTint(color, dark).softForeground).not.toBe(
      deriveTint(color, light).softForeground
    )
  })

  it('names the prop when the tint is not a hex value', () => {
    expect(() => deriveTint('rgba(124, 58, 237, 0.5)', light)).toThrow(/color=/)
    expect(() => deriveTint('rebeccapurple', light)).toThrow(/must be a hex value/)
  })
})
