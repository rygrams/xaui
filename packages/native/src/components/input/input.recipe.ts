import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { InputSize, InputSlot, InputVariant } from './input.type'

const SLOTS = [
  'root',
  'label',
  'field',
  'placeholder',
  'description',
  'error',
] as const

/**
 * Four lines of data, and the first real use of the theme's `field*` family — the tokens
 * P0 derived for exactly this component and nothing else has read since.
 *
 * A variant **names tokens and computes nothing**: `paint` below decides where they land.
 *
 * The first three name the `fieldBorder` edge and `ghost` gives it up. Its **width** is
 * the theme's `borderWidth.field`, which is the same knob HeroUI exposes as
 * `--field-border-width` — and the one number where the two libraries' defaults differ:
 * they ship it at `0`, so their input is a fill with no visible edge, and we ship `1`.
 * `createTheme({ borderWidth: { field: 0 } })` reproduces theirs exactly.
 *
 * What separates `primary` from `secondary` is the fill it takes plus the `field` shadow,
 * applied in a compound below.
 *
 * **Every variant declares `borderFocus`, including `light`.** A state that reads a role
 * must find it on every variant, because the merge is a shallow spread and a
 * `borderColor: colors.borderFocus` on a variant that names none writes `undefined` over
 * the colour `paint` had just set. `light` has no border width to show it, so the
 * declaration is inert there — cheaper than a state function that has to know which
 * variants it is allowed to run for.
 */
const VARIANT_TOKENS: Record<InputVariant, VariantTokens> = {
  primary: {
    bg: 'fieldBackground',
    border: 'fieldBorder',
    borderFocus: 'fieldBorderFocus',
    fg: 'fieldForeground',
  },
  // `bg: 'default'` is the neutral *token*, not this variant's name — the two namespaces
  // meet here and nowhere else. It is also what keeps a field visible on a card, where
  // `fieldBackground` is the card's own colour.
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

/**
 * `size` drives the field's height, its padding, the gaps and the type — **never width**.
 * A field with no width fills its parent in a column, which is RN's own behaviour and the
 * reason there is no `fullWidth` prop here either.
 *
 * The height is a **minimum**, which is the one place this component departs from the
 * fixed-height rule the `Button` and the `Chip` follow. The reason is `multiline`: a
 * `TextInput` holding three lines of the user's own text has to grow, and a control whose
 * content is not the developer's cannot be truncated into shape. HeroUI reaches the same
 * conclusion with `min-height` on their single size.
 *
 * The label and the help text carry a small horizontal inset — half the field's padding —
 * so they read as belonging to the box below them rather than to the column edge. It does
 * not scale: it is an optical alignment, not a measurement.
 */
function sizeAxis(step: SizeStep) {
  const { control, padding, gap, field, label, help } = step

  return (theme: XAUITheme): SlotStyles<InputSlot> => {
    const inset = { paddingHorizontal: theme.spacing(LABEL_INSET) }
    const helpType = {
      fontSize: theme.fontSizes[help],
      lineHeight: theme.lineHeights[help],
    }

    return {
      root: { gap: theme.spacing(gap) },
      label: {
        ...inset,
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
      field: {
        minHeight: theme.controlHeights[control],
        paddingHorizontal: theme.spacing(padding),
        fontSize: theme.fontSizes[field],
      },
      description: { ...inset, ...helpType },
      error: { ...inset, ...helpType },
    }
  }
}

/** Half the `md` field's padding. Optical, so it is one value rather than a scale. */
const LABEL_INSET = 1.5

type SizeStep = {
  /** The control height the field takes as its minimum. */
  control: Size
  /** Spacing steps, not pixels — `spacing(3)` is 12 on the base-4 scale. */
  padding: number
  /** Between the label, the field and the help text. */
  gap: number
  field: FontSizeKey
  label: FontSizeKey
  /** `Description` and `Error` — they are the same line at a different colour. */
  help: FontSizeKey
  /** The label once it is inside the box: one step down, because it shares the room. */
  labelInside: FontSizeKey
}

/**
 * `md` is the anchor, and it is HeroUI's input measured: a 48pt minimum, 12pt of
 * horizontal padding, a 16/24 label above the field and a 14/20 line below it. Their scale
 * has a single step; ours moves around that one, a control height and a step of type at a
 * time.
 */
const SIZES: Record<InputSize, SizeStep> = {
  xs: {
    control: 'xs',
    padding: 2.5,
    gap: 1,
    field: 'sm',
    label: 'sm',
    help: 'xs',
    labelInside: 'xs',
  },
  sm: {
    control: 'sm',
    padding: 3,
    gap: 1,
    field: 'md',
    label: 'sm',
    help: 'xs',
    labelInside: 'xs',
  },
  md: {
    control: 'md',
    padding: 3,
    gap: 1.5,
    field: 'md',
    label: 'md',
    help: 'sm',
    labelInside: 'xs',
  },
  lg: {
    control: 'lg',
    padding: 4,
    gap: 2,
    field: 'lg',
    label: 'lg',
    help: 'md',
    labelInside: 'sm',
  },
}

/**
 * The label lifted into the box. It leaves the column's flow and sits against the box's
 * own padding, so the caller's JSX is the same either way and nothing is reparented (R4)
 * — the price is that the field has to be the first thing left in the flow, which is why
 * `Description` and `Error` belong after it.
 *
 * The field then owes the label its room: `paddingTop` clears the line above it, and the
 * box grows by the same amount so the text keeps the height its `size` promised.
 */
function insideLabel(step: SizeStep) {
  const { control, padding, field, labelInside } = step

  return (theme: XAUITheme): SlotStyles<InputSlot> => {
    const top = theme.spacing(LABEL_INSIDE_TOP)
    // What the label occupies before the text can start.
    const block = top + theme.lineHeights[labelInside]

    return {
      label: {
        position: 'absolute',
        top,
        // `start`, never `left` (R13): RTL mirrors the logical property and only it.
        start: theme.spacing(padding),
        paddingHorizontal: 0,
        fontSize: theme.fontSizes[labelInside],
        lineHeight: theme.lineHeights[labelInside],
      },
      // The height is built from the two lines it now holds rather than added to the
      // control height: `controlHeights` already pays for centring one line, so adding
      // the label's block to it would pay for that room twice. It is floored at the
      // control height all the same, so a theme that raises `controlHeights` does not end
      // up with an inside field shorter than the outside one beside it.
      field: {
        minHeight: Math.max(
          block + theme.lineHeights[field] + top,
          theme.controlHeights[control]
        ),
        paddingTop: block,
        paddingBottom: top,
      },
    }
  }
}

/** How far the inside label sits below the top of the box. */
const LABEL_INSIDE_TOP = 1.5

export const inputRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column' },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    field: {
      fontFamily: theme.fontFamilies.body,
      // `regular`, not `medium`: what the user typed is content, not a control's label,
      // and a heavier weight makes a filled field read as a button.
      fontWeight: theme.fontWeights.regular,
      borderWidth: theme.borderWidth.field,
      // The theme has a radius named for this component, so every size uses it and the
      // `radius` axis is what overrides it — the same shape a `Chip` takes from `full`.
      borderRadius: theme.radius.field,
      borderCurve: 'continuous',
      // RN centres a single line inside `minHeight` on iOS and pins it to the top on
      // Android. Saying it removes a difference nobody chose.
      textAlignVertical: 'center',
    },
    // Not a node — the root flattens this one into `placeholderTextColor`, which is a
    // `TextInput` prop rather than a style.
    placeholder: { color: theme.colors.fieldPlaceholder },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
    error: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.danger,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land. The border width follows the *presence* of the
   * border role, so `ghost` needs no rule of its own to say it has no edge.
   *
   * The label is **not** painted from the variant: it sits outside the box, on the screen
   * behind it, so it takes `foreground` and not the field's own text colour. That is also
   * why a tinted input does not tint its label — the tint is the field's, not the form's.
   */
  paint: (theme, colors) => ({
    field: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
      color: colors.fg,
    },
    label: { color: theme.colors.foreground },
  }),

  /**
   * Declaration order is application order, and it is load-bearing here: `isInvalid`
   * comes after `size` so its border wins, and it must also outrank focus — which is why
   * the root passes `focused` only when the field is *not* invalid, rather than relying
   * on an order that states cannot express.
   */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('field'),

    /**
     * `outside` is the base behaviour, so it adds nothing — it is declared because an
     * axis needs both of its values for the selection to be typed, and because a reader
     * looking for "what does outside do" should find the answer here rather than infer it
     * from an absence. The size-dependent half of `inside` is in `compoundVariants`.
     */
    labelPlacement: {
      outside: () => ({}),
      inside: () => ({}),
    },

    isInvalid: {
      true: theme => ({
        field: { borderColor: theme.colors.danger },
        // The label and the description turn with it: on a long form the field that is
        // wrong has to be findable without reading every message.
        label: { color: theme.colors.danger },
        description: { color: theme.colors.danger },
      }),
    },
  },

  /**
   * The focus treatment is the border darkening towards the mode's ink — the theme's
   * `fieldBorderFocus`, which is `fieldBorder` mixed 26% towards `fieldForeground`. No
   * ring and no accent: a form where every focused field flashes the brand colour is a
   * form where the accent has stopped meaning "the action".
   *
   * `borderFocus` is a role rather than a token named here, so a raw `color` follows the
   * field into focus the same way it follows a `Button` into its pressed state.
   */
  /**
   * What `primary` adds to a filled field, and the four halves of the inside label that
   * need to know the size — a compound is how the engine expresses a rule that depends on
   * two axes at once.
   */
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
    focused: (_theme, colors) => ({ field: { borderColor: colors.borderFocus } }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md', labelPlacement: 'outside' },
})
