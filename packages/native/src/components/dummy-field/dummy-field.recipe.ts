import { createRecipe, radiusAxis } from '../../system/recipe'
import { decoratorBox } from '../../utils/decorator-box'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type {
  DummyFieldSize,
  DummyFieldSlot,
  DummyFieldVariant,
} from './dummy-field.type'

const SLOTS = [
  'root',
  'label',
  'field',
  'value',
  'placeholder',
  'indicator',
  'description',
  'error',
  'prefix',
  'suffix',
  'icon',
] as const

/**
 * The same four rows as the `TextField`, token for token. A dummy field sits in a form next
 * to a text field, and the two reading as one control is the whole point of the `field*`
 * family existing — a second table here would be two tables to keep in step.
 */
const VARIANT_TOKENS: Record<DummyFieldVariant, VariantTokens> = {
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

/** Half the `md` field's padding. Optical, so it is one value rather than a scale. */
const LABEL_INSET = 1.5

/** How far the inside label sits below the top of the box. */
const LABEL_INSIDE_TOP = 1.5

type SizeStep = {
  /** The control height the field takes. Fixed, not a minimum. */
  control: Size
  /** Spacing steps, not pixels — `spacing(3)` is 12 on the base-4 scale. */
  padding: number
  /** Between the label, the field and the help text. */
  gap: number
  /** The field's own gap, between the value and the indicator. */
  indicatorGap: number
  field: FontSizeKey
  label: FontSizeKey
  /** `Description` and `Error` — they are the same line at a different colour. */
  help: FontSizeKey
  /** What `DummyField.Indicator` takes when the caller names no size. */
  glyph: FontSizeKey
  /** The label once it is inside the box: one step down, because it shares the room. */
  labelInside: FontSizeKey
}

const SIZES: Record<DummyFieldSize, SizeStep> = {
  xs: {
    control: 'xs',
    padding: 2.5,
    gap: 0.75,
    indicatorGap: 2,
    field: 'sm',
    label: 'sm',
    help: 'xs',
    glyph: 'md',
    labelInside: 'xs',
  },
  sm: {
    control: 'sm',
    padding: 3,
    gap: 0.75,
    indicatorGap: 2.5,
    field: 'md',
    label: 'sm',
    help: 'xs',
    glyph: 'lg',
    labelInside: 'xs',
  },
  md: {
    control: 'md',
    padding: 3,
    gap: 1.25,
    indicatorGap: 3,
    field: 'md',
    label: 'md',
    help: 'sm',
    glyph: 'lg',
    labelInside: 'xs',
  },
  lg: {
    control: 'lg',
    padding: 4,
    gap: 1.75,
    indicatorGap: 3,
    field: 'lg',
    label: 'lg',
    help: 'md',
    glyph: 'xl',
    labelInside: 'sm',
  },
}

function sizeAxis(step: SizeStep) {
  const { control, padding, gap, indicatorGap, field, label, help, glyph } = step

  return (theme: XAUITheme): SlotStyles<DummyFieldSlot> => {
    const inset = { paddingHorizontal: theme.spacing(LABEL_INSET) }
    const helpType = {
      fontSize: theme.fontSizes[help],
      lineHeight: theme.lineHeights[help],
    }
    const valueType = {
      fontSize: theme.fontSizes[field],
      lineHeight: theme.lineHeights[field],
    }
    // The `FieldGroup` decorators, inset by the field's own padding — the same rule the
    // `TextField`'s recipe applies, because a group over a dummy field has to clear its
    // decorators by exactly the same width.
    const decorator = {
      paddingHorizontal: theme.spacing(padding),
      gap: theme.spacing(padding),
    }

    return {
      root: { gap: theme.spacing(gap) },
      label: {
        ...inset,
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
      field: {
        height: theme.controlHeights[control],
        paddingHorizontal: theme.spacing(padding),
        gap: theme.spacing(indicatorGap),
      },
      value: valueType,
      placeholder: valueType,
      indicator: { fontSize: theme.fontSizes[glyph] },
      description: { ...inset, ...helpType },
      error: { ...inset, ...helpType },
      prefix: decorator,
      suffix: decorator,
      icon: { fontSize: theme.fontSizes[glyph] },
    }
  }
}

function insideLabel(step: SizeStep) {
  const { control, padding, field, labelInside } = step

  return (theme: XAUITheme): SlotStyles<DummyFieldSlot> => {
    const top = theme.spacing(LABEL_INSIDE_TOP)
    const block = top + theme.lineHeights[labelInside]

    return {
      label: {
        position: 'absolute',
        top,
        start: theme.spacing(padding),
        paddingHorizontal: 0,
        fontSize: theme.fontSizes[labelInside],
        lineHeight: theme.lineHeights[labelInside],
      },
      field: {
        height: Math.max(
          block + theme.lineHeights[field] + top,
          theme.controlHeights[control]
        ),
        paddingTop: block,
        paddingBottom: top,
      },
    }
  }
}

export const dummyFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column' },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: theme.borderWidth.field,
      borderRadius: theme.radius.field,
      borderCurve: 'continuous',
    },
    value: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
      flexShrink: 1,
    },
    placeholder: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
      color: theme.colors.fieldPlaceholder,
      flexShrink: 1,
    },
    indicator: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
    error: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.danger,
    },
    prefix: { ...decoratorBox(theme), start: 0 },
    suffix: { ...decoratorBox(theme), end: 0 },
    icon: { color: theme.colors.fieldPlaceholder },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    field: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
    },
    value: { color: colors.fg },
    label: { color: theme.colors.foreground },
    indicator: { color: theme.colors.fieldPlaceholder },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('field'),

    labelPlacement: {
      outside: () => ({}),
      inside: () => ({}),
    },

    isInvalid: {
      true: theme => ({
        field: { borderColor: theme.colors.danger },
        label: { color: theme.colors.danger },
        description: { color: theme.colors.danger },
      }),
    },
  },

  compoundVariants: [
    {
      when: { variant: 'primary' },
      style: theme => ({ field: theme.shadows.field }),
    },
    { when: { size: 'xs', labelPlacement: 'inside' }, style: insideLabel(SIZES.xs) },
    { when: { size: 'sm', labelPlacement: 'inside' }, style: insideLabel(SIZES.sm) },
    { when: { size: 'md', labelPlacement: 'inside' }, style: insideLabel(SIZES.md) },
    { when: { size: 'lg', labelPlacement: 'inside' }, style: insideLabel(SIZES.lg) },
  ],

  states: {
    pressed: theme => ({
      field: { backgroundColor: theme.colors.fieldPressed },
    }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md', labelPlacement: 'outside' },
})
