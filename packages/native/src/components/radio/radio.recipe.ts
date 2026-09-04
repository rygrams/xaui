import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { RadioSize, RadioSlot, RadioVariant } from './radio.type'

const SLOTS = ['root', 'indicator', 'fill', 'thumb', 'label'] as const

/**
 * The `Checkbox`'s three rows, unchanged — the circle at rest is the same field the square
 * is, and an option that looked different from a checkbox in the same form would be a
 * second design language rather than a second control.
 *
 * `bgSelected` and `fgSelected` are declared on all three for the reason they are there: a
 * role read outside the variant has to be found on every variant, and this pair is what
 * the circle becomes once it is the chosen one.
 */
const VARIANT_TOKENS: Record<RadioVariant, VariantTokens> = {
  primary: {
    bg: 'fieldBackground',
    border: 'fieldBorder',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  secondary: {
    bg: 'default',
    border: 'fieldBorder',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  tertiary: {
    border: 'fieldBorder',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
}

/**
 * `size` drives the circle, the dot inside it, the gap and the label's type — **never
 * width**, exactly as on the `Checkbox`, and the two ladders are the same four boxes so
 * that a radio and a checkbox in one form line up.
 *
 * The dot is **derived from the circle** rather than tabulated: HeroUI's is 10 in a 24,
 * and keeping the ratio is what makes it one dot at four sizes instead of four drawings.
 */
function sizeAxis(step: SizeStep) {
  const { box, label, gap } = step

  return (theme: XAUITheme): SlotStyles<RadioSlot> => {
    const side = theme.spacing(box)
    const dot = Math.round(side * THUMB_RATIO)

    return {
      root: { gap: theme.spacing(gap) },
      indicator: { width: side, height: side },
      thumb: { width: dot, height: dot, borderRadius: dot / 2 },
      label: {
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
    }
  }
}

/** HeroUI's 10pt dot in their 24pt circle, kept as a ratio so every size gets one. */
const THUMB_RATIO = 10 / 24

type SizeStep = {
  /** The circle's diameter, in spacing steps — `spacing(6)` is 24 on the base-4 scale. */
  box: number
  /** Between the circle and its label. */
  gap: number
  label: FontSizeKey
}

/** `md` is HeroUI's radio measured: a 24pt circle with the field's 1pt border. */
const SIZES: Record<RadioSize, SizeStep> = {
  xs: { box: 4, gap: 2, label: 'sm' },
  sm: { box: 5, gap: 2, label: 'sm' },
  md: { box: 6, gap: 2, label: 'md' },
  lg: { box: 7, gap: 2.5, label: 'lg' },
}

export const radioRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    indicator: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: theme.borderWidth.field,
      // The one shape decision this component makes, and the whole difference between it
      // and the `Checkbox`: a radio is round, at every size. `radius` still overrides it.
      borderRadius: theme.radius.full,
      overflow: 'hidden',
    },
    fill: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.foreground,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /** The `Checkbox`'s paint, with a dot where the check was. */
  paint: (theme, colors) => ({
    indicator: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
    },
    fill: { backgroundColor: colors.bgSelected },
    thumb: { backgroundColor: colors.fgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('indicator'),

    /** Declared after `size` so its border wins. The `Checkbox`'s rule, to the letter. */
    isInvalid: {
      true: theme => ({
        indicator: { borderColor: theme.colors.danger, backgroundColor: undefined },
        fill: { backgroundColor: theme.colors.danger },
        thumb: { backgroundColor: theme.colors.dangerForeground },
        label: { color: theme.colors.danger },
      }),
    },
  },

  compoundVariants: [
    {
      when: { variant: 'primary' },
      style: theme => ({ indicator: theme.shadows.field }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})
