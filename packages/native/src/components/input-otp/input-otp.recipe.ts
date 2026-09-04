import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { InputOTPSize, InputOTPSlot, InputOTPVariant } from './input-otp.type'

const SLOTS = [
  'root',
  'group',
  'box',
  'value',
  'placeholder',
  'caret',
  'separator',
] as const

/**
 * Three of the `Input`'s four levels, token for token — a box of a one-time code is a
 * field one character wide, so it reads the same `field*` family and there is nothing
 * here the `Input` did not already decide.
 *
 * `borderFocus` is the **active** ring rather than a focus one: only the box the next
 * character lands in takes it, and the root resolves that box's styles separately (see
 * `boxActiveStyle`). All three declare it, because a state that reads a role must find it
 * on every variant — a shallow spread would otherwise write `undefined` over the colour
 * `paint` had just set.
 */
const VARIANT_TOKENS: Record<InputOTPVariant, VariantTokens> = {
  primary: {
    bg: 'fieldBackground',
    border: 'fieldBorder',
    borderFocus: 'accent',
    fg: 'fieldForeground',
  },
  secondary: {
    bg: 'default',
    border: 'fieldBorder',
    borderFocus: 'accent',
    fg: 'fieldForeground',
  },
  tertiary: {
    border: 'fieldBorder',
    borderFocus: 'accent',
    fg: 'fieldForeground',
  },
}

/** How far behind its own colour a placeholder character sits. HeroUI's 50%, exactly. */
const PLACEHOLDER_OPACITY = 0.5

/**
 * The ring the active box takes. Two points rather than one, because a box that gains a
 * colour without gaining weight reads as a rendering artefact next to five that did not.
 * The box has a fixed width and height and centres what it holds, so the extra point
 * eats into the padding rather than moving anything.
 */
const ACTIVE_BORDER_WIDTH = 2

/**
 * `size` drives the box, the type inside it and the gaps — there is no width to set
 * separately, because a box is a square-ish thing whose width follows its height.
 *
 * `md` is HeroUI's OTP measured: a 48pt box 44pt wide, an 18/28 semibold character, 8pt
 * between boxes. The width is the control height less one spacing step, which reproduces
 * their 48 × 44 and keeps the proportion at the other three sizes.
 */
function sizeAxis(step: SizeStep) {
  const { control, gap, glyph } = step

  return (theme: XAUITheme): SlotStyles<InputOTPSlot> => {
    const height = theme.controlHeights[control]
    const type = {
      fontSize: theme.fontSizes[glyph],
      lineHeight: theme.lineHeights[glyph],
    }

    return {
      root: { gap: theme.spacing(gap) },
      group: { gap: theme.spacing(gap) },
      box: { height, width: height - theme.spacing(1) },
      value: type,
      placeholder: type,
      // As tall as the character it stands in for, so the box does not change shape
      // between an empty state and a typed one.
      caret: { height: theme.lineHeights[glyph], width: theme.spacing(CARET_WIDTH) },
      separator: {
        height: theme.spacing(CARET_WIDTH),
        width: theme.spacing(SEPARATOR_WIDTH),
      },
    }
  }
}

/** HeroUI's caret and separator thickness — a half step, at every size. */
const CARET_WIDTH = 0.5
const SEPARATOR_WIDTH = 2

type SizeStep = {
  /** The box's height. Its width is this less one spacing step. */
  control: Size
  /** Between the boxes, and between a group and a separator. */
  gap: number
  /** The character in the box. A code is read at a glance, so it runs large. */
  glyph: FontSizeKey
}

const SIZES: Record<InputOTPSize, SizeStep> = {
  sm: { control: 'sm', gap: 2, glyph: 'md' },
  md: { control: 'md', gap: 2, glyph: 'lg' },
  lg: { control: 'lg', gap: 2.5, glyph: 'xl' },
}

export const inputOTPRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center' },
    group: { flexDirection: 'row', alignItems: 'center' },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      // `lg` and not `field`, which is the radius the rest of this family uses. A field is
      // wide, so 21 on a 48-tall one reads as a rounded rectangle; a code box is very
      // nearly square — 44 by 48 at `md`, 36 by 40 at `sm` — where the geometric maximum
      // is 22, so the same 21 is a pill in all but name and is clamped to one outright at
      // the small end. Twelve is where HeroUI lands for the same box from the other
      // direction: their `field` radius is their `xl`, and their scale's base is 8 where
      // ours is 12.
      borderRadius: theme.radius.lg,
      borderCurve: 'continuous',
      // The one root in the library that clips: the box has no shadow to lose and a
      // character wider than it would otherwise spill onto its neighbour.
      overflow: 'hidden',
    },
    // `semibold`, where a field's own text is `regular`. A code is read at a glance and
    // then compared character by character, which is the one thing weight helps with.
    value: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
    },
    placeholder: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.fieldPlaceholder,
      opacity: PLACEHOLDER_OPACITY,
    },
    caret: {
      position: 'absolute',
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.fieldPlaceholder,
    },
    // The theme's second separator level rather than the first at half opacity: it is
    // already the lighter of the two, and it composites the same way in both modes.
    separator: {
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.separatorSecondary,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land. The border width follows the *presence* of the
   * border role, so a variant that names none needs no rule of its own to say so.
   *
   * The active box takes the ring whichever variant it is: the `focused` state sets the
   * width as well as the colour. The box has a fixed width and height and centres what it
   * holds, so an edge appearing moves nothing.
   */
  paint: (theme, colors) => ({
    box: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.field : 0,
    },
    value: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('box'),

    /**
     * Declared after `size` and before the states, so a code that is wrong stays wrong
     * under the finger: the ring below reads `borderFocus`, and the root hands it the
     * danger colour by suppressing the active state and painting every box instead.
     */
    isInvalid: {
      true: theme => ({
        box: {
          borderColor: theme.colors.danger,
          borderWidth: ACTIVE_BORDER_WIDTH,
        },
      }),
    },
  },

  compoundVariants: [
    {
      when: { variant: 'primary' },
      style: theme => ({ box: theme.shadows.field }),
    },
  ],

  /**
   * `focused` here means **this box is the active one**, not that the component has the
   * keyboard: the root resolves the recipe twice, once each way, and hands both to the
   * boxes so none of them resolves anything itself (R5).
   */
  states: {
    focused: (_theme, colors) => ({
      box: { borderColor: colors.borderFocus, borderWidth: ACTIVE_BORDER_WIDTH },
    }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})
