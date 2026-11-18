import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { ListBoxSlot } from './list-box.type'

const SLOTS = [
  'root',
  'item',
  'separator',
  'prefix',
  'square',
  'content',
  'title',
  'description',
  'suffix',
  'suffixText',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'rows'

/**
 * Only the prefix's square is the accent, so only the square follows `accent` and
 * `color`. The rows are on the ground, and their text is the page's.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

/** The line between two rows, in points. */
const SEPARATOR = 2

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
  },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ListBoxSlot> => ({
    item: { minHeight: step.row, gap: theme.spacing(step.gap) },
    square: { width: step.square, height: step.square },
    title: roleType(step.title, theme),
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
    separator: { height: SEPARATOR, backgroundColor: theme.colors.default },
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
    description: { color: theme.colors.muted },
    suffix: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(2) },
    suffixText: { color: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  /** A flat square, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    square: { backgroundColor: colors.bgSelected },
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
      square: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})
