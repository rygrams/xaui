import { Children, forwardRef, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import {
  TableColumnIndexProvider,
  TableRowProvider,
  useTable,
} from './table.context'
import type { TableRowProps } from './table.type'

/**
 * One row: a settings row of the `ListBox`, at least as tall as a control of the table's
 * size, with no line under it.
 *
 * It counts its children so each cell knows its position, and **registers its id with
 * the table** — the only way the header's box can know how many rows there are.
 *
 * With a `selectionMode` and an `id` it is pressable, and pressing it chooses it: it
 * leans toward the finger as the `ListBox`'s rows do, by the wide angle, its colours
 * unchanged, and the choice is felt as a `selection`. A chosen row takes the accent's
 * soft band. Without either it is a plain row and announces itself as nothing at all.
 * With motion reduced, or under `disable-all`, it does not lean.
 */
export const TableRow = forwardRef<View, TableRowProps>(function TableRow(
  { children, id, style, ...props },
  ref
) {
  const {
    rowStyle,
    rowSelectedStyle,
    selectionMode,
    selectedKeys,
    disabledKeys,
    registerRow,
    toggleRow,
    isDisabled,
  } = useTable()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const isStill = useAnimationDisabled()
  const isReduced = useReducedMotion()
  const [isPressed, press] = usePressState({})

  useEffect(() => {
    if (id === undefined) return

    return registerRow(id)
  }, [id, registerRow])

  const isSelected = id !== undefined && selectedKeys.includes(id)
  const isRowDisabled = isDisabled || (id !== undefined && disabledKeys.includes(id))
  const canPress = selectionMode !== 'none' && id !== undefined && !isRowDisabled

  const context = useMemo(
    () => ({ id, isSelected, isDisabled: isRowDisabled }),
    [id, isSelected, isRowDisabled]
  )

  const box = [isSelected ? rowSelectedStyle : rowStyle, styleProps, style]

  const cells = Children.map(children, (child, index) => (
    <TableColumnIndexProvider value={index}>{child}</TableColumnIndexProvider>
  ))

  if (!canPress) {
    return (
      <TableRowProvider value={context}>
        <View ref={ref} {...rest} style={box}>
          {cells}
        </View>
      </TableRowProvider>
    )
  }

  const isFlat = isStill || isReduced
  const Row = isFlat ? PressableFeedback : PressTilt
  // A row is wide: it leans by the wide angle and shrinks as a row does.
  const lean = isFlat ? undefined : { depth: scale.row, hasInteractiveContent: true }

  return (
    <TableRowProvider value={context}>
      <Row
        ref={ref}
        isPressed={isPressed}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: isRowDisabled }}
        {...lean}
        {...rest}
        style={box}
        onPress={() => {
          haptic('selection')
          toggleRow(id)
        }}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {cells}
      </Row>
    </TableRowProvider>
  )
})

TableRow.displayName = 'XAUI.Tram.Table.Row'
