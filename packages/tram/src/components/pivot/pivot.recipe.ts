import { createRecipe } from '@xaui/native/system'
import { roleType } from '../typography/typography.role'

const SLOTS = ['root', 'title', 'headers', 'header', 'body', 'section'] as const

/**
 * One drawing. The Pivot is the page itself: the theme's ground, the app's name in the
 * `caption` role, and the titles in the `pivot` one, Light, 24 apart. No accent, no rule,
 * no box: the current title is in the page's ink and the others grey, and that is all that
 * says which section is on screen. What is in the sections carries the accent.
 *
 * The titles' two colours are not written on `header`: they are the two ends of a fade the
 * root hands over as values.
 */
export const pivotRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
    title: {
      ...roleType('caption', theme),
      color: theme.colors.foreground,
      marginTop: theme.spacing(3),
      paddingHorizontal: theme.spacing(6),
    },
    // The titles are laid one by one inside it, out of the flow; it clips what runs past.
    headers: { overflow: 'hidden' },
    header: {
      ...roleType('pivot', theme),
      color: theme.colors.muted,
    },
    body: { flex: 1, marginTop: theme.spacing(3) },
    // Every section fills the body, laid one over the other; the loop moves them aside.
    section: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      paddingHorizontal: theme.spacing(6),
    },
  }),
})

/** Spacing steps between two titles, and from the screen's start to the current one. */
export const PIVOT_GAP = 6
export const PIVOT_MARGIN = 6
