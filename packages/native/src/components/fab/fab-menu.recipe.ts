import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { FabMenuSlot, FabMenuSize } from './fab-menu.type'

const SLOTS = ['overlay', 'content', 'item', 'itemLabel'] as const

/**
 * **The pills, and nothing that floats them.** The trigger is a `Fab` and carries the
 * `Fab`'s recipe; the positioning is the `Menu`'s hook. What is this component's own is a
 * row of actions that are **not** a panel.
 *
 * A `Menu` is one surface with rows inside it. Here every action is its own floating pill
 * with air between them, and the difference is not decoration: a panel dropping out of a
 * field is a list of that field's answers, while these come out of a button that floats
 * over the page — there is no edge for them to belong to, so each one carries its own.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  // A single entry, and it is still a table: `resolveTint` only maps roles a variant
  // declared, so this is what carries a raw `color` onto the pill.
  default: { bg: 'overlay', fg: 'overlayForeground' },
}

type SizeStep = {
  /** The pill's inset, in spacing steps. Its height is that plus the line. */
  paddingHorizontal: number
  paddingVertical: number
  /** Between two pills, and between a pill's mark and its word. */
  gap: number
  label: FontSizeKey
}

/**
 * `md` is the screenshot measured: a 16-point inset and a 24-point line make a 44-point
 * pill under a 56-point FAB — smaller than the button that opened it, which is what keeps
 * the FAB reading as the action and these as its parts.
 *
 * The height is **intrinsic** rather than a control height: a pill is a word with padding,
 * and pinning it to a field's scale would leave a two-line action clipped instead of tall.
 */
const SIZES: Record<FabMenuSize, SizeStep> = {
  sm: { paddingHorizontal: 3.5, paddingVertical: 2, gap: 2, label: 'sm' },
  md: { paddingHorizontal: 4, paddingVertical: 2.5, gap: 3, label: 'md' },
  lg: { paddingHorizontal: 5, paddingVertical: 3, gap: 3, label: 'lg' },
}

function sizeAxis(step: SizeStep) {
  const { paddingHorizontal, paddingVertical, gap, label } = step

  return (theme: XAUITheme): SlotStyles<FabMenuSlot> => ({
    content: { gap: theme.spacing(gap) },
    item: {
      paddingHorizontal: theme.spacing(paddingHorizontal),
      paddingVertical: theme.spacing(paddingVertical),
      gap: theme.spacing(gap - 1),
    },
    itemLabel: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
  })
}

export const fabMenuRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    /**
     * **It dims, where a `Menu`'s and a `Select`'s do not.** Those drop out of a field and
     * leave the page alone, because the page is still the context for the answer they are
     * asking for. A FAB floats over everything and its actions replace the screen's one
     * thing to do with three — that is a `Dialog`'s situation, and it takes the `Dialog`'s
     * backdrop. It is also what puts the pills on a dimmed ground, which is where a white
     * pill reads as white.
     *
     * `backgroundColor="transparent"` on the slot takes it back off (R14).
     */
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      backgroundColor: theme.colors.backdrop,
    },
    /**
     * A column with no surface of its own: the pills are the surface, and a background
     * here would be the panel this component exists not to be.
     *
     * Which edge the pills line up on is **not** here — it follows `align`, which is a
     * prop of `Fab.Menu.Content` and so is never seen by a recipe resolving on the root.
     * See `fabMenuAlignment`.
     */
    content: { position: 'absolute' },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      // The pill, and what makes it one. `full` on a box whose height is intrinsic is a
      // capsule at every size without a radius per size.
      borderRadius: theme.radius.full,
      borderCurve: 'continuous',
      // The `surface` shadow rather than the `overlay` one a `Menu` panel wears: three
      // pills twelve points apart, each carrying a sixteen-point blur, pool into one grey
      // smudge behind the lot of them.
      ...theme.shadows.surface,
    },
    itemLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    item: { backgroundColor: colors.bg },
    itemLabel: { color: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },

    /** Declared after `size`, so it overrides the capsule the pill chose. */
    radius: radiusAxis('item'),
  },

  /**
   * No `pressed` face, unlike the `Menu`'s row.
   *
   * A menu row is a full-width strip inside a panel, where the shared scale treatment
   * reads as the panel twitching, so it darkens instead. A pill is a small floating button
   * — the same object the FAB above it is — and `PressableFeedback`'s treatment is exactly
   * right on it. Touch feedback is written once in this library, and this is one of the
   * places that means not writing it again.
   *
   * The `disabled` face is resolved on its own and handed to the pill rather than folded
   * into the root's pass, so an action that is spent dims once whether it was the action
   * or the whole menu that said so.
   */
  states: {
    disabled: theme => ({ item: { opacity: theme.opacity.disabled } }),
  },

  // `variant` is named even though the table has one entry: without it the selection
  // resolves to `undefined`, `paint` is handed an empty set of colours, and the pill ends
  // up with `backgroundColor: undefined` — a hole showing the backdrop through it rather
  // than a white pill. `createRecipe` warns about exactly this now.
  defaultVariants: { variant: 'default', size: 'md' },
})
