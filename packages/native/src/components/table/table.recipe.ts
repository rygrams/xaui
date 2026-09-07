import { StyleSheet } from 'react-native'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { TableSize, TableSlot, TableVariant } from './table.type'

const SLOTS = [
  'root',
  'content',
  'header',
  'column',
  'columnLabel',
  'columnSeparator',
  'sortIndicator',
  'body',
  'row',
  'rowSelected',
  'cell',
  'cellText',
  'footer',
] as const

/**
 * `bg` is the shell, `bgSelected` a chosen row and `fgSelected` the sort mark.
 *
 * **A chosen row is `defaultSoft`, not the accent's soft.** A table is a page of values and
 * several rows can be chosen at once; an accent wash on three of twelve rows reads as three
 * highlighted *facts* rather than as a selection, and it collides with whatever accent the
 * cells themselves carry — a chip, a link, a status. The neutral wash says "these ones" and
 * leaves the accent to mean something. The sort mark keeps the accent: there is only ever
 * one of it, and it marks the table's own state rather than the data.
 *
 * **A raw `color` reaches the last two only**, and the root is what enforces that: `bg` names
 * `surface`, a bare token, so `resolveTint` would map it to the tint like any other and a
 * blue app would get an entirely blue table. A tint on a container means the thing it
 * *marks*, not the ground everything sits on — the `Timeline` says the same at its own table.
 */
const VARIANT_TOKENS: Record<TableVariant, VariantTokens> = {
  primary: {
    bg: 'surface',
    fg: 'foreground',
    border: 'border',
    bgSelected: 'defaultSoft',
    fgSelected: 'accent',
  },
  secondary: {
    bg: 'background',
    fg: 'foreground',
    bgSelected: 'defaultSoft',
    fgSelected: 'accent',
  },
}

/** One device pixel — 0.33 at 3× — and no theme has an opinion about that. */
const HAIRLINE = StyleSheet.hairlineWidth

type SizeStep = {
  /** A row's height. Fixed, so a long cell truncates rather than deforming the table. */
  row: number
  /** The header's own height, a touch taller than a row. */
  header: number
  /** A cell's horizontal inset, in spacing steps. */
  padding: number
  label: FontSizeKey
  cell: FontSizeKey
  /** The checkbox column's width, in points. */
  selection: number
  /**
   * The shell's corner, a level below the `Card`'s at the same size.
   *
   * A card is one padded surface and can take a wide curve; a table is a stack of square
   * rows behind a shell that clips them, and past `lg` the top row's corner eats into the
   * first cell's text while the rows underneath stay flat — a curve the content cannot
   * follow reads as a mistake rather than as a rounder box.
   */
  radius: RadiusKey
}

const SIZES: Record<TableSize, SizeStep> = {
  sm: {
    row: 40,
    header: 40,
    padding: 3,
    label: 'xs',
    cell: 'sm',
    selection: 44,
    radius: 'md',
  },
  md: {
    row: 48,
    header: 48,
    padding: 4,
    label: 'sm',
    cell: 'md',
    selection: 52,
    radius: 'lg',
  },
  lg: {
    row: 56,
    header: 56,
    padding: 5,
    label: 'md',
    cell: 'lg',
    selection: 60,
    radius: 'xl',
  },
}

/** The checkbox column's width, read as a value — the header and every row must agree. */
export function tableSelectionWidth(size: TableSize): number {
  return SIZES[size].selection
}

/** The sort mark: a small triangle, drawn from a bordered box with two sides transparent. */
const SORT_MARK = 5

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<TableSlot> => ({
    root: { borderRadius: theme.radius[step.radius] },
    // Half a gap to the left of the column it belongs to, which is the middle of the space
    // between that column and the one before it. Out of flow, so the rule costs no width
    // and a header column still starts on the same edge as the cells under it.
    columnSeparator: { start: -theme.spacing(step.padding) / 2 },
    // The inset is the row's and the space between columns is its `gap` — a padding on the
    // cell would double at the table's two edges, and none at all lets a name and a role run
    // together the moment a flexible column shrinks to its content.
    header: {
      height: step.header,
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.padding),
    },
    row: {
      height: step.row,
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.padding),
    },
    rowSelected: {
      height: step.row,
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.padding),
    },
    footer: {
      height: step.header,
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.padding),
    },
    columnLabel: {
      fontSize: theme.fontSizes[step.label],
      lineHeight: theme.lineHeights[step.label],
    },
    cellText: {
      fontSize: theme.fontSizes[step.cell],
      lineHeight: theme.lineHeights[step.cell],
    },
  })
}

export const tableRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { borderCurve: 'continuous', overflow: 'hidden' },
    // The column inside the horizontal scroller. It is what can be wider than the shell,
    // which is the whole reason the two are separate nodes — and `flexGrow` is what makes
    // it fill the shell when it is *narrower*, so a flexible column takes the width that is
    // there rather than shrinking to its own text.
    content: { flexDirection: 'column', flexGrow: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: HAIRLINE,
      borderBottomColor: theme.colors.separator,
    },
    column: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
    columnLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.muted,
    },
    // The rule between two column names, and the header is the only band that carries one:
    // a row's own gap already says where one field ends, and a grid ruled in both directions
    // is a spreadsheet. Absolute and full-height of its column, so it spans the label beside
    // it — the `Segment`'s seam, drawn for the same reason and in the same two lines.
    columnSeparator: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: HAIRLINE,
      backgroundColor: theme.colors.separator,
    },
    // A triangle from a box with three sides transparent — the arrow every table's header
    // has, and no icon set to install for it.
    sortIndicator: {
      width: 0,
      height: 0,
      borderStartWidth: SORT_MARK,
      borderEndWidth: SORT_MARK,
      borderBottomWidth: SORT_MARK * 1.4,
      borderStartColor: 'transparent',
      borderEndColor: 'transparent',
    },
    body: { flexDirection: 'column' },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: HAIRLINE,
      borderBottomColor: theme.colors.separator,
    },
    rowSelected: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: HAIRLINE,
      borderBottomColor: theme.colors.separator,
    },
    // No fixed width here: a cell takes its column's, or an equal share when it has none.
    cell: { justifyContent: 'center' },
    cellText: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.foreground,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: HAIRLINE,
      borderTopColor: theme.colors.separator,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    rowSelected: { backgroundColor: colors.bgSelected },
    sortIndicator: { borderBottomColor: colors.fgSelected },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },

    /** Declaration order is application order: `radius` overrides the corner `size` set. */
    radius: radiusAxis('root'),
  },

  compoundVariants: [
    {
      // The raised shell, and only that one: a `secondary` table is the page's own ground,
      // and a shadow under something the same colour as the page reads as dirt.
      //
      // `field` rather than `surface`, which is the theme's own step down: a table is the
      // widest box on a screen, and the lift that reads as "a card" under something hand-
      // sized reads as a slab under something full-width. The border is already saying
      // where the shell ends — the shadow only has to keep it off the page.
      when: { variant: 'primary' },
      style: theme => ({ root: theme.shadows.field }),
    },
    {
      // Flat, so the header band is what marks the top instead of a border round everything.
      when: { variant: 'secondary' },
      style: theme => ({ header: { backgroundColor: theme.colors.default } }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  // No `radius` here: the corner comes from `size`, as the `Card`'s does, and a default
  // named on this line would pin every size to one curve.
  defaultVariants: { variant: 'primary', size: 'md' },
})
