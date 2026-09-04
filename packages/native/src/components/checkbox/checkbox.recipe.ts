import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { CheckboxSize, CheckboxSlot, CheckboxVariant } from './checkbox.type'

const SLOTS = ['root', 'indicator', 'fill', 'check', 'dash', 'label'] as const

/**
 * Three lines of data, and they are the `Input`'s `field*` family again — the box at rest
 * is a field the size of a glyph, so it takes the same tokens the field does.
 *
 * **Every variant declares `bgSelected` and `fgSelected`**, and they are the same pair on
 * all three, for the reason the `Input`'s `borderFocus` is the same on all four: a role
 * read outside the variant has to be found on every variant, and this pair is what the
 * box becomes once it is ticked. Their being identical is the statement — the variant
 * describes the box **at rest**; ticked, a checkbox is the accent, or the `color` the
 * caller named.
 */
const VARIANT_TOKENS: Record<CheckboxVariant, VariantTokens> = {
  primary: {
    bg: 'fieldBackground',
    border: 'fieldBorder',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  // `bg: 'default'` is the neutral *token*, not this variant's name — the two namespaces
  // meet here as they do on the `Input`, and for the same reason: on a card,
  // `fieldBackground` is the card's own colour and the box would vanish into it.
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
 * `size` drives the box, the glyph inside it, the gap and the label's type — **never
 * width**. A checkbox hugs its label, and a row that has to fill its parent is a `style`
 * away rather than a `fullWidth` prop.
 *
 * The check is **derived from the box** rather than tabulated: half its width, a quarter
 * its height. Two numbers in a table would drift from the box the day someone changes it,
 * and a check that is not proportional to its box reads as a different glyph at every
 * size.
 */
function sizeAxis(step: SizeStep) {
  const { box, radius, label, gap, stroke } = step

  return (theme: XAUITheme): SlotStyles<CheckboxSlot> => {
    const side = theme.spacing(box)

    return {
      root: { gap: theme.spacing(gap) },
      indicator: { width: side, height: side, borderRadius: theme.radius[radius] },
      check: {
        width: side * CHECK_WIDTH,
        height: side * CHECK_HEIGHT,
        borderStartWidth: stroke,
        borderBottomWidth: stroke,
      },
      // The third state's mark: the check's long stroke, on its own and level.
      dash: {
        width: side * CHECK_WIDTH,
        height: stroke,
        borderRadius: stroke / 2,
      },
      label: {
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
    }
  }
}

/**
 * The long stroke and the short one, as fractions of the box. The two together are an
 * "L" that becomes a check once rotated — see `checkboxSheet`.
 */
const CHECK_WIDTH = 0.5
const CHECK_HEIGHT = 0.25

type SizeStep = {
  /** The box's side, in spacing steps — `spacing(6)` is 24 on the base-4 scale. */
  box: number
  /** The corner at this size. `radius` on the root overrides it. */
  radius: RadiusKey
  /** Between the box and its label. */
  gap: number
  label: FontSizeKey
  /** The check's stroke, in points. Geometry: a glyph is drawn, not spaced. */
  stroke: number
}

/**
 * `md` is the anchor, and it is HeroUI's checkbox measured: a 24pt box with the field's
 * 1pt border and an 8pt corner. Their scale has a single size; ours moves around that one,
 * a spacing step and a step of type at a time.
 *
 * The corner is `md` (9) where theirs is `lg` (8) — the same key would be 12 on our
 * radius base, which on a 24pt box is a circle, and a circle is the `Radio`.
 */
const SIZES: Record<CheckboxSize, SizeStep> = {
  xs: { box: 4, radius: 'sm', gap: 2, label: 'sm', stroke: 1.5 },
  sm: { box: 5, radius: 'sm', gap: 2, label: 'sm', stroke: 2 },
  md: { box: 6, radius: 'md', gap: 2, label: 'md', stroke: 2 },
  lg: { box: 7, radius: 'md', gap: 2.5, label: 'lg', stroke: 2.5 },
}

export const checkboxRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    indicator: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: theme.borderWidth.field,
      borderCurve: 'continuous',
      // The fill is laid inside the box and has to stop at its corners.
      overflow: 'hidden',
    },
    // Laid over the box rather than sized to it: the two corners are the indicator's, and
    // an inset of zero is what keeps the fill inside the border it is clipped by.
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

  /**
   * Where the variant's colours land. The border width follows the *presence* of the
   * border role, exactly as on the `Input`.
   *
   * `bgSelected` and `fgSelected` are painted unconditionally, on two slots the indicator
   * only mounts while it is ticked — which is what keeps selection out of the cache key
   * and inside the tint pass at the same time. An axis would have given up the second.
   */
  paint: (theme, colors) => ({
    indicator: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
    },
    fill: { backgroundColor: colors.bgSelected },
    check: { borderColor: colors.fgSelected },
    dash: { backgroundColor: colors.fgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('indicator'),

    /**
     * Declared after `size` so its border wins. The resting fill is dropped rather than
     * repainted — `undefined` over a colour is what RN reads as "no background" — because
     * a box that is wrong should read as an outline, not as a filled control that happens
     * to be red at the edge. HeroUI reaches the same shape with a compound.
     */
    isInvalid: {
      true: theme => ({
        indicator: { borderColor: theme.colors.danger, backgroundColor: undefined },
        fill: { backgroundColor: theme.colors.danger },
        check: { borderColor: theme.colors.dangerForeground },
        dash: { backgroundColor: theme.colors.dangerForeground },
        // The label turns with it: on a long form the field that is wrong has to be
        // findable without reading every message.
        label: { color: theme.colors.danger },
      }),
    },
  },

  /** What `primary` adds to a filled box — the `Input`'s compound, on a smaller field. */
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
