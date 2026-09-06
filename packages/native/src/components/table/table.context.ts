import { createSlotContext } from '../../system/slot'
import type { TableContextValue, TableRowContextValue } from './table.type'

/** R10 — the resolved styles, the column widths, the selection and the sort. */
export const [TableProvider, useTable] =
  createSlotContext<TableContextValue>('Table')

/**
 * What one row publishes, and why there are two contexts.
 *
 * A cell needs to know whether *its* row is chosen; the root cannot say, because it is the
 * same root for every row. The `Timeline`'s arrangement, for the same reason.
 */
export const [TableRowProvider, useTableRow] =
  createSlotContext<TableRowContextValue>('Table.Row')

/**
 * Which column a cell is in, counted by the row or the header around it.
 *
 * A provider rather than a clone: the position is state the cell needs and not a prop it
 * declares, and cloning would put the row's hand inside a child it does not own (R1).
 */
export const [TableColumnIndexProvider, useTableColumnIndex] =
  createSlotContext<number>('Table')
