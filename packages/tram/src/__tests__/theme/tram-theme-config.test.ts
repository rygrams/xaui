import { describe, expect, it } from 'vitest'
import { buildTramThemeConfig } from '../../theme/tram-theme-config'

describe('buildTramThemeConfig', () => {
  it('defaults to cyan with white text, on true black and true white', () => {
    const { colors } = buildTramThemeConfig()

    expect(colors?.dark).toMatchObject({
      background: '#000000',
      accent: '#1BA1E2',
      accentForeground: '#FFFFFF',
    })
    expect(colors?.light?.background).toBe('#FFFFFF')
  })

  it('resolves a named accent and the text that reads on it', () => {
    const { colors } = buildTramThemeConfig({ accent: 'yellow' })

    expect(colors?.dark).toMatchObject({
      accent: '#E3C800',
      accentForeground: '#000000',
      focus: '#E3C800',
    })
  })

  it('takes a raw accent as given', () => {
    expect(buildTramThemeConfig({ accent: '#123456' }).colors?.light?.accent).toBe(
      '#123456'
    )
  })

  it('lets the caller override anything it sets', () => {
    const config = buildTramThemeConfig({
      radius: 0,
      borderWidth: { field: 2 },
      colors: { dark: { accentForeground: '#000000' } },
    })

    expect(config.radius).toBe(0)
    expect(config.borderWidth).toEqual({ default: 3, field: 2 })
    expect(config.colors?.dark?.accentForeground).toBe('#000000')
    expect(config.colors?.light?.accentForeground).toBe('#FFFFFF')
  })

  it('draws no shadow', () => {
    const { shadows } = buildTramThemeConfig()

    expect(shadows?.overlay).toMatchObject({ shadowOpacity: 0, elevation: 0 })
  })
})
