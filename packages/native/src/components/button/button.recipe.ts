import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, Size, XAUITheme } from '../../theme/theme.type'
import type { ButtonSlot, ButtonVariant } from './button.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

/**
 * Seven lines of data. A variant **names tokens and computes nothing** — `paint` below is
 * the only place that decides where a colour lands, and it is written once for all seven.
 *
 * The suffix on each token name is also what a raw `color` reads: `resolveTint` maps
 * `…Pressed` to the tint's pressed slice, `…Soft` to its soft one, and a bare
 * `foreground` to the tint itself. That is why a tinted `ghost` paints its label and a
 * tinted `tertiary` its border, with nothing further to declare here.
 */
const VARIANT_TOKENS: Record<ButtonVariant, VariantTokens> = {
  primary: { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
  // The accent's soft slice, not a second neutral: `secondary` is to `primary` what
  // `danger-soft` is to `danger`, and it reads as the same family at lower emphasis.
  secondary: {
    bg: 'accentSoft',
    bgPressed: 'accentSoftPressed',
    fg: 'accentSoftForeground',
  },
  default: { bg: 'default', bgPressed: 'defaultPressed', fg: 'defaultForeground' },
  tertiary: {
    border: 'border',
    bgPressed: 'defaultSoftPressed',
    fg: 'foreground',
  },
  ghost: { bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  danger: { bg: 'danger', bgPressed: 'dangerPressed', fg: 'dangerForeground' },
  'danger-soft': {
    bg: 'dangerSoft',
    bgPressed: 'dangerSoftPressed',
    fg: 'dangerSoftForeground',
  },
}

/**
 * The ring `Button.Spinner` rotates. It is pure style, so the recipe owns it like every
 * other measurement — `borderTopColor` is the gap that makes the rotation visible, and
 * is structural rather than a colour the theme has an opinion about.
 */
function ring(theme: XAUITheme, size: number): SlotStyles<ButtonSlot>['spinner'] {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: theme.borderWidth.default * 2,
    borderTopColor: 'transparent',
  }
}

/**
 * `size` drives height, padding, gap, radius and type — **never width**. A button with no
 * width fills its parent in a column and hugs its content in a row, which is RN's own
 * behaviour and the reason there is no `fullWidth` prop.
 *
 * The height is fixed rather than a minimum: a control has a height, and a label too long
 * for it truncates (`Button.Label` is single-line by default) instead of deforming it.
 *
 * The icon sits one step above the label on the type scale, which is what keeps a 16px
 * label from being paired with a 16px glyph that reads as smaller than it is.
 */
function sizeAxis(step: SizeStep) {
  const { size, padding, gap, glyph, radius } = step

  return (theme: XAUITheme): SlotStyles<ButtonSlot> => ({
    root: {
      height: theme.controlHeights[size],
      paddingHorizontal: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    label: {
      fontSize: theme.fontSizes[size],
      lineHeight: theme.lineHeights[size],
    },
    icon: { fontSize: theme.fontSizes[glyph] },
    spinner: ring(theme, theme.fontSizes[glyph]),
  })
}

type SizeStep = {
  size: Size
  /** Spacing steps, not pixels — `spacing(3.5)` is 14 on the base-4 scale. */
  padding: number
  gap: number
  glyph: FontSizeKey
  radius: RadiusKey
}

export const buttonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      // iOS's squircle. Free on Android, and it is what makes a large radius read as a
      // shape rather than as two arcs meeting a straight edge.
      borderCurve: 'continuous',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once. The border width follows
   * the *presence* of the border role rather than a per-variant flag — `tertiary` is the
   * only variant that names one, and that fact is already in the table above.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
    icon: { color: colors.fg },
    spinner: { borderColor: colors.fg },
  }),

  /**
   * Declaration order is application order: `radius` overrides the radius `size` set, and
   * `isIconOnly` overrides its padding. Both are axes rather than a static sheet merged
   * at the call site, so they stay inside the cache key and a press still allocates
   * nothing.
   */
  variants: {
    size: {
      xs: sizeAxis({ size: 'xs', padding: 3, gap: 1, glyph: 'sm', radius: '3xl' }),
      sm: sizeAxis({
        size: 'sm',
        padding: 3.5,
        gap: 1.5,
        glyph: 'md',
        radius: '3xl',
      }),
      md: sizeAxis({ size: 'md', padding: 4, gap: 2, glyph: 'lg', radius: '3xl' }),
      lg: sizeAxis({ size: 'lg', padding: 5, gap: 2.5, glyph: 'xl', radius: '4xl' }),
    },

    radius: radiusAxis('root'),

    // A square on a fixed height. No width is computed, and none needs to be.
    isIconOnly: {
      true: () => ({ root: { paddingHorizontal: 0, aspectRatio: 1 } }),
    },
  },

  /**
   * The pressed colour lives here rather than in a `PressableFeedback.Highlight`, because
   * a control picks one treatment or the other — both, and a pressed button darkens
   * twice. This one is the variant's own `…Pressed` token, so the press reads as the
   * button's colour going down rather than as a neutral film over it, and a tinted button
   * presses through the same OKLab formula as a token one.
   */
  states: {
    pressed: (_theme, colors) => ({ root: { backgroundColor: colors.bgPressed } }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
