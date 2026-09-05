import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { SelectSize, SelectSlot, SelectVariant } from './select.type'

const SLOTS = [
  'trigger',
  'value',
  'placeholder',
  'indicator',
  'overlay',
  'content',
  'label',
  'item',
  'itemLabel',
  'itemDescription',
  'itemIndicator',
] as const

/**
 * The same four rows as the `TextField`, token for token. A select sits in a form next to
 * a text field, and the two reading as one control is the whole point of the `field*`
 * family existing — a second table here would be two tables to keep in step.
 */
const VARIANT_TOKENS: Record<SelectVariant, VariantTokens> = {
  primary: {
    bg: 'fieldBackground',
    border: 'fieldBorder',
    borderFocus: 'fieldBorderFocus',
    fg: 'fieldForeground',
  },
  secondary: {
    bg: 'default',
    border: 'fieldBorder',
    borderFocus: 'fieldBorderFocus',
    fg: 'fieldForeground',
  },
  tertiary: {
    border: 'fieldBorder',
    borderFocus: 'fieldBorderFocus',
    fg: 'fieldForeground',
  },
  ghost: { borderFocus: 'fieldBorderFocus', fg: 'fieldForeground' },
}

type SizeStep = {
  control: Size
  /** Spacing steps, not pixels — the `TextField`'s, so the two line up in a form. */
  padding: number
  /** The trigger's own gap, between the value and the chevron. */
  gap: number
  value: FontSizeKey
  glyph: FontSizeKey
  /** The list's type, one step below the trigger's: a label, not a heading. */
  listLabel: FontSizeKey
  description: FontSizeKey
}

const SIZES: Record<SelectSize, SizeStep> = {
  sm: {
    control: 'sm',
    padding: 3,
    gap: 2.5,
    value: 'md',
    glyph: 'lg',
    listLabel: 'xs',
    description: 'xs',
  },
  md: {
    control: 'md',
    padding: 3,
    gap: 3,
    value: 'md',
    glyph: 'lg',
    listLabel: 'sm',
    description: 'sm',
  },
  lg: {
    control: 'lg',
    padding: 4,
    gap: 3,
    value: 'lg',
    glyph: 'xl',
    listLabel: 'md',
    description: 'md',
  },
}

/**
 * The list's own measurements do **not** scale with `size`. A `lg` trigger opening a list
 * of `lg` rows is a menu that fills the screen, and HeroUI takes the same position: their
 * item padding is one value whatever the trigger is. `size` is the control's scale, and
 * the list is not the control.
 */
const LIST = {
  /** Panel padding, and the inset the rows sit in. */
  padding: 3,
  itemPaddingHorizontal: 2,
  itemPaddingVertical: 3,
  itemGap: 2,
  labelPaddingHorizontal: 2,
  labelPaddingVertical: 1.5,
  /** The check's box, in spacing steps like the rest — five of them, HeroUI's twenty. */
  indicator: 5,
} as const

function sizeAxis(step: SizeStep) {
  const { control, padding, gap, value, glyph, listLabel, description } = step

  return (theme: XAUITheme): SlotStyles<SelectSlot> => {
    const valueType = {
      fontSize: theme.fontSizes[value],
      lineHeight: theme.lineHeights[value],
    }

    return {
      trigger: {
        // Fixed, not a minimum: a control has a height, and a label too long for it
        // truncates rather than deforming the field it shares a row with.
        height: theme.controlHeights[control],
        paddingHorizontal: theme.spacing(padding),
        gap: theme.spacing(gap),
      },
      value: valueType,
      placeholder: valueType,
      indicator: { fontSize: theme.fontSizes[glyph] },
      label: {
        fontSize: theme.fontSizes[listLabel],
        lineHeight: theme.lineHeights[listLabel],
      },
      itemLabel: valueType,
      itemDescription: {
        fontSize: theme.fontSizes[description],
        lineHeight: theme.lineHeights[description],
      },
    }
  }
}

export const selectRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: theme.borderWidth.field,
      borderRadius: theme.radius.field,
      borderCurve: 'continuous',
    },
    value: {
      fontFamily: theme.fontFamilies.body,
      // `regular`, as on the field: a chosen value is content, not the control's label.
      fontWeight: theme.fontWeights.regular,
      // Without it a long value pushes the chevron off the end of the trigger instead of
      // truncating, because a row gives a text node its intrinsic width by default.
      flexShrink: 1,
    },
    placeholder: { color: theme.colors.fieldPlaceholder },
    indicator: { alignItems: 'center', justifyContent: 'center' },
    overlay: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
    content: {
      position: 'absolute',
      backgroundColor: theme.colors.overlay,
      padding: theme.spacing(LIST.padding),
      // The panel is not the field, so it is rounder — but not by three steps of our
      // scale. HeroUI's panel is their `--radius-3xl` on a base of 8, which is 24 points;
      // ours is a base of 12, so the same 24 is `2xl`. Reading their key rather than
      // their number is what put a 36-point corner on it and made it read as a pill.
      borderRadius: theme.radius['2xl'],
      borderCurve: 'continuous',
      ...theme.shadows.overlay,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
      paddingHorizontal: theme.spacing(LIST.labelPaddingHorizontal),
      paddingVertical: theme.spacing(LIST.labelPaddingVertical),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(LIST.itemGap),
      paddingHorizontal: theme.spacing(LIST.itemPaddingHorizontal),
      paddingVertical: theme.spacing(LIST.itemPaddingVertical),
      borderRadius: theme.radius.md,
      borderCurve: 'continuous',
    },
    itemLabel: {
      fontFamily: theme.fontFamilies.body,
      // `medium`, unlike the trigger's value: a row in a list is a target being offered,
      // and the weight is what separates it from the description under it.
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.overlayForeground,
      flexShrink: 1,
    },
    itemDescription: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
    itemIndicator: {
      width: theme.spacing(LIST.indicator),
      height: theme.spacing(LIST.indicator),
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The variant paints the **trigger only**. The list is a floating surface of the
   * theme's own — a `ghost` select does not open a ghost panel, it opens the same panel
   * every other select opens, because the panel is not part of the control's emphasis.
   */
  paint: (theme, colors) => ({
    trigger: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
    },
    value: { color: colors.fg },
    indicator: { color: theme.colors.fieldPlaceholder },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('trigger'),

    /**
     * Open is not `focused`: the field's focus border is what a keyboard gives a text
     * input, and a select that is open has no caret in it. It borrows the same token
     * because the two mean the same thing to the eye — this control is the live one.
     */
    isOpen: {
      true: theme => ({
        trigger: { borderColor: theme.colors.fieldBorderFocus },
      }),
    },

    isInvalid: {
      true: theme => ({ trigger: { borderColor: theme.colors.danger } }),
    },
  },

  states: {
    pressed: theme => ({
      trigger: { backgroundColor: theme.colors.fieldPressed },
      item: { backgroundColor: theme.colors.defaultSoftPressed },
    }),
    disabled: theme => ({ trigger: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
