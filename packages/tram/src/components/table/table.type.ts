import type { ReactNode } from 'react'
import type {
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  AsChildProps,
  IconContextValue,
  SelectionMode,
  SortDescriptor,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { CheckboxSize } from '../checkbox/checkbox.type'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type { SelectionMode, SortDescriptor }

export type TableSlot =
  | 'root'
  | 'content'
  | 'header'
  | 'column'
  | 'columnLabel'
  | 'columnLabelSorted'
  | 'sortIndicator'
  | 'body'
  | 'row'
  | 'rowSelected'
  | 'cell'
  | 'cellText'
  | 'footer'

export type TableSize = TramSize

type TableOwnProps = {
  /** The rows' least height — 40, 48, 56 — the header's, the type and the boxes. */
  size?: TableSize
  /**
   * One of the twenty named accents — `accent="lime"` — for the chosen rows' soft band
   * and the marks of their boxes. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint, never a token: the chosen rows' band and the boxes' marks. */
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
   * **The table never reorders anything.** It reports the press and the caller sorts
   * their own collection.
   */
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor | undefined) => void
  /** Dims the whole table and stops every press. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The Native `Table`'s props, less two. **No `variant`**: Native's two are two shells —
 * a raised card and a flat ground with a header band — and a Metro table has no shell,
 * its rows sit on the ground. **No `radius`**: with no shell there is no corner to round.
 */
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

/** What the boxes of `SelectionCell` and `SelectAllCell` are drawn with. */
export type TableCheck = {
  size: CheckboxSize
  accent?: TramAccentName
  color?: string
}

/** R5 — resolved styles, plus the state the slots cannot work out on their own. */
export type TableContextValue = {
  contentStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<ViewStyle>
  columnStyle: StyleProp<ViewStyle>
  columnLabelStyle: StyleProp<TextStyle>
  /** The name of the column the data is sorted on: the ink, where the others are grey. */
  columnLabelSortedStyle: StyleProp<TextStyle>
  sortIndicatorStyle: StyleProp<ViewStyle>
  /** What the chevron of the sorted column takes: its size, and the ink. */
  sortGlyph: IconContextValue
  /** How far a sortable column's press reaches above and below it, to make 48. */
  headerReach: number
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
  /** The width of the box column, so the header and every row agree on it. */
  selectionWidth: number
  /** The Tram `Checkbox` the boxes are. */
  check: TableCheck

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
