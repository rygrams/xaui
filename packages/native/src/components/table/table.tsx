import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { nextSort, toggleEveryKey, toggleKey } from '../../utils/selection'
import { TableProvider } from './table.context'
import { tableRecipe, tableSelectionWidth } from './table.recipe'
import type { TableProps } from './table.type'

const NO_KEYS: readonly string[] = []

/**
 * Rows and columns, with a shell round them.
 *
 * ```tsx
 * <Table selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys}>
 *   <Table.ScrollContainer>
 *     <Table.Content>
 *       <Table.Header>
 *         <Table.SelectAllCell />
 *         <Table.Column id="name" allowsSorting>Nom</Table.Column>
 *         <Table.Column id="role" width={120}>Rôle</Table.Column>
 *       </Table.Header>
 *
 *       <Table.Body>
 *         {people.map(person => (
 *           <Table.Row key={person.id} id={person.id}>
 *             <Table.SelectionCell />
 *             <Table.Cell>{person.name}</Table.Cell>
 *             <Table.Cell>{person.role}</Table.Cell>
 *           </Table.Row>
 *         ))}
 *       </Table.Body>
 *     </Table.Content>
 *   </Table.ScrollContainer>
 * </Table>
 * ```
 *
 * **The table never reorders anything.** Sorting reports the press and the caller sorts their
 * own collection — a table that sorted for you would have to understand every cell's value,
 * and the only thing that does is the code that built the row.
 *
 * **A cell takes its column's width, and the column is the one that declares it.** Widths are
 * registered by position from the header and read by position in every row, so a table stays
 * aligned without a cell knowing anything about the column above it.
 *
 * **Three nodes rather than one**, and each earns its place: the root is the shell, which
 * clips and does not move; `Table.ScrollContainer` is the horizontal scroller; and
 * `Table.Content` is the column inside it that is allowed to be wider than the shell. Folding
 * them together is what makes a wide table either clip its own rows or drag its border
 * sideways.
 */
export const TableRoot = forwardRef<View, TableProps>(function Table(
  {
    children,
    variant,
    size = 'md',
    radius,
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

  const [selectedKeys, setSelectedKeys] = useControllableState<readonly string[]>({
    value: controlledKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelectionChange,
  })

  const selection = { variant, size, radius }
  const styles = tableRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? tableRecipe.tint({ theme, color, selection }) : undefined

  const [widths, setWidths] = useState<ReadonlyArray<number | undefined>>([])

  const setWidth = useCallback((index: number, width: number | undefined) => {
    setWidths(current => {
      if (current[index] === width && index < current.length) return current

      const next = [...current]
      next[index] = width
      return next
    })
  }, [])

  // The rows in the order they mounted, which is the order they are on screen. A ref rather
  // than state: it changes while the body renders, and a `setState` there is a loop.
  const rows = useRef<string[]>([])
  const [rowKeys, setRowKeys] = useState<readonly string[]>(NO_KEYS)

  const registerRow = useCallback((id: string) => {
    rows.current = [...rows.current, id]
    // One render after the body has mounted, which is what the header's box needs and
    // nothing else does — so it is deferred rather than done during the row's own render.
    setRowKeys(rows.current)

    return () => {
      rows.current = rows.current.filter(existing => existing !== id)
      setRowKeys(rows.current)
    }
  }, [])

  const toggleRow = useCallback(
    (id: string) => {
      if (isDisabled || disabledKeys.includes(id)) return
      setSelectedKeys(current => toggleKey(current, id, selectionMode))
    },
    [disabledKeys, isDisabled, selectionMode, setSelectedKeys]
  )

  const toggleAll = useCallback(() => {
    if (isDisabled) return
    setSelectedKeys(current => toggleEveryKey(current, rowKeys, disabledKeys))
  }, [disabledKeys, isDisabled, rowKeys, setSelectedKeys])

  const sortBy = useCallback(
    (column: string) => {
      if (isDisabled) return
      onSortChange?.(nextSort(sortDescriptor, column))
    },
    [isDisabled, onSortChange, sortDescriptor]
  )

  const context = useMemo(
    () => ({
      contentStyle: styles.content,
      headerStyle: styles.header,
      columnStyle: styles.column,
      columnLabelStyle: styles.columnLabel,
      sortIndicatorStyle: [styles.sortIndicator, tint?.sortIndicator],
      bodyStyle: styles.body,
      rowStyle: styles.row,
      rowSelectedStyle: [styles.rowSelected, tint?.rowSelected],
      cellStyle: styles.cell,
      cellTextStyle: styles.cellText,
      footerStyle: styles.footer,

      widths,
      setWidth,
      selectionWidth: tableSelectionWidth(size),

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
      widths,
      setWidth,
      size,
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

  // The tint is **not** put on the root, and that has to be deliberate: `bg` names `surface`,
  // a bare token, so `resolveTint` maps it to the tint like any other and a blue app would
  // get an entirely blue table. A tint on a container means the thing it *marks* — the chosen
  // row and the sort arrow — not the ground everything sits on.
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

TableRoot.displayName = 'XAUI.Table.Root'
