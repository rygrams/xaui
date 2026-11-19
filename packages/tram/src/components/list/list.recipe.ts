import { createRecipe } from '@xaui/native/system'
import type { VariantTokens } from '@xaui/native/system'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'root',
  'item',
  'leading',
  'content',
  'title',
  'subtitle',
  'description',
  'action',
  'actionText',
  'swipe',
  'swipeAction',
  'swipeActionLabel',
] as const

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'rows'

/**
 * Only the square of `Leading` and the swipe actions are the accent filled, so only they
 * follow `accent` and `color` here; the subtitle is the accent read as ink, set by the
 * root. The rows are on the ground.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

/**
 * Points. The square is the Metro thumbnail — 68 pixels on the 480-wide screen, in points
 * as the type scale is — rounded to the grid; an action under a row is wider than the
 * 48 a finger needs, so its label fits.
 */
export const LIST_GEOMETRY = {
  leading: 52,
  leadingGlyph: 26,
  actionGlyph: 20,
  swipeAction: 72,
  swipeGlyph: 22,
} as const

export const listRecipe = createRecipe({
  slots: SLOTS,

  // No fill, no line, no shadow and no corner on a row: a Metro list has no card. The
  // rows are told apart by the space between them, which the root puts there.
  base: theme => ({
    root: { alignSelf: 'stretch' },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing(3),
      // The page's margin: the list runs edge to edge, so a row's actions do too.
      paddingHorizontal: theme.spacing(6),
      backgroundColor: theme.colors.background,
    },
    leading: {
      width: LIST_GEOMETRY.leading,
      height: LIST_GEOMETRY.leading,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.colors.accent,
    },
    // It takes what the square and the action leave, and wraps there.
    content: { flex: 1, minWidth: 0, gap: theme.spacing(0.5) },
    // Three levels, three sizes and three inks: the page's, the accent's, the subtle
    // grey — the root sets the last two. The title is Metro's `PhoneTextExtraLargeStyle`,
    // on every list row: 25, Semilight.
    title: { ...roleType('title', theme), color: theme.colors.foreground },
    subtitle: { ...roleType('body', theme), color: theme.colors.link },
    description: { ...roleType('caption', theme), color: theme.colors.muted },
    // Level with the title, as the time of a Metro mail.
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: theme.spacing(2),
    },
    actionText: { ...roleType('caption', theme), color: theme.colors.muted },
    swipe: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      end: 0,
      flexDirection: 'row',
    },
    swipeAction: {
      minWidth: LIST_GEOMETRY.swipeAction,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
      paddingHorizontal: theme.spacing(2),
      backgroundColor: theme.colors.accent,
    },
    swipeActionLabel: {
      ...roleType('caption', theme),
      color: theme.colors.accentForeground,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /** Flat fills, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    leading: { backgroundColor: colors.bgSelected },
    swipeAction: { backgroundColor: colors.bgSelected },
  }),

  states: {
    /**
     * A grey row: its text and its square in the grey, no accent left, and dimmed as the
     * other controls are. Resolved for the row, not the root, so one row can be grey in
     * a live list.
     */
    disabled: theme => ({
      item: { opacity: theme.opacity.disabled },
      leading: { backgroundColor: theme.colors.muted },
      title: { color: theme.colors.muted },
      subtitle: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING },
})
