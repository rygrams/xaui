import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { ToastVariant } from './toast.type'

const SLOTS = ['root', 'title', 'description', 'actions'] as const

/**
 * The variant paints the **title** and nothing else.
 *
 * A red card sliding in from the edge of the screen reads as the app breaking; a red line
 * of text reads as the thing you just did failing. The surface stays the theme's floating
 * one whatever happened, which is also what lets two toasts of different kinds stack
 * without the pile looking like a paint chart.
 *
 * The soft foregrounds rather than the full colours: a toast is read at a glance and from
 * the corner of the eye, and `danger` at full strength on an overlay surface is a shout
 * where the soft one is a statement.
 */
const VARIANT_TOKENS: Record<ToastVariant, VariantTokens> = {
  default: { fg: 'overlayForeground' },
  accent: { fg: 'accentSoftForeground' },
  success: { fg: 'successSoftForeground' },
  warning: { fg: 'warningSoftForeground' },
  danger: { fg: 'dangerSoftForeground' },
}

export const toastRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      backgroundColor: theme.colors.overlay,
      padding: theme.spacing(4),
      // HeroUI's `--radius-3xl` on a base of 8 is 24 points; ours is 12, so the same 24
      // is `2xl`.
      borderRadius: theme.radius['2xl'],
      borderCurve: 'continuous',
      gap: theme.spacing(1),
      ...theme.shadows.overlay,
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      color: theme.colors.muted,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ title: { color: colors.fg } }),

  variants: { radius: radiusAxis('root') },

  defaultVariants: { variant: 'default' },
})
