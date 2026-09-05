import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { BadgeSize, BadgeSlot, BadgeVariant } from './badge.type'

const SLOTS = ['root', 'label'] as const

/**
 * Eleven lines of data, and the `Chip`'s eleven — a badge is what a chip is when it is too
 * small to hold a word, so a name means the same thing in both.
 *
 * No `…Pressed` roles: a badge is not a control. One on a pressable row is a child of that
 * row's `PressableFeedback`, which paints the press on the row rather than on the count.
 */
const VARIANT_TOKENS: Record<BadgeVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  default: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
  success: { bg: 'success', fg: 'successForeground' },
  'success-soft': { bg: 'successSoft', fg: 'successSoftForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  'warning-soft': { bg: 'warningSoft', fg: 'warningSoftForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
  'danger-soft': { bg: 'dangerSoft', fg: 'dangerSoftForeground' },
}

/**
 * `size` drives the height and the type — **never the width**, which follows the count. A
 * `minWidth` equal to the height is what makes a one-digit badge a circle and a two-digit
 * one a capsule, instead of a tall thin box around a `9`.
 *
 * The four steps sit below the `Chip`'s: 16, 18, 20 and 24 against its 20, 24, 28 and 36. A
 * badge is not a small chip, it is a mark — the label stays at 12pt through three of the
 * four sizes, because a count that grows with the badge stops being a count.
 *
 * The dot's diameter is its own ladder rather than the height, since a dot has no label to
 * contain and a 20pt circle beside a 16pt icon is not a dot.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<BadgeSlot> => {
    const height = theme.spacing(step.height)

    return {
      root: {
        height,
        minWidth: height,
        paddingHorizontal: theme.spacing(step.padding),
      },
      label: { fontSize: theme.fontSizes[step.label] },
    }
  }
}

/** The bare circle: no label to pad, so height and width are the diameter and that is all. */
function dotAxis(diameter: number) {
  return (theme: XAUITheme): SlotStyles<BadgeSlot> => {
    const size = theme.spacing(diameter)
    return {
      root: { height: size, width: size, minWidth: size, paddingHorizontal: 0 },
    }
  }
}

/**
 * Named here rather than written twice: `defaultVariants` reads it, and so does the root,
 * which has to know the resolved size to select the `dot` axis and to compute the
 * placement offset. A literal in both places is a default free to drift from itself.
 */
export const BADGE_DEFAULT_SIZE: BadgeSize = 'md'

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(5)` is 20 on the base-4 scale. */
  height: number
  padding: number
  label: FontSizeKey
  /** Diameter of the `isDot` form, in spacing steps. Its own ladder, not the height. */
  dot: number
}

const SIZES: Record<BadgeSize, SizeStep> = {
  xs: { height: 4, padding: 1.25, label: 'xs', dot: 1.5 },
  sm: { height: 4.5, padding: 1.5, label: 'xs', dot: 2 },
  md: { height: 5, padding: 1.5, label: 'xs', dot: 2.5 },
  lg: { height: 6, padding: 2, label: 'sm', dot: 3 },
}

/**
 * Half the badge's height, which is what `placement` pulls it out by on each axis so its
 * centre lands on the corner it marks. The root does the arithmetic on the flattened
 * height, the way the `Switch` computes its travel — an inset written into the cached
 * styles would shift a badge that is in flow, where `position` is `relative` and an inset
 * is a nudge rather than a placement.
 */
export function badgeOffset(
  theme: XAUITheme,
  size: BadgeSize,
  isDot: boolean
): number {
  const step = SIZES[size]
  return theme.spacing(isDot ? step.dot : step.height) / 2
}

export const badgeRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      // The capsule at every size, which is what makes a two-digit count read as one
      // object. `radius` is still there for the square marker.
      borderRadius: theme.radius.full,
      // Squircle corners for when `radius` overrides the pill. Free on Android.
      borderCurve: 'continuous',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      // Android reserves leading above and below the glyphs, which in a 16pt box is the
      // difference between a centred digit and one sitting low.
      includeFontPadding: false,
      // No `lineHeight`: the scale's leading is taller than the box at every size here,
      // and the root centres the label anyway.
      textAlign: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once. The border width follows
   * the *presence* of the border role, so `ghost` needs no rule of its own.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
  }),

  /** Declaration order is application order: `dot` overrides the box `size` set, and
   *  `radius` overrides the capsule from `base`. */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /**
     * The same four keys as `size`, and the root selects it with the resolved size when
     * `isDot` is set and with nothing when it is not — an axis left unselected contributes
     * nothing, which is exactly "this badge has a label". A `{ true, false }` axis would
     * have needed a `false` branch with nothing to say, and a `size × isDot` compound
     * would have been sixteen entries for four measurements.
     */
    dot: {
      xs: dotAxis(SIZES.xs.dot),
      sm: dotAxis(SIZES.sm.dot),
      md: dotAxis(SIZES.md.dot),
      lg: dotAxis(SIZES.lg.dot),
    },

    radius: radiusAxis<BadgeSlot>('root'),
  },

  /**
   * `danger`, where every other component in the library defaults to the first name in its
   * ladder. A badge is overwhelmingly the count of something that wants attention — unread,
   * failed, overdue — and a red one is what `<Badge>3</Badge>` means. The accent count is a
   * `variant` away.
   */
  defaultVariants: { variant: 'danger', size: BADGE_DEFAULT_SIZE },
})
