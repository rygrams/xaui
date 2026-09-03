import { describe, expect, it } from 'vitest'
import { deriveColors } from '../../theme/derive-colors'
import { tokens } from '../../theme/tokens.gen'
import type { XAUISourceColors } from '../../theme/theme.type'
import { lightnessOf } from '../../utils/colors'

const light: XAUISourceColors = tokens.light
const dark: XAUISourceColors = tokens.dark

describe('deriveColors', () => {
  it('derives the pressed states from the source pair', () => {
    const derived = deriveColors(light)
    expect(derived.accentPressed).toBe('#8533d3')
    expect(derived.dangerPressed).toBe('#c72927')
  })

  it('presses towards the ink of the mode, in one direction, in both modes', () => {
    // P2-API-REVIEW §E. Mixing towards the variant's own foreground made the direction
    // follow the fill's lightness: `#9333ea` carries near-white text and lightened under
    // the finger, `#c084fc` carries dark text and darkened. Same component, opposite
    // gesture. The values above pin the formula; this pins the decision behind it, which
    // is what the fifteen core components inherit.
    const intents = ['accent', 'success', 'warning', 'danger'] as const

    for (const [source, mode] of [
      [light, 'light'],
      [dark, 'dark'],
    ] as const) {
      const derived = deriveColors(source)
      const towardsInk = Math.sign(lightnessOf(source.foreground) - 0.5)

      for (const intent of intents) {
        const moved =
          lightnessOf(derived[`${intent}Pressed`]) - lightnessOf(source[intent])

        expect(Math.sign(moved), `${intent} in ${mode}`).toBe(towardsInk)
      }
    }
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
