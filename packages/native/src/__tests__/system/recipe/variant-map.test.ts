import { describe, expect, it } from 'vitest'
import type { SlotStyles, StyleFn } from '../../../system/recipe/recipe.type'
import {
  STATE_ORDER,
  activeStateFns,
  collectStyleFns,
  resolveSelection,
  resolveVariantColors,
} from '../../../system/recipe/variant-map'
import { defaultTheme } from '../../../theme/create-theme'
import type { XAUIColors } from '../../../theme/theme.type'

const light = defaultTheme.light

/** A style function that reports its own name, so order is observable. */
const tag =
  (name: string): StyleFn<'root'> =>
  () =>
    ({ root: { testID: name } }) as SlotStyles<'root'>

const namesOf = (fns: Array<StyleFn<'root'>>) =>
  fns.map(fn => (fn(light, {}).root as { testID: string }).testID)

describe('resolveSelection', () => {
  it('puts the caller over the defaults', () => {
    expect(
      resolveSelection({ variant: 'primary', size: 'md' }, { size: 'sm' })
    ).toEqual({
      variant: 'primary',
      size: 'sm',
    })
  })

  it('keeps a default when the caller passes undefined', () => {
    expect(resolveSelection({ size: 'md' }, { size: undefined })).toEqual({
      size: 'md',
    })
  })

  it('works with neither side', () => {
    expect(resolveSelection(undefined, undefined)).toEqual({})
  })
})

describe('resolveVariantColors', () => {
  it('looks each role up in the theme', () => {
    expect(
      resolveVariantColors({ bg: 'accent', fg: 'accentForeground' }, light)
    ).toEqual({
      bg: light.colors.accent,
      fg: light.colors.accentForeground,
    })
  })

  it('is empty when the variant names nothing', () => {
    expect(resolveVariantColors(undefined, light)).toEqual({})
  })

  it('throws naming both the token and the role', () => {
    expect(() =>
      resolveVariantColors({ bg: 'accnet' as keyof XAUIColors }, light)
    ).toThrow(/"accnet" for its "bg" role/)
  })
})

describe('activeStateFns', () => {
  it('returns the active states in STATE_ORDER', () => {
    const fns = activeStateFns(
      {
        disabled: tag('disabled'),
        pressed: tag('pressed'),
        focused: tag('focused'),
      },
      { disabled: true, pressed: true, focused: true }
    )

    expect(namesOf(fns)).toEqual([...STATE_ORDER])
  })

  it('skips a state that is inactive or has no function', () => {
    const fns = activeStateFns({ pressed: tag('pressed') }, { disabled: true })

    expect(fns).toEqual([])
  })
})

describe('collectStyleFns', () => {
  it('follows the frozen order: base, paint, variants, compounds, states', () => {
    const fns = collectStyleFns(
      {
        slots: ['root'],
        base: tag('base'),
        paint: tag('paint'),
        variants: { size: { md: tag('size') }, radius: { lg: tag('radius') } },
        compoundVariants: [{ when: { size: 'md' }, style: tag('compound') }],
        states: { pressed: tag('pressed') },
      },
      { size: 'md', radius: 'lg' },
      { pressed: true }
    )

    expect(namesOf(fns)).toEqual([
      'base',
      'paint',
      'size',
      'radius',
      'compound',
      'pressed',
    ])
  })

  it('applies the axes in declaration order, not alphabetically', () => {
    const fns = collectStyleFns(
      {
        slots: ['root'],
        variants: {
          size: { md: tag('size') },
          appearance: { flat: tag('appearance') },
        },
      },
      { size: 'md', appearance: 'flat' },
      {}
    )

    expect(namesOf(fns)).toEqual(['size', 'appearance'])
  })

  it('skips a compound variant whose axes do not all match', () => {
    const fns = collectStyleFns(
      {
        slots: ['root'],
        variants: { size: { sm: tag('size') } },
        compoundVariants: [
          { when: { size: 'sm', variant: 'ghost' }, style: tag('compound') },
        ],
      },
      { size: 'sm', variant: 'primary' },
      {}
    )

    expect(namesOf(fns)).toEqual(['size'])
  })

  it('skips an axis the selection leaves unset', () => {
    const fns = collectStyleFns(
      {
        slots: ['root'],
        base: tag('base'),
        variants: { size: { md: tag('size') } },
      },
      {},
      {}
    )

    expect(namesOf(fns)).toEqual(['base'])
  })
})
