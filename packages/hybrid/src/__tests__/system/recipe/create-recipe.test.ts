import { describe, expect, it } from 'vitest'
import { createRecipe } from '../../../system/recipe/create-recipe'
import { defaultTheme } from '../../../theme'

describe('createRecipe', () => {
  it('preserves the Native resolution order and keeps tint uncached', () => {
    const recipe = createRecipe({
      slots: ['root'] as const,
      variantTokens: { primary: { bg: 'accent' } },
      base: () => ({ root: { opacity: 0.25 } }),
      paint: (_theme, colors) => ({ root: { backgroundColor: colors.bg } }),
      variants: {
        size: { md: () => ({ root: { opacity: 0.5 } }) },
      },
      states: {
        disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
      },
      defaultVariants: { variant: 'primary', size: 'md' },
    })

    expect(
      recipe.resolve({ theme: defaultTheme.light, states: { disabled: true } }).root
    ).toEqual({
      backgroundColor: defaultTheme.light.colors.accent,
      opacity: defaultTheme.light.opacity.disabled,
    })
    expect(
      recipe.tint({ theme: defaultTheme.light, color: '#7c3aed' }).root
    ).toEqual({ backgroundColor: '#7c3aed' })
  })
})
