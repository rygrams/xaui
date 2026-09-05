import { createRecipe, radiusAxis } from '../../system/recipe'

/**
 * One variant, and it is not a gap. A popover is the theme's floating surface: it has no
 * emphasis to report and no intent to carry, so a `variant` would be a name for a decision
 * nobody makes. What the caller wants to change goes through R14's style props or `style`.
 *
 * The recipe keeps a single-entry `variantTokens` all the same, because `resolveTint` maps
 * the roles a variant declares and that mapping is what the engine walks.
 */
const SLOTS = ['trigger', 'overlay', 'content', 'title', 'description'] as const

/**
 * The widest a `content-fit` panel measures, as a multiple of the body size.
 *
 * Thirteen ems, which is about twenty-six characters a line — narrow, and deliberately so.
 * A popover is read at a glance, and a glance is two or three short lines rather than a
 * paragraph; past this it stops being an aside and starts being a sheet with a tail. It is
 * also where HeroUI's own panels land, measured off their placement demos: a little over
 * two hundred points on a three-hundred-and-ninety point screen.
 *
 * A measure rather than a number of points, so a theme that scales its type scales the
 * panel with it. Without one at all, "as wide as its content wants" means the width of the
 * screen the moment the content is a sentence, because a sentence always wants more.
 */
export function popoverMeasure(fontSize: number): number {
  return fontSize * 13
}

export const popoverRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    overlay: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
    content: {
      position: 'absolute',
      backgroundColor: theme.colors.overlay,
      // HeroUI's twelve by sixteen: a panel is read, not scanned, so it is wider-padded
      // than it is tall-padded.
      paddingVertical: theme.spacing(3),
      paddingHorizontal: theme.spacing(4),
      // Their `--radius-3xl` on a base of 8 is 24 points; our base is 12, so the same 24
      // is `2xl`. Reading their key rather than their number puts a pill on it.
      borderRadius: theme.radius['2xl'],
      borderCurve: 'continuous',
      gap: theme.spacing(1.5),
      ...theme.shadows.overlay,
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
      color: theme.colors.overlayForeground,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
      color: theme.colors.muted,
    },
  }),

  variantTokens: { default: {} },

  variants: { radius: radiusAxis('content') },

  states: {
    disabled: theme => ({ trigger: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default' },
})
