// Deep import — the `system/close-button` barrel pulls the component in, and the recipe
// only wants the geometry.
import { closeButtonBase } from '../../system/close-button/close-button.recipe'
import { createRecipe, radiusAxis } from '../../system/recipe'

const SLOTS = [
  'overlay',
  'panel',
  'content',
  'title',
  'description',
  'close',
  'closeGlyph',
] as const

/**
 * The cross's box, and the length of one of its two bars.
 *
 * HeroUI's is a `sm` icon-only `Button` around an 18-point icon. A bar rotated a quarter
 * turn spans `length / √2` on each axis, so 16 draws a cross about 11 points wide —
 * the same reading as their icon, whose glyph does not fill its box either.
 */
const CLOSE_BOX = 32
const CLOSE_BAR = 16

export const dialogRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // Centring and the bar's thickness belong to the shared button, not to the dialog.
    ...closeButtonBase(theme),
    // Unlike the `Popover`'s, this backdrop dims by default. A popover is an aside you can
    // read the page around; a dialog is a question, and the page behind it is not
    // available until it is answered.
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      backgroundColor: theme.colors.backdrop,
    },
    /**
     * The layer the panel is centred in, filling the portal. It is not the panel: a
     * centred box cannot also be the thing that centres it, and the padding here is the
     * margin the dialog keeps from the screen's edges rather than its own inner padding.
     */
    panel: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      justifyContent: 'center',
      padding: theme.spacing(5),
    },
    content: {
      backgroundColor: theme.colors.overlay,
      padding: theme.spacing(5),
      // HeroUI's `--radius-3xl` on a base of 8 is 24 points; our base is 12, so the same
      // 24 is `2xl`. Reading their key rather than their number puts a pill on it.
      borderRadius: theme.radius['2xl'],
      borderCurve: 'continuous',
      gap: theme.spacing(2),
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
    /**
     * No fill and no border — HeroUI's `CloseButton` defaults to `tertiary`, and their own
     * dialog overrides it to `ghost` at every call site. A bordered square in the corner
     * of a box that already has a border is one frame too many.
     *
     * It positions nothing. Where the cross sits is the caller's, exactly as it is theirs:
     * `alignSelf: 'flex-end'` above the title, or absolute in the corner over content that
     * has room for it. A slot that placed itself would have to guess which.
     */
    close: { width: CLOSE_BOX, height: CLOSE_BOX, borderRadius: CLOSE_BOX / 2 },
    // `muted`, like theirs: the cross is the way out, not the answer. The answer is a
    // `Button` in the words the dialog asked for.
    closeGlyph: { width: CLOSE_BAR, backgroundColor: theme.colors.muted },
  }),

  /**
   * One variant, and it is not a gap. A dialog is the theme's floating surface: it has no
   * emphasis to report — the question it asks is in its words, not in its fill. The recipe
   * keeps a single-entry `variantTokens` because `resolveTint` walks that mapping.
   */
  variantTokens: { default: {} },

  variants: { radius: radiusAxis('content') },

  defaultVariants: { variant: 'default' },
})
