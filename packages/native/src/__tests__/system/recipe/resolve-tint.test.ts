import { describe, expect, it } from 'vitest'
import { resolveTint, tintSliceFor } from '../../../system/recipe/resolve-tint'
import { defaultTheme } from '../../../theme/create-theme'
import { deriveTint } from '../../../theme/derive-tint'

const light = defaultTheme.light
const color = '#7c3aed'

describe('tintSliceFor', () => {
  it('reads the role off a family token suffix', () => {
    expect(tintSliceFor('accent')).toBe('base')
    expect(tintSliceFor('accentForeground')).toBe('foreground')
    expect(tintSliceFor('accentSoft')).toBe('soft')
    expect(tintSliceFor('accentSoftForeground')).toBe('softForeground')
    expect(tintSliceFor('accentPressed')).toBe('pressed')
    expect(tintSliceFor('accentSoftPressed')).toBe('softPressed')
  })

  it('treats a standalone neutral as the tint itself', () => {
    // Case-sensitivity is the whole guard here: `foreground` is a neutral in its own
    // right, not some family's contrast colour, so a tinted `ghost` paints its label in
    // the tint rather than in something contrasting against it.
    expect(tintSliceFor('foreground')).toBe('base')
    expect(tintSliceFor('border')).toBe('base')
    expect(tintSliceFor('muted')).toBe('base')
  })
})

describe('resolveTint', () => {
  it('maps every role the variant declared', () => {
    const tint = deriveTint(color, light)

    expect(
      resolveTint(
        { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
        color,
        light
      )
    ).toEqual({
      bg: tint.base,
      bgPressed: tint.pressed,
      fg: tint.foreground,
    })
  })

  it('leaves a role the variant never named absent', () => {
    const resolved = resolveTint({ fg: 'foreground' }, color, light)

    expect(resolved).toEqual({ fg: color })
    expect('bg' in resolved).toBe(false)
  })

  it('is empty when there are no tokens', () => {
    expect(resolveTint(undefined, color, light)).toEqual({})
  })
})
