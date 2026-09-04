// The module and not the barrel: a recipe is style data, and the barrel would pull
// `CloseButton` — and therefore Reanimated — into anything that only wants the geometry.
import { closeButtonBase } from '../../system/close-button/close-button.recipe'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { ChipSize, ChipSlot, ChipVariant } from './chip.type'

const SLOTS = [
  'root',
  'label',
  'icon',
  'dot',
  'avatar',
  'close',
  'closeGlyph',
] as const

/**
 * Eleven lines of data. A variant **names tokens and computes nothing** — `paint` below
 * is the only place that decides where a colour lands, and it is written once for all
 * eleven.
 *
 * The first five are the `Button`'s ladder, token for token. The six that follow are the
 * three status families the `Button` deliberately refused, each in its full and soft
 * slice — a chip is what reports an outcome, so this is where those tokens finally get
 * read.
 *
 * The suffix on each token name is also what a raw `color` reads: `resolveTint` maps
 * `…Pressed` to the tint's pressed slice, `…Soft` to its soft one, and a bare
 * `foreground` to the tint itself. That is why a tinted `ghost` paints its label and a
 * tinted `tertiary` its border, with nothing further to declare here.
 */
const VARIANT_TOKENS: Record<ChipVariant, VariantTokens> = {
  primary: { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
  secondary: {
    bg: 'accentSoft',
    bgPressed: 'accentSoftPressed',
    fg: 'accentSoftForeground',
  },
  default: { bg: 'default', bgPressed: 'defaultPressed', fg: 'defaultForeground' },
  tertiary: { border: 'border', bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  ghost: { bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  success: { bg: 'success', bgPressed: 'successPressed', fg: 'successForeground' },
  'success-soft': {
    bg: 'successSoft',
    bgPressed: 'successSoftPressed',
    fg: 'successSoftForeground',
  },
  warning: { bg: 'warning', bgPressed: 'warningPressed', fg: 'warningForeground' },
  'warning-soft': {
    bg: 'warningSoft',
    bgPressed: 'warningSoftPressed',
    fg: 'warningSoftForeground',
  },
  danger: { bg: 'danger', bgPressed: 'dangerPressed', fg: 'dangerForeground' },
  'danger-soft': {
    bg: 'dangerSoft',
    bgPressed: 'dangerSoftPressed',
    fg: 'dangerSoftForeground',
  },
}

/**
 * `size` drives height, horizontal padding, gap and type — **never width**. A chip hugs
 * its label, which is what `alignSelf: 'flex-start'` in `base` says, and there is no
 * `fullWidth` here any more than on a `Button`.
 *
 * The height is fixed where HeroUI uses vertical padding. Same numbers — theirs resolve
 * to 20, 28 and 36 — and a different reason to arrive at them: with padding, a chip
 * carrying an avatar is taller than the chip next to it carrying only text, and a row of
 * filters stops lining up. A height decided by the size holds the row together and lets
 * an avatar or a cross sit inside it rather than push it around.
 *
 * The glyph sits one step above the label on the type scale, exactly as on the `Button`:
 * a 14px label paired with a 14px icon reads as an icon smaller than its text.
 */
function sizeAxis(step: SizeStep) {
  const { height, padding, gap, label, glyph, dot, avatar, cross } = step

  return (theme: XAUITheme): SlotStyles<ChipSlot> => {
    const diameter = theme.spacing(avatar)
    const box = theme.fontSizes[glyph]
    const inset = theme.spacing(padding)
    // What the height leaves above and below the avatar. The capsule's rounded end is a
    // circle of radius `height / 2` and the avatar is a circle of radius `diameter / 2`,
    // so the two are concentric only when the gap is the same on every side.
    const cap = (theme.spacing(height) - diameter) / 2

    return {
      root: {
        height: theme.spacing(height),
        paddingHorizontal: inset,
        gap: theme.spacing(gap),
      },
      label: {
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
      icon: { fontSize: box },
      dot: circle(theme.spacing(dot)),
      avatar: {
        ...circle(diameter),
        // **The one margin on a slot in this component**, and R4 is about spacing between
        // slots — this is not that. The root's horizontal padding is set for text, several
        // times the gap the height leaves above the avatar, so a face sits visibly pushed
        // into the chip while a label beside it looks right. Cancelling the difference
        // seats it in the capsule's rounded end instead. Clamped at zero, because a theme
        // with tighter padding than that gap needs no pull at all.
        //
        // R13 — `marginStart`, so it is the leading edge in RTL too. `Chip.Avatar` is a
        // leading slot by contract, which is what makes a leading-only correction sound.
        marginStart: -Math.max(0, inset - cap),
      },
      // The touch target is the glyph's box; `hitSlop` on the slot is what makes it
      // reachable, because a cross big enough to hit is a cross too big to look right.
      close: { width: box, height: box },
      closeGlyph: { width: theme.spacing(cross) },
    }
  }
}

function circle(diameter: number) {
  return { width: diameter, height: diameter, borderRadius: diameter / 2 }
}

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(7)` is 28 on the base-4 scale. */
  height: number
  padding: number
  gap: number
  label: FontSizeKey
  /** One step above the label — the icon's box, and the close slot's. */
  glyph: FontSizeKey
  /** Diameter of `Chip.Dot`, in spacing steps. */
  dot: number
  /** Diameter of `Chip.Avatar`, in spacing steps. Always inside the height. */
  avatar: number
  /** Length of one bar of the built-in cross, in spacing steps. */
  cross: number
}

/**
 * `md` is the anchor, and it is HeroUI's chip measured: 12pt of horizontal padding, a
 * 14/20 label, 28pt tall. Their scale has three steps and ours has four, so `xs` and `lg`
 * are theirs and `sm` is the step our ladder adds between the first two.
 */
const SIZES: Record<ChipSize, SizeStep> = {
  xs: {
    height: 5,
    padding: 2,
    gap: 1,
    label: 'xs',
    glyph: 'sm',
    dot: 1,
    avatar: 3.5,
    cross: 2,
  },
  sm: {
    height: 6,
    padding: 2.5,
    gap: 1,
    label: 'xs',
    glyph: 'sm',
    dot: 1.25,
    avatar: 4.5,
    cross: 2,
  },
  md: {
    height: 7,
    padding: 3,
    gap: 1,
    label: 'sm',
    glyph: 'md',
    dot: 1.5,
    avatar: 5.5,
    cross: 2.5,
  },
  lg: {
    height: 9,
    padding: 4,
    gap: 1.5,
    label: 'md',
    glyph: 'lg',
    dot: 2,
    avatar: 7,
    cross: 3,
  },
}

export const chipRecipe = createRecipe({
  slots: SLOTS,

  // The cross's own geometry — thickness and centring — belongs to the shared
  // `CloseButton`; what stays below is the box and bar size this component's scale sets.
  base: theme => ({
    ...closeButtonBase(theme),
    root: {
      // A chip hugs its content where a `Button` fills its column. The difference is what
      // the two are: a button is a control the layout sizes, a chip is a token *about*
      // something, and a tag stretched across a screen has stopped being one. It is also
      // the one line of HeroUI's chip that is not a measurement.
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      // The capsule the name means, at every size. HeroUI reaches it through a radius
      // ladder that React Native would clamp to the same pill anyway; saying `full` says
      // it once, and `radius` is still there for the tag that wants square corners.
      borderRadius: theme.radius.full,
      // Squircle corners for when `radius` overrides the pill. Free on Android.
      borderCurve: 'continuous',
      // Deliberately no `overflow: 'hidden'`, where HeroUI clips: the press overlays
      // carry their own corners (`system/pressable-feedback/`), so nothing needs the clip
      // — and clipping here would cut a badge or a shadow a caller hangs off the chip.
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    avatar: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once. The border width follows
   * the *presence* of the border role rather than a per-variant flag — `tertiary` is the
   * only variant that names one, and that fact is already in the table above.
   *
   * The dot and the cross take the foreground rather than a status token of their own: on
   * a filled `success` chip the readable colour is the one the label already uses, and on
   * a `success-soft` one it is the green that token resolves to. One rule, eleven
   * variants, and a tinted chip gets it for free.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
    icon: { color: colors.fg },
    dot: { backgroundColor: colors.fg },
    closeGlyph: { backgroundColor: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the capsule `base` set. */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root'),
  },

  /**
   * The pressed colour is the variant's own `…Pressed` token, as on the `Button` and not
   * as on the `Card`: a chip is small enough that a wash over it reads as a smudge, while
   * the fill going one step down reads as the thing itself being pushed. A tinted chip
   * presses through the same OKLab formula as a token one.
   */
  states: {
    pressed: (_theme, colors) => ({ root: { backgroundColor: colors.bgPressed } }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
