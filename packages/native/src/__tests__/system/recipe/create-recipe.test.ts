import { describe, expect, it } from 'vitest'
import { createRecipe } from '../../../system/recipe/create-recipe'
import { defaultTheme } from '../../../theme/create-theme'
import type { XAUIColors } from '../../../theme/theme.type'
import { alpha } from '../../../utils/colors'

const light = defaultTheme.light
const dark = defaultTheme.dark

/** Stands in for `Button`: the three token shapes a variant can take (§1 bis). */
function buttonRecipe() {
  return createRecipe({
    slots: ['root', 'label', 'spinner'],
    base: t => ({
      root: { flexDirection: 'row', gap: t.spacing(2) },
      label: { fontWeight: '500' },
    }),
    variantTokens: {
      primary: { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
      ghost: { fg: 'foreground' },
      'danger-soft': { bg: 'dangerSoft', fg: 'danger' },
    },
    paint: (_t, c) => ({
      root: { backgroundColor: c.bg },
      label: { color: c.fg },
    }),
    variants: {
      size: {
        sm: t => ({ root: { height: t.controlHeights.sm } }),
        md: t => ({ root: { height: t.controlHeights.md } }),
      },
    },
    compoundVariants: [
      {
        when: { variant: 'ghost', size: 'sm' },
        style: () => ({ root: { borderWidth: 0 } }),
      },
    ],
    states: {
      pressed: (_t, c) => ({ root: { backgroundColor: c.bgPressed } }),
      disabled: t => ({ root: { opacity: t.opacity.disabled } }),
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  })
}

describe('createRecipe — the cached pass', () => {
  it('returns the same reference for the same tokens', () => {
    const recipe = buttonRecipe()

    const first = recipe.resolve({ theme: light })
    const second = recipe.resolve({ theme: light })

    expect(second).toBe(first)
    expect(second.root).toBe(first.root)
  })

  it('keys on the mode, not just the theme id', () => {
    const recipe = buttonRecipe()

    // `createTheme` hashes one config into one id and returns both modes under it, so an
    // id-only key would hand these two the same styles.
    expect(light.id).toBe(dark.id)
    expect(recipe.resolve({ theme: dark })).not.toBe(
      recipe.resolve({ theme: light })
    )
    expect(recipe.resolve({ theme: light }).root.backgroundColor).toBe(
      light.colors.accent
    )
    expect(recipe.resolve({ theme: dark }).root.backgroundColor).toBe(
      dark.colors.accent
    )
  })

  it('gives every declared slot an entry, styled or not', () => {
    const styles = buttonRecipe().resolve({ theme: light })

    expect(Object.keys(styles).sort()).toEqual(['label', 'root', 'spinner'])
    expect(styles.spinner).toEqual({})
  })

  it('falls back to defaultVariants, and an unset prop does not erase one', () => {
    const recipe = buttonRecipe()

    expect(recipe.resolve({ theme: light }).root.height).toBe(
      light.controlHeights.md
    )
    expect(
      recipe.resolve({ theme: light, selection: { size: undefined } }).root.height
    ).toBe(light.controlHeights.md)
    expect(
      recipe.resolve({ theme: light, selection: { size: 'sm' } }).root.height
    ).toBe(light.controlHeights.sm)
  })
})

describe('createRecipe — resolution order', () => {
  it('paints the variant tokens over base', () => {
    const styles = buttonRecipe().resolve({ theme: light })

    expect(styles.root.flexDirection).toBe('row')
    expect(styles.root.backgroundColor).toBe(light.colors.accent)
    expect(styles.label.color).toBe(light.colors.accentForeground)
  })

  it('applies a compound variant only when every axis matches', () => {
    const recipe = buttonRecipe()
    const selection = { variant: 'ghost' } as const

    expect(
      recipe.resolve({ theme: light, selection: { ...selection, size: 'sm' } }).root
        .borderWidth
    ).toBe(0)
    expect(
      recipe.resolve({ theme: light, selection: { ...selection, size: 'md' } }).root
        .borderWidth
    ).toBeUndefined()
  })

  it('lets a state override a colour the variant set', () => {
    const styles = buttonRecipe().resolve({
      theme: light,
      states: { pressed: true },
    })

    expect(styles.root.backgroundColor).toBe(light.colors.accentPressed)
  })

  it('reads disabled when both pressed and disabled are active', () => {
    const styles = buttonRecipe().resolve({
      theme: light,
      states: { pressed: true, disabled: true },
    })

    expect(styles.root.opacity).toBe(light.opacity.disabled)
  })
})

describe('createRecipe — the tint pass', () => {
  it('adds no cache entry, whatever colours it is given', () => {
    const recipe = buttonRecipe()
    const before = recipe.resolve({ theme: light })

    for (const color of ['#7c3aed', '#dc2626', '#0ea5e9', '#f59e0b', '#10b981']) {
      recipe.tint({ theme: light, color })
    }

    // A colour in the key would have produced a different entry, so a different object.
    expect(recipe.resolve({ theme: light })).toBe(before)
  })

  it('lands where the variant put its tokens', () => {
    const recipe = buttonRecipe()
    const color = '#7c3aed'

    const primary = recipe.tint({
      theme: light,
      color,
      selection: { variant: 'primary' },
    })
    expect(primary.root?.backgroundColor).toBe(color)

    // `ghost` names only a foreground, so a tint colours the label and no background.
    const ghost = recipe.tint({
      theme: light,
      color,
      selection: { variant: 'ghost' },
    })
    expect(ghost.label?.color).toBe(color)
    expect(ghost.root?.backgroundColor).toBeUndefined()

    // `danger-soft` names a soft background, so the tint's soft slice fills it while the
    // label takes the full tint — the token names carry the roles.
    const soft = recipe.tint({
      theme: light,
      color,
      selection: { variant: 'danger-soft' },
    })
    expect(soft.root?.backgroundColor).toBe(alpha(color, 0.15))
    expect(soft.label?.color).toBe(color)
  })

  it('shifts with the pressed state, like the cached pass does', () => {
    const recipe = buttonRecipe()
    const color = '#7c3aed'

    const pressed = recipe.tint({ theme: light, color, states: { pressed: true } })

    expect(pressed.root?.backgroundColor).not.toBe(color)
    expect(pressed.root?.backgroundColor).toBeDefined()
  })

  it('is empty for a variant that names no token', () => {
    const recipe = createRecipe({
      slots: ['root'],
      base: () => ({ root: { flex: 1 } }),
      paint: (_t, c) => ({ root: { backgroundColor: c.bg } }),
    })

    expect(recipe.tint({ theme: light, color: '#7c3aed' })).toEqual({})
  })
})

describe('createRecipe — failure behaviour', () => {
  it('names the token when a recipe misspells one', () => {
    const recipe = createRecipe({
      slots: ['root'],
      variantTokens: { primary: { bg: 'accnet' as keyof XAUIColors } },
      paint: (_t, c) => ({ root: { backgroundColor: c.bg } }),
      defaultVariants: { variant: 'primary' },
    })

    expect(() => recipe.resolve({ theme: light })).toThrow(/"accnet"/)
    expect(() => recipe.resolve({ theme: light })).toThrow(/no such colour token/)
  })
})
