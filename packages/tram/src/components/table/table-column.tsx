import { forwardRef, useEffect } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  ChevronDownIcon,
  childrenToString,
  Icon,
  IconContext,
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useTable, useTableColumnIndex } from './table.context'
import { tableSheet } from './table.style'
import type { TableColumnProps } from './table.type'

/**
 * One column's name, and the press that sorts on it.
 *
 * **It declares the width and the cells below read it**, by position. A text child is set
 * in the grey `caption` (R3); the column the data is sorted on is written in the ink, a
 * small chevron after it — up ascending, down descending. Anything else is rendered as it
 * is. A press shrinks it a little, its colours unchanged, and reaches 48 points tall.
 *
 * `allowsSorting` needs an `id`: the descriptor names a column, and a column with no name
 * cannot be in one.
 */
export const TableColumn = forwardRef<View, TableColumnProps>(function TableColumn(
  { children, id, width, allowsSorting = false, hitSlop, style, ...props },
  ref
) {
  const {
    columnStyle,
    columnLabelStyle,
    columnLabelSortedStyle,
    sortIndicatorStyle,
    sortGlyph,
    headerReach,
    setWidth,
    sortDescriptor,
    sortBy,
    isDisabled,
  } = useTable()
  const index = useTableColumnIndex()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({})
  const motion = resolveAnimation(undefined, useAnimationDisabled())

  useEffect(() => {
    setWidth(index, width)
  }, [index, setWidth, width])

  const isSorted = allowsSorting && id !== undefined && sortDescriptor?.column === id
  const canSort = allowsSorting && id !== undefined && !isDisabled

  const box = [
    columnStyle,
    // A width, or an equal share of what is left — the same rule a cell runs, against
    // the same registered number.
    width === undefined ? tableSheet.flexible : { width },
    styleProps,
    style,
  ]

  // Mixed text (`{count} lignes`) arrives as an array: read as one string, or it reaches
  // the View bare, which React Native refuses outside a Text.
  const text = childrenToString(children)
  const label =
    text !== null ? (
      <Text
        style={isSorted ? columnLabelSortedStyle : columnLabelStyle}
        numberOfLines={1}
      >
        {text}
      </Text>
    ) : (
      children
    )

  const mark = isSorted ? (
    <View
      style={[
        sortIndicatorStyle,
        sortDescriptor?.direction === 'ascending' ? tableSheet.ascending : null,
      ]}
    >
      <IconContext.Provider value={sortGlyph}>
        <Icon as={ChevronDownIcon} />
      </IconContext.Provider>
    </View>
  ) : null

  if (!canSort) {
    return (
      <View ref={ref} hitSlop={hitSlop} {...rest} style={box}>
        {label}
        {mark}
      </View>
    )
  }

  // Native's scale, highlight and ripple stay off: the press is the row's shrink. An
  // ancestor's `disable-all` stops it.
  const Press = motion.scale ? PressRow : PressableFeedback

  return (
    <Press
      ref={ref}
      isPressed={isPressed}
      animation={motion.disableAll ? 'disable-all' : false}
      accessibilityRole="button"
      accessibilityState={{ selected: isSorted, disabled: isDisabled }}
      // The header is drawn under 48; the press reaches above and below it.
      hitSlop={hitSlop ?? { top: headerReach, bottom: headerReach }}
      {...rest}
      style={box}
      onPress={() => sortBy(id)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {label}
      {mark}
    </Press>
  )
})

TableColumn.displayName = 'XAUI.Tram.Table.Column'
