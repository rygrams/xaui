import { GridRoot } from './grid'
import { GridItem } from './grid-item'
import { StackRoot } from './stack'
import { StackItem } from './stack-item'

export { Row } from './row'
export { Column } from './column'

/** Overlaying is composed: the root is the containing block, `Item` is a layer in it. */
export const Stack = Object.assign(StackRoot, { Item: StackItem })

/** Every child is a cell; `Item` is the one that spans more than a column. */
export const Grid = Object.assign(GridRoot, { Item: GridItem })

export { useGrid } from './grid.context'
export type { GridContextValue } from './grid.context'
export type {
  AxisProps,
  ColumnProps,
  GridItemProps,
  GridProps,
  RowProps,
  StackItemProps,
  StackProps,
} from './view.type'
