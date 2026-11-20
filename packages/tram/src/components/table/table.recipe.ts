import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import type { CheckboxSize } from '../checkbox/checkbox.type'
import { roleType } from '../typography/typography.role'
import type { TableSlot } from './table.type'

const SLOTS = [
  'root',
  'content',
  'header',
  'column',
  'columnLabel',
  'columnLabelSorted',
  'sortIndicator',
  'body',
  'row',
  'rowSelected',
  'cell',
  'cellText',
  'footer',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'rows'

/**
 * A chosen row takes the accent's soft slice as its band, under the ticked box — on
 * several columns a band reads better than a title turned to the accent, which is what
 * the `ListBox` does on one. Only the band follows `accent` and `color`; the marks of the
 * boxes are the `Checkbox`'s own, and the sort chevron is the ink.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accentSoft' },
}

/** The chevron of the sorted column, in points. One size: the header is `caption` in all. */
const SORT_GLYPH = 12

type SizeStep = {
  /** The header's least height: shorter than a row, it names rather than holds. */
  header: number
  /** The rows' and the header's inset at both edges, in spacing steps. */
  inset: number
  /** The space between two columns, in spacing steps. */
  gap: number
  /** The Tram type role of a cell's text. */
  cell: TramTypeRole
  /** The Tram `Checkbox` the boxes are drawn with. */
  check: CheckboxSize
  /** The box column's width, in points. */
  selection: number
}

/**
 * Points, not spacing steps, for the header and the box column. A row's least height is
 * the theme's control height — 40, 48, 56 — as the `ListBox`'s settings rows are tall.
 * The boxes are a step under the table: the `Checkbox`'s 20 on a row of 40 or 48, its 26
 * on 56.
 */
export const TABLE_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { header: 32, inset: 2, gap: 2, cell: 'body', check: 'sm', selection: 40 },
  md: { header: 36, inset: 2, gap: 2, cell: 'body', check: 'sm', selection: 44 },
  lg: { header: 44, inset: 3, gap: 3, cell: 'subtitle', check: 'md', selection: 52 },
}

/** What `Table.Column` hands an `Icon` for the sort chevron. */
export function sortGlyphFor(theme: XAUITheme) {
  return { size: SORT_GLYPH, color: theme.colors.foreground }
}

function sizeAxis(size: TramSize) {
  const step = TABLE_GEOMETRY[size]

  return (theme: XAUITheme): SlotStyles<TableSlot> => {
    // The inset is the band's and the space between columns is its `gap` — a padding on
    // the cell would double between two of them.
    const band = {
      paddingHorizontal: theme.spacing(step.inset),
      gap: theme.spacing(step.gap),
    }
    const row = { ...band, minHeight: theme.controlHeights[size] }

    return {
      header: { ...band, minHeight: step.header },
      row,
      rowSelected: row,
      footer: {
        minHeight: theme.controlHeights[size],
        gap: theme.spacing(step.gap),
      },
      cellText: roleType(step.cell, theme),
    }
  }
}

export const tableRecipe = createRecipe({
  slots: SLOTS,

  // No fill, no line, no corner and no shadow anywhere: a Metro table has no shell, its
  // rows sit on the ground like the settings page's.
  base: theme => {
    // `caption` heavier. Selawik has no SemiBold face for `faceFor` to name, so the
    // weight is the theme's, as on the `Toast`'s title.
    const label = {
      ...roleType('caption', theme),
      fontWeight: theme.fontWeights.semibold,
      flexShrink: 1,
    }

    return {
      // It clips and does not move: the rows travel inside the scroller. The footer is
      // set off from them by the root's gap, not by a margin of its own (R4).
      root: { overflow: 'hidden', gap: theme.spacing(3) },
      // The column inside the scroller, allowed to be wider than the root; `flexGrow`
      // makes it fill the root when it is narrower.
      content: { flexDirection: 'column', flexGrow: 1 },
      header: { flexDirection: 'row', alignItems: 'center' },
      column: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(1.5),
      },
      columnLabel: { ...label, color: theme.colors.muted },
      // The sorted column goes to the ink; the chevron beside it says which way.
      columnLabelSorted: { ...label, color: theme.colors.foreground },
      sortIndicator: { alignItems: 'center', justifyContent: 'center' },
      body: { flexDirection: 'column' },
      row: { flexDirection: 'row', alignItems: 'center' },
      rowSelected: { flexDirection: 'row', alignItems: 'center' },
      // No fixed width here: a cell takes its column's, or an equal share when it has none.
      cell: { justifyContent: 'center' },
      // Figures of one width, so a column of numbers lines up under its name.
      cellText: { color: theme.colors.foreground, fontVariant: ['tabular-nums'] },
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** The band is a fill, so a named accent is its true colour's soft slice. */
  paint: (_theme, colors) => ({
    rowSelected: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})
