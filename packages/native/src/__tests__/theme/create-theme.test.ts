import { describe, expect, it } from 'vitest'
import { createTheme, defaultTheme } from '../../theme/create-theme'
import { tokens } from '../../theme/tokens.gen'

describe('createTheme — identity', () => {
  it('gives the same id to two calls with the same config', () => {
    const a = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    const b = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    expect(a.id).toBe(b.id)
  })

  it('gives the same id whatever the key order', () => {
    const a = createTheme({ radius: 8, spacingUnit: 4 })
    const b = createTheme({ spacingUnit: 4, radius: 8 })
    expect(a.id).toBe(b.id)
  })

  it('changes the id when a colour changes', () => {
    const a = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    const b = createTheme({ colors: { light: { accent: '#9333ea' } } })
    expect(a.id).not.toBe(b.id)
  })

  it('shares one id across both modes', () => {
    const theme = createTheme({ radius: 8 })
    expect(theme.light.id).toBe(theme.id)
    expect(theme.dark.id).toBe(theme.id)
  })
})

describe('createTheme — colours', () => {
  it('uses the generated tokens untouched when nothing is overridden', () => {
    expect(defaultTheme.light.colors.accent).toBe(tokens.light.accent)
    expect(defaultTheme.dark.colors.accentSoft).toBe(tokens.dark.accentSoft)
  })

  it('re-derives the family when a source colour is overridden', () => {
    const theme = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    expect(theme.light.colors.accent).toBe('#3b82f6')
    expect(theme.light.colors.accentSoft).toBe('rgba(59, 130, 246, 0.15)')
    expect(theme.light.colors.accentPressed).not.toBe(tokens.light.accentPressed)
  })

  it('leaves other families alone', () => {
    const theme = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    expect(theme.light.colors.dangerSoft).toBe(tokens.light.dangerSoft)
  })

  it('lets an explicit derived override win over the formula', () => {
    const theme = createTheme({
      colors: { light: { accent: '#3b82f6', accentSoft: 'rgba(59,130,246,0.22)' } },
    })
    expect(theme.light.colors.accentSoft).toBe('rgba(59,130,246,0.22)')
    expect(theme.light.colors.accentPressed).not.toBe(tokens.light.accentPressed)
  })

  it('overrides one mode without touching the other', () => {
    const theme = createTheme({ colors: { light: { accent: '#3b82f6' } } })
    expect(theme.dark.colors.accent).toBe(tokens.dark.accent)
  })
})

describe('createTheme — scales', () => {
  it('spaces on a base-4 grid', () => {
    expect(defaultTheme.light.spacing(3)).toBe(12)
    expect(createTheme({ spacingUnit: 8 }).light.spacing(3)).toBe(24)
  })

  it('derives the whole radius scale from one base', () => {
    const { radius } = createTheme({ radius: 8 }).light
    expect(radius.lg).toBe(8)
    expect(radius.sm).toBe(4)
    expect(radius['2xl']).toBe(16)
    expect(radius.full).toBe(9999)
  })

  it('merges a partial scale over the defaults', () => {
    const theme = createTheme({ controlHeights: { md: 44 } })
    expect(theme.light.controlHeights.md).toBe(44)
    expect(theme.light.controlHeights.lg).toBe(56)
  })
})

describe('createTheme — shadows', () => {
  it('drops the surface shadow in dark mode', () => {
    expect(defaultTheme.light.shadows.surface.shadowOpacity).toBeGreaterThan(0)
    expect(defaultTheme.dark.shadows.surface.shadowOpacity).toBe(0)
  })

  it('keeps an overlay shadow in both modes', () => {
    expect(defaultTheme.light.shadows.overlay.shadowOpacity).toBeGreaterThan(0)
    expect(defaultTheme.dark.shadows.overlay.shadowOpacity).toBeGreaterThan(0)
  })
})
