import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { ListBoxSlot } from './list-box.type'

const SLOTS = [
  'root',
  'item',
  'check',
  'checkBox',
  'checkMark',
  'prefix',
  'square',
  'content',
  'title',
  'selectedTitle',
  'description',
  'suffix',
  'suffixText',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'rows'

/**
 * Only the prefix's square and the mark of a ticked box are the accent filled, so only
 * they follow `accent` and `color` here; a chosen title is the accent read as ink, set
 * by the root. The rows are on the ground, and their text is the page's.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

type SizeStep = {
  /** The least a row is tall: a Metro settings row, and always past the 48 target. */
  row: number
  /** The side of the prefix's square. */
  square: number
  /** A glyph on the square. */
  squareGlyph: number
  /** A glyph in a bare prefix, or in the suffix. */
  glyph: number
  title: TramTypeRole
  description: TramTypeRole
  /** A value written in the suffix. */
  suffix: TramTypeRole
  /** Spacing steps between the prefix, the content and the suffix. */
  gap: number
  /** The box that slides in, in `multiple`: its side, its line, its mark's inset. */
  check: { box: number; line: number; inset: number }
}

/** Points, not spacing steps: 52, 64 and 80 are the rows of the Metro settings page. */
export const LIST_BOX_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: {
    row: 52,
    square: 32,
    squareGlyph: 18,
    glyph: 20,
    title: 'body',
    description: 'caption',
    suffix: 'body',
    gap: 3,
    check: { box: 24, line: 2, inset: 4 },
  },
  md: {
    row: 64,
    square: 40,
    squareGlyph: 22,
    glyph: 24,
    title: 'subtitle',
    description: 'caption',
    suffix: 'body',
    gap: 4,
    check: { box: 28, line: 3, inset: 5 },
  },
  lg: {
    row: 80,
    square: 48,
    squareGlyph: 26,
    glyph: 28,
    title: 'title',
    description: 'body',
    suffix: 'subtitle',
    gap: 4,
    check: { box: 32, line: 3, inset: 6 },
  },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ListBoxSlot> => ({
    item: { minHeight: step.row, gap: theme.spacing(step.gap) },
    // Pulled back by the row's gap: closed, the column takes no room at all.
    check: { marginEnd: -theme.spacing(step.gap) },
    checkBox: {
      width: step.check.box,
      height: step.check.box,
      borderWidth: step.check.line,
      padding: step.check.inset,
      marginEnd: theme.spacing(step.gap),
    },
    square: { width: step.square, height: step.square },
    title: roleType(step.title, theme),
    selectedTitle: roleType(step.title, theme),
    description: roleType(step.description, theme),
    suffixText: roleType(step.suffix, theme),
  })
}

export const listBoxRecipe = createRecipe({
  slots: SLOTS,

  // No fill, no line, no shadow and no corner anywhere: a Metro list has no card, its
  // rows sit on the ground.
  base: theme => ({
    root: { alignSelf: 'stretch' },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing(2),
    },
    // The box is held at the column's end, so it slides in from the start as the column
    // opens rather than being uncovered in place.
    check: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignSelf: 'stretch',
      alignItems: 'center',
      overflow: 'hidden',
    },
    // The Tram `Checkbox`'s drawing: a line of the page's ink, a square of the accent in it.
    checkBox: { borderColor: theme.colors.foreground },
    checkMark: { flex: 1, backgroundColor: theme.colors.accent },
    prefix: { alignItems: 'center', justifyContent: 'center' },
    square: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.accent,
    },
    // It takes what the prefix and the suffix leave, and wraps there rather than pushing
    // the suffix off the row.
    content: { flex: 1, minWidth: 0, gap: theme.spacing(0.5) },
    title: { color: theme.colors.foreground },
    // The accent read on the ground, not filled: `link`, 4.5:1 at least.
    selectedTitle: { color: theme.colors.link },
    description: { color: theme.colors.muted },
    suffix: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(2) },
    suffixText: { color: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  /** A flat square, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    square: { backgroundColor: colors.bgSelected },
    checkMark: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(LIST_BOX_GEOMETRY.sm),
      md: sizeAxis(LIST_BOX_GEOMETRY.md),
      lg: sizeAxis(LIST_BOX_GEOMETRY.lg),
    },
  },

  states: {
    /**
     * A grey row: its text and its square in the grey, no accent left, and dimmed as the
     * other controls are. Resolved for the row, not the root, so one row can be grey in
     * a live list.
     */
    disabled: theme => ({
      item: { opacity: theme.opacity.disabled },
      title: { color: theme.colors.muted },
      selectedTitle: { color: theme.colors.muted },
      square: { backgroundColor: theme.colors.muted },
      checkBox: { borderColor: theme.colors.muted },
      checkMark: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})
