import { createSlotContext } from '@xaui/native/system'
import type { TableContextValue, TableRowContextValue } from './table.type'

/** R10 — the resolved styles, the column widths, the selection and the sort. */
export const [TableProvider, useTable] =
  createSlotContext<TableContextValue>('Tram.Table')

/**
 * What one row publishes. A cell needs to know whether *its* row is chosen, and the root
 * cannot say: it is the same root for every row.
 */
export const [TableRowProvider, useTableRow] =
  createSlotContext<TableRowContextValue>('Tram.Table.Row')

/**
 * Which column a cell is in, counted by the row or the header around it — a provider
 * rather than a clone, so the row never puts its hand inside a child it does not own (R1).
 */
export const [TableColumnIndexProvider, useTableColumnIndex] =
  createSlotContext<number>('Tram.Table')
