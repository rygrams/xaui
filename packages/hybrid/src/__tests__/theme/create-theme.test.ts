import { describe, expect, it } from 'vitest'
import { createTheme, defaultTheme } from '../../theme/create-theme'
import { tokens } from '../../theme/tokens.gen'

describe('createTheme', () => {
  it('uses the generated tokens and Native numeric scales by default', () => {
    expect(defaultTheme.light.colors).toBe(tokens.light)
    expect(defaultTheme.dark.colors).toBe(tokens.dark)
    expect(defaultTheme.light.spacing(3)).toBe(12)
    expect(defaultTheme.light.fontSizes.md).toBe(16)
  })

  it('derives dependent colours after a source override', () => {
    const theme = createTheme({ colors: { light: { accent: '#2563eb' } } })
    expect(theme.light.colors.accent).toBe('#2563eb')
    expect(theme.light.colors.accentPressed).not.toBe(
      defaultTheme.light.colors.accentPressed
    )
  })

  it('gives equivalent configs the same cache identity', () => {
    expect(createTheme({ spacingUnit: 5 }).id).toBe(
      createTheme({ spacingUnit: 5 }).id
    )
  })
})
