import type { ReactNode } from 'react'
import type {
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { SelectionMode, SortDescriptor } from '../../utils/selection'

export type TableSlot =
  | 'root'
  | 'content'
  | 'header'
  | 'column'
  | 'columnLabel'
  | 'sortIndicator'
  | 'body'
  | 'row'
  | 'rowSelected'
  | 'cell'
  | 'cellText'
  | 'footer'

/**
 * Two shells, and the difference is where the edge is.
 *
 * `primary` is a raised card: a `surface` fill, a border and the theme's surface shadow, for
 * a table that sits on a page among other things. `secondary` is flat — the page's own
 * ground with a filled header band — for a table that *is* the screen.
 *
 * No `success` or `danger`: a table reports what is in it, and the intent belongs to a chip
 * in a cell rather than to the shell round all of them.
 */
export type TableVariant = 'primary' | 'secondary'

export type TableSize = Extract<Size, 'sm' | 'md' | 'lg'>

type TableOwnProps = {
  variant?: TableVariant
  /** The row's height, the cell's inset and the type. */
  size?: TableSize
  /** The shell's corner. */
  radius?: RadiusKey
  /** A raw tint (R7). It lands on a chosen row and on the sort mark. */
  color?: string
  /** @default 'none' */
  selectionMode?: SelectionMode
  /** The chosen rows, by their `Table.Row` id. Present means controlled. */
  selectedKeys?: readonly string[]
  defaultSelectedKeys?: readonly string[]
  onSelectionChange?: (keys: readonly string[]) => void
  /** Rows that cannot be chosen, and which the header's box does not count. */
  disabledKeys?: readonly string[]
  /**
   * Which column the data is sorted on.
   *
   * **The table never reorders anything.** It reports the press and the caller sorts their
   * own collection — a table that sorted for you would need to understand every cell's value,
   * and the only thing that does is the code that built the row.
   */
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor | undefined) => void
  /** Dims the whole table and stops every press. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the component's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type TableProps = TableOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof TableOwnProps> &
  Omit<ViewStyleProps, keyof TableOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type TableViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type TableTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/** Everything a `ScrollView` accepts, plus the style keys as props (R14). */
export type TableScrollProps = Omit<ScrollViewProps, 'horizontal'> &
  Omit<ViewStyleProps, keyof ScrollViewProps> & { children?: ReactNode }

type TableColumnOwnProps = {
  /** Names the column in `sortDescriptor`. Required to sort on it. */
  id?: string
  /** Fixed width in points. Unset, the column takes an equal share of the row. */
  width?: number
  /** Whether pressing the header sorts on it. */
  allowsSorting?: boolean
  children?: ReactNode
}

export type TableColumnProps = TableColumnOwnProps &
  Omit<ViewProps, keyof TableColumnOwnProps> &
  Omit<ViewStyleProps, keyof TableColumnOwnProps | keyof ViewProps>

type TableRowOwnProps = {
  /** What this row is called in `selectedKeys`. Required to choose it. */
  id?: string
  children?: ReactNode
}

export type TableRowProps = TableRowOwnProps &
  Omit<ViewProps, keyof TableRowOwnProps> &
  Omit<ViewStyleProps, keyof TableRowOwnProps | keyof ViewProps>

/** R5 — resolved styles, plus the state the slots cannot work out on their own. */
export type TableContextValue = {
  contentStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<ViewStyle>
  columnStyle: StyleProp<ViewStyle>
  columnLabelStyle: StyleProp<TextStyle>
  sortIndicatorStyle: StyleProp<ViewStyle>
  bodyStyle: StyleProp<ViewStyle>
  rowStyle: StyleProp<ViewStyle>
  rowSelectedStyle: StyleProp<ViewStyle>
  cellStyle: StyleProp<ViewStyle>
  cellTextStyle: StyleProp<TextStyle>
  footerStyle: StyleProp<ViewStyle>

  /** How wide each column is, by its position. `undefined` is an equal share. */
  widths: ReadonlyArray<number | undefined>
  /** How a column reports its width, from the header. */
  setWidth: (index: number, width: number | undefined) => void
  /** The width of the checkbox column, so the header and every row agree on it. */
  selectionWidth: number

  selectionMode: SelectionMode
  selectedKeys: readonly string[]
  disabledKeys: readonly string[]
  /** Every row that registered an id, in order — what the header's box counts. */
  rowKeys: readonly string[]
  registerRow: (id: string) => () => void
  toggleRow: (id: string) => void
  toggleAll: () => void

  sortDescriptor: SortDescriptor | undefined
  sortBy: (column: string) => void

  isDisabled: boolean
}

/** What one row publishes to the cells inside it. */
export type TableRowContextValue = {
  id: string | undefined
  isSelected: boolean
  isDisabled: boolean
}
