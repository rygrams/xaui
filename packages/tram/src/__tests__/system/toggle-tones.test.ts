import { describe, expect, it } from 'vitest'
import { toggleTones } from '../../system/toggle-tones'
import type { ToggleColors } from '../../system/toggle-tones'
import { accentInk } from '../../theme/accent-ink'
import { tramAccents } from '../../theme/tram-tokens'

const DARK: ToggleColors = {
  ground: '#000000',
  ink: '#FFFFFF',
  muted: '#A3A3A3',
  accent: '#1BA1E2',
  onAccent: '#FFFFFF',
  link: '#1BA1E2',
}

const OUTLINE = { variant: 'outline', isDisabled: false } as const
const TEXT = { variant: 'text', isDisabled: false } as const

describe('toggleTones — outline', () => {
  it('draws the released box as the ground inside a line of ink', () => {
    expect(toggleTones({}, DARK, OUTLINE).off).toEqual({
      fill: '#000000',
      line: '#FFFFFF',
      text: '#FFFFFF',
    })
  })

  it("fills the chosen box with the theme's accent, its line in the same colour", () => {
    expect(toggleTones({}, DARK, OUTLINE).on).toEqual({
      fill: '#1BA1E2',
      line: '#1BA1E2',
      text: '#FFFFFF',
    })
  })

  it('fills with the true colour of a named accent, black on the three light ones', () => {
    for (const name of ['lime', 'amber', 'yellow'] as const) {
      const { on } = toggleTones({ accent: name }, DARK, OUTLINE)

      expect(on.fill).toBe(tramAccents[name])
      expect(on.text).toBe('#000000')
    }
    expect(toggleTones({ accent: 'cobalt' }, DARK, OUTLINE).on.text).toBe('#FFFFFF')
  })

  it('lets a raw colour win over a named accent, uncorrected', () => {
    const { on } = toggleTones({ accent: 'lime', color: '#7C3AED' }, DARK, OUTLINE)

    expect(on.fill).toBe('#7C3AED')
    expect(on.text).toBe('#FFFFFF')
  })

  it("gives a colour it cannot measure the theme's ink on the accent", () => {
    const lime = { ...DARK, onAccent: '#000000' }

    expect(toggleTones({ color: 'rgb(0, 0, 0)' }, lime, OUTLINE).on.text).toBe(
      '#000000'
    )
  })
})

describe('toggleTones — text', () => {
  it('has no box in either state', () => {
    const { off, on } = toggleTones({ accent: 'lime' }, DARK, TEXT)

    expect([off.fill, off.line, on.fill, on.line]).toEqual([
      'transparent',
      'transparent',
      'transparent',
      'transparent',
    ])
  })

  it("moves the label from the ink to the theme's accent as ink", () => {
    const { off, on } = toggleTones({}, DARK, TEXT)

    expect(off.text).toBe('#FFFFFF')
    expect(on.text).toBe(DARK.link)
  })

  it('reads a named accent as ink on the ground, and a raw colour as given', () => {
    const light = { ...DARK, ground: '#FFFFFF', ink: '#000000' }

    expect(toggleTones({ accent: 'yellow' }, light, TEXT).on.text).toBe(
      accentInk(tramAccents.yellow, '#FFFFFF')
    )
    expect(toggleTones({ color: '#FFFF00' }, light, TEXT).on.text).toBe('#FFFF00')
  })
})

describe('toggleTones — disabled', () => {
  it('greys the line and the label, and fills a chosen box with the grey', () => {
    const { off, on } = toggleTones({ accent: 'lime' }, DARK, {
      variant: 'outline',
      isDisabled: true,
    })

    expect(off).toEqual({ fill: '#000000', line: '#A3A3A3', text: '#A3A3A3' })
    expect(on).toEqual({ fill: '#A3A3A3', line: '#A3A3A3', text: '#000000' })
  })

  it('greys the label of a text toggle in both states', () => {
    const { off, on } = toggleTones({}, DARK, { variant: 'text', isDisabled: true })

    expect(off.text).toBe('#A3A3A3')
    expect(on.text).toBe('#A3A3A3')
  })
})
