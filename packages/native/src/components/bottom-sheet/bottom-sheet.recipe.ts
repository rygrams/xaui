import { createRecipe } from '../../system/recipe'
import type { RadiusKey, XAUITheme } from '../../theme/theme.type'

const SLOTS = ['overlay', 'content', 'handle', 'title', 'description'] as const

/** The grab bar: HeroUI's proportions, in points because a pill is not a gap. */
const HANDLE = { width: 36, height: 4 } as const

/**
 * Only the **top** corners, and only they can be overridden.
 *
 * A sheet sits on the bottom edge of the screen, so its lower corners are off it. Rounding
 * them would put two arcs against a straight edge nobody can see, and `radiusAxis` — which
 * writes `borderRadius` — would round all four.
 */
function topCorners(radius: RadiusKey) {
  return (theme: XAUITheme) => ({
    content: {
      borderTopStartRadius: theme.radius[radius],
      borderTopEndRadius: theme.radius[radius],
    },
  })
}

const RADII = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'field',
  'full',
] as const satisfies readonly RadiusKey[]

export const bottomSheetRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      backgroundColor: theme.colors.backdrop,
    },
    content: {
      position: 'absolute',
      start: 0,
      end: 0,
      bottom: 0,
      backgroundColor: theme.colors.overlay,
      padding: theme.spacing(5),
      gap: theme.spacing(2),
      // HeroUI's `--radius-4xl` on a base of 8 is 32 points; the nearest on our base of 12
      // is `3xl` at 36. A sheet's corner is the largest in the library because it is the
      // only edge of it you can see.
      borderTopStartRadius: theme.radius['3xl'],
      borderTopEndRadius: theme.radius['3xl'],
      borderCurve: 'continuous',
      ...theme.shadows.overlay,
    },
    /**
     * The grab bar. It is the only thing telling a reader the sheet can be dragged — the
     * gesture has no other affordance, and a sheet without one reads as a panel that
     * happens to have arrived from below.
     */
    handle: {
      alignSelf: 'center',
      width: HANDLE.width,
      height: HANDLE.height,
      borderRadius: HANDLE.height / 2,
      backgroundColor: theme.colors.separator,
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

  /** One variant: a sheet is the theme's floating surface, with no emphasis to report. */
  variantTokens: { default: {} },

  variants: {
    radius: Object.fromEntries(RADII.map(r => [r, topCorners(r)])) as Record<
      RadiusKey,
      ReturnType<typeof topCorners>
    >,
  },

  defaultVariants: { variant: 'default' },
})
