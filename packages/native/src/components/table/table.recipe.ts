import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TableSize, TableSlot, TableVariant } from './table.type'

const SLOTS = [
  'root',
  'content',
  'header',
  'column',
  'columnLabel',
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
    bgSelected: 'accentSoft',
    fgSelected: 'accent',
  },
  secondary: {
    bg: 'background',
    fg: 'foreground',
    bgSelected: 'accentSoft',
    fgSelected: 'accent',
  },
}

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
}

const SIZES: Record<TableSize, SizeStep> = {
  sm: { row: 40, header: 40, padding: 3, label: 'xs', cell: 'sm', selection: 44 },
  md: { row: 48, header: 48, padding: 4, label: 'sm', cell: 'md', selection: 52 },
  lg: { row: 56, header: 56, padding: 5, label: 'md', cell: 'lg', selection: 60 },
}

/** The checkbox column's width, read as a value — the header and every row must agree. */
export function tableSelectionWidth(size: TableSize): number {
  return SIZES[size].selection
}

/** The sort mark: a small triangle, drawn from a bordered box with two sides transparent. */
const SORT_MARK = 5

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<TableSlot> => ({
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
    // which is the whole reason the two are separate nodes.
    content: { flexDirection: 'column' },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: theme.borderWidth.default,
      borderBottomColor: theme.colors.separator,
    },
    column: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
    columnLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.muted,
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
      borderBottomWidth: theme.borderWidth.default,
      borderBottomColor: theme.colors.separator,
    },
    rowSelected: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: theme.borderWidth.default,
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
      borderTopWidth: theme.borderWidth.default,
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

    radius: radiusAxis('root'),
  },

  compoundVariants: [
    {
      // The raised shell, and only that one: a `secondary` table is the page's own ground,
      // and a shadow under something the same colour as the page reads as dirt.
      when: { variant: 'primary' },
      style: theme => ({ root: theme.shadows.surface }),
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

  defaultVariants: { variant: 'primary', size: 'md', radius: '2xl' },
})
