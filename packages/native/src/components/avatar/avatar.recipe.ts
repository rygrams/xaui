import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { AvatarSize, AvatarSlot, AvatarVariant } from './avatar.type'

const SLOTS = ['root', 'fallback', 'initials', 'icon'] as const

/**
 * Eleven lines of data, and the `Chip`'s eleven — an avatar is a token *about* a person or
 * a thing, which is the category the `Chip` established, so a name means here what it
 * means there.
 *
 * They colour the **frame**, which is all that shows when there is no image. HeroUI says
 * the same set as a `variant × color` matrix; these eleven flat names say it once.
 *
 * No `…Pressed` roles: an avatar is not a control. One inside a pressable row is a child of
 * that row's `PressableFeedback`, which paints the press on the row rather than on the face.
 */
const VARIANT_TOKENS: Record<AvatarVariant, VariantTokens> = {
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
 * `size` drives the diameter and the type inside it — **never a width of its own**. An
 * avatar is a square before it is a circle, so the one measurement sets both sides.
 *
 * Forty, forty-eight and sixty-four are HeroUI's three steps; `xs` is the thirty-two our
 * ladder adds below them, which is the size an avatar is inside a `Chip` or a list row.
 *
 * The glyph runs ahead of the initials at the top of the scale — 12, 14, 16, 20 against
 * 12, 12, 14, 16 — because two letters fill a circle that one person-icon has to sit
 * inside with air around it. HeroUI ships the same two ladders, for the same reason.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AvatarSlot> => {
    const diameter = theme.spacing(step.diameter)

    return {
      root: { width: diameter, height: diameter },
      initials: {
        fontSize: theme.fontSizes[step.initials],
        lineHeight: theme.lineHeights[step.initials],
      },
      icon: { fontSize: theme.fontSizes[step.glyph] },
    }
  }
}

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(12)` is 48 on the base-4 scale. */
  diameter: number
  initials: FontSizeKey
  /** The box an `Icon` inside the fallback gets, at or above the initials' step. */
  glyph: FontSizeKey
}

const SIZES: Record<AvatarSize, SizeStep> = {
  xs: { diameter: 8, initials: 'xs', glyph: 'xs' },
  sm: { diameter: 10, initials: 'xs', glyph: 'sm' },
  md: { diameter: 12, initials: 'sm', glyph: 'md' },
  lg: { diameter: 16, initials: 'md', glyph: 'xl' },
}

export const avatarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      // The clip is what makes a square photo round, so unlike on the `Chip` it is not
      // optional here: without it the image is a rectangle sitting over a circle.
      overflow: 'hidden',
      // Squircle corners for when `radius` overrides the circle. Free on Android.
      borderCurve: 'continuous',
      borderWidth: 0,
    },
    fallback: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    initials: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      // Two letters in a circle sit off-centre by the descender otherwise.
      textAlign: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once. The border width follows
   * the *presence* of the border role, so `ghost` needs no rule of its own to say it has
   * no edge.
   *
   * The image takes no colour: it is a photograph, and tinting one is what `Icon`'s
   * `source` form is for.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    initials: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the circle `base` set. */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis<AvatarSlot>('root'),
  },

  /**
   * A circle at every size, where HeroUI fixes one large radius for all three — which
   * makes their small avatars round and their large ones squircles. `full` says the shape
   * the name means once, and `radius` is still there for the logo that wants a square.
   */
  defaultVariants: { variant: 'default', size: 'md', radius: 'full' },
})
