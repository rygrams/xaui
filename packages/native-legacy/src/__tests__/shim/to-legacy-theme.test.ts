import { describe, expect, it } from 'vitest'
import { createTheme, defaultTheme } from '@xaui/native/theme'
import { toLegacyTheme } from '../../shim/to-legacy-theme'

describe('toLegacyTheme', () => {
  it('projects the v1 colour roles onto the MD3 shape', () => {
    const { colors } = toLegacyTheme(defaultTheme.light)
    const v1 = defaultTheme.light.colors

    expect(colors.primary).toEqual({
      main: v1.accent,
      onMain: v1.accentForeground,
      container: v1.accentSoft,
      onContainer: v1.accentSoftForeground,
    })
    expect(colors.danger.main).toBe(v1.danger)
    expect(colors.warning.container).toBe(v1.warningSoft)
    expect(colors.success.onContainer).toBe(v1.successSoftForeground)
    expect(colors.default.onMain).toBe(v1.defaultForeground)
    expect(colors.background).toBe(v1.background)
  })

  it('projects the two dropped roles onto the surface levels', () => {
    const { colors } = toLegacyTheme(defaultTheme.light)
    const v1 = defaultTheme.light.colors

    expect(colors.secondary.main).toBe(v1.surfaceSecondary)
    expect(colors.tertiary.main).toBe(v1.surfaceTertiary)
  })

  it('carries a themed accent through to the legacy primary', () => {
    const themed = createTheme({ colors: { light: { accent: '#3b82f6' } } })

    expect(toLegacyTheme(themed.light).colors.primary.main).toBe('#3b82f6')
  })

  it('keeps the legacy spacing and radius values at the default scales', () => {
    const { spacing, borderRadius } = toLegacyTheme(defaultTheme.light)

    expect(spacing).toEqual({
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
      '3xl': 64,
    })
    expect(borderRadius.none).toBe(0)
    expect(borderRadius.lg).toBe(12)
    expect(borderRadius.full).toBe(9999)
  })

  it('moves the legacy radius scale with the v1 base', () => {
    const themed = createTheme({ radius: 24 })

    expect(toLegacyTheme(themed.light).borderRadius.lg).toBe(24)
  })

  it('derives the six legacy border widths from the single v1 one', () => {
    expect(toLegacyTheme(defaultTheme.light).borderWidth).toEqual({
      none: 0,
      xs: 0.5,
      sm: 1,
      md: 1.75,
      lg: 2.5,
      xl: 3,
    })
  })

  it('follows the mode of the theme it is given', () => {
    expect(toLegacyTheme(defaultTheme.light).mode).toBe('light')
    expect(toLegacyTheme(defaultTheme.dark).mode).toBe('dark')
  })

  it('returns the same object for the same theme, so styles stay referentially stable', () => {
    expect(toLegacyTheme(defaultTheme.light)).toBe(toLegacyTheme(defaultTheme.light))
    expect(toLegacyTheme(defaultTheme.light)).not.toBe(
      toLegacyTheme(defaultTheme.dark)
    )
  })
})
