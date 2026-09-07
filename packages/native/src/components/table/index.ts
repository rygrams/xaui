import { TableBody } from './table-body'
import { TableCell } from './table-cell'
import { TableColumn } from './table-column'
import { TableContent } from './table-content'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableRoot } from './table'
import { TableRow } from './table-row'
import { TableScrollContainer } from './table-scroll-container'
import { TableSelectAllCell, TableSelectionCell } from './table-selection'

export const Table = Object.assign(TableRoot, {
  ScrollContainer: TableScrollContainer,
  Content: TableContent,
  Header: TableHeader,
  Column: TableColumn,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  SelectAllCell: TableSelectAllCell,
  SelectionCell: TableSelectionCell,
  Footer: TableFooter,
})

export { TableRoot } from './table'
export { TableBody } from './table-body'
export { TableCell } from './table-cell'
export { TableColumn } from './table-column'
export { TableContent } from './table-content'
export { TableFooter } from './table-footer'
export { TableHeader } from './table-header'
export { TableRow } from './table-row'
export { TableScrollContainer } from './table-scroll-container'
export { TableSelectAllCell, TableSelectionCell } from './table-selection'
export { useTable, useTableRow } from './table.context'
export { tableRecipe } from './table.recipe'
export type {
  TableColumnProps,
  TableContextValue,
  TableProps,
  TableRowContextValue,
  TableRowProps,
  TableScrollProps,
  TableSize,
  TableSlot,
  TableTextProps,
  TableVariant,
  TableViewProps,
} from './table.type'
export type { SelectionMode, SortDescriptor } from '../../utils/selection'
