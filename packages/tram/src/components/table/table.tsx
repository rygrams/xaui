import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps, useTableState } from '@xaui/native/system'
import type { SortDescriptor } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { TableProvider } from './table.context'
import {
  DEFAULT_SIZE,
  TABLE_GEOMETRY,
  sortGlyphFor,
  tableRecipe,
} from './table.recipe'
import type { TableProps } from './table.type'

const NO_KEYS: readonly string[] = []

/**
 * Rows and columns on the ground — the Native `Table`'s API, drawn as the Metro settings
 * page: no shell, no fill, no line, no corner. The column names are a grey `caption`; the
 * sorted one turns to the ink, with a small chevron.
 *
 * ```tsx
 * <Table selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys}>
 *   <Table.ScrollContainer>
 *     <Table.Content minWidth={420}>
 *       <Table.Header>
 *         <Table.SelectAllCell />
 *         <Table.Column id="name" allowsSorting>appareil</Table.Column>
 *         <Table.Column id="size" width={72}>Mo</Table.Column>
 *       </Table.Header>
 *       <Table.Body>
 *         {devices.map(device => (
 *           <Table.Row key={device.id} id={device.id}>
 *             <Table.SelectionCell />
 *             <Table.Cell>{device.name}</Table.Cell>
 *             <Table.Cell>{device.size}</Table.Cell>
 *           </Table.Row>
 *         ))}
 *       </Table.Body>
 *     </Table.Content>
 *   </Table.ScrollContainer>
 *   <Table.Footer>…</Table.Footer>
 * </Table>
 * ```
 *
 * Native's three nodes stay, without the shell: the root clips and does not move,
 * `ScrollContainer` scrolls sideways, and `Content` may be wider than the root. The
 * footer is outside the scroller, so a wide table never carries it off.
 *
 * **The table never reorders anything.** Sorting reports the press; the caller sorts.
 *
 * **Selection** is Native's: `single` replaces and a second press clears, `multiple`
 * toggles, the header's box knows nothing, some and all. A chosen row takes the accent's
 * soft band under its ticked box; a pressable row leans toward the finger, its colours
 * unchanged. A choice is felt through `TramProvider`'s `onHaptic`, as a `selection`.
 */
export const TableRoot = forwardRef<View, TableProps>(function Table(
  {
    children,
    size = DEFAULT_SIZE,
    accent,
    color,
    selectionMode = 'none',
    selectedKeys: controlledKeys,
    defaultSelectedKeys = NO_KEYS,
    onSelectionChange,
    disabledKeys = NO_KEYS,
    sortDescriptor,
    onSortChange,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()

  const selection = { size }
  const styles = tableRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  // The band is a fill, so a named accent is its true colour. Uncached: a raw tint must
  // stay out of the cache key. Kept off the root — the ground is not what it marks.
  const paint = flatPaint({ accent, color })
  const tint = paint
    ? tableRecipe.tint({ theme, color: paint, selection })
    : undefined

  // A sort is felt as a choice. Only reached when the table is live: the state stops a
  // disabled table's sort before it reports.
  const reportSort = useCallback(
    (descriptor: SortDescriptor | undefined) => {
      haptic('selection')
      onSortChange?.(descriptor)
    },
    [haptic, onSortChange]
  )

  // Native's table state. No haptic in `toggleRow`: the box feels its own tick, and the
  // row feels its press.
  const {
    widths,
    setWidth,
    selectedKeys,
    rowKeys,
    registerRow,
    toggleRow,
    toggleAll,
    sortBy,
  } = useTableState({
    selectionMode,
    selectedKeys: controlledKeys,
    defaultSelectedKeys,
    onSelectionChange,
    disabledKeys,
    sortDescriptor,
    onSortChange: reportSort,
    isDisabled,
  })

  const step = TABLE_GEOMETRY[size]

  const context = useMemo(
    () => ({
      contentStyle: styles.content,
      headerStyle: styles.header,
      columnStyle: styles.column,
      columnLabelStyle: styles.columnLabel,
      columnLabelSortedStyle: styles.columnLabelSorted,
      sortIndicatorStyle: styles.sortIndicator,
      sortGlyph: sortGlyphFor(theme),
      headerReach: touchReach(step.header),
      bodyStyle: styles.body,
      rowStyle: styles.row,
      rowSelectedStyle: [styles.rowSelected, tint?.rowSelected],
      cellStyle: styles.cell,
      cellTextStyle: styles.cellText,
      footerStyle: styles.footer,

      widths,
      setWidth,
      selectionWidth: step.selection,
      check: { size: step.check, accent, color },

      selectionMode,
      selectedKeys,
      disabledKeys,
      rowKeys,
      registerRow,
      toggleRow,
      toggleAll,

      sortDescriptor,
      sortBy,

      isDisabled,
    }),
    [
      styles,
      tint,
      theme,
      step,
      widths,
      setWidth,
      accent,
      color,
      selectionMode,
      selectedKeys,
      disabledKeys,
      rowKeys,
      registerRow,
      toggleRow,
      toggleAll,
      sortDescriptor,
      sortBy,
      isDisabled,
    ]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <TableProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </TableProvider>
  )
})

TableRoot.displayName = 'XAUI.Tram.Table.Root'
