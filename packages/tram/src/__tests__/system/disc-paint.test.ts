import { describe, expect, it } from 'vitest'
import { discPaint } from '../../system/disc-paint'
import { tramAccents } from '../../theme/tram-tokens'

const DARK = {
  accent: '#1BA1E2',
  accentForeground: '#FFFFFF',
  background: '#000000',
  foreground: '#FFFFFF',
  muted: '#A3A3A3',
}

const LIGHT = { ...DARK, background: '#FFFFFF', foreground: '#000000', muted: '#666666' }

const RAW = '#7c3aed'

describe('discPaint', () => {
  it("is the theme's accent and its own ink when no paint is named", () => {
    expect(discPaint({}, DARK)).toEqual({
      fill: DARK.accent,
      glyph: DARK.accentForeground,
      label: DARK.foreground,
    })
  })

  it('fills with the true colour of a named accent', () => {
    expect(discPaint({ accent: 'magenta' }, DARK).fill).toBe(tramAccents.magenta)
  })

  it('draws the glyph in black on lime, amber and yellow, in white on the rest', () => {
    for (const accent of ['lime', 'amber', 'yellow'] as const) {
      expect(discPaint({ accent }, DARK).glyph).toBe('#000000')
    }
    expect(discPaint({ accent: 'cobalt' }, DARK).glyph).toBe('#FFFFFF')
  })

  it('lets a raw colour win over a named accent, uncorrected', () => {
    const paint = discPaint({ accent: 'lime', color: RAW }, DARK)

    expect(paint.fill).toBe(RAW)
    expect(paint.glyph).toBe('#FFFFFF')
  })

  it("takes the theme's ink on a raw colour it cannot measure", () => {
    const paint = discPaint({ color: 'rgb(10, 20, 30)' }, DARK)

    expect(paint.fill).toBe('rgb(10, 20, 30)')
    expect(paint.glyph).toBe(DARK.accentForeground)
  })

  it("writes the label in the page's ink, whatever the fill", () => {
    expect(discPaint({ accent: 'lime' }, DARK).label).toBe('#FFFFFF')
    expect(discPaint({ accent: 'lime' }, LIGHT).label).toBe('#000000')
  })

  it('is grey when disabled, the glyph in the colour of the ground', () => {
    expect(discPaint({ isDisabled: true }, DARK)).toEqual({
      fill: DARK.muted,
      glyph: DARK.background,
      label: DARK.muted,
    })
    expect(discPaint({ isDisabled: true }, LIGHT).glyph).toBe(LIGHT.background)
  })

  it('is the same grey whatever paint was named', () => {
    expect(discPaint({ accent: 'lime', color: RAW, isDisabled: true }, DARK)).toEqual(
      discPaint({ isDisabled: true }, DARK)
    )
  })
})
