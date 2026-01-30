import React, { useMemo } from 'react'
import {
  FlatList,
  View,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import type { GridBuilderProps } from './grid-builder.type'

const getSafeColumns = (columns?: number) => {
  if (!columns || columns <= 0) return 1
  return Math.floor(columns)
}

const resolveGridData = <T,>(
  data: readonly T[] | undefined,
  itemCount: number | undefined
) => {
  if (data) return data
  if (!itemCount || itemCount <= 0) return []
  return Array.from({ length: itemCount }, (_, index) => index as T)
}

export const GridBuilder = <T,>({
  data,
  itemCount,
  renderItem,
  itemBuilder,
  keyExtractor,
  columns = 2,
  spacing,
  rowSpacing,
  columnSpacing,
  style,
  itemStyle,
  listProps,
  scrollEnabled,
}: GridBuilderProps<T>) => {
  const safeColumns = getSafeColumns(columns)
  const resolvedRowSpacing = rowSpacing ?? spacing ?? 0
  const resolvedColumnSpacing = columnSpacing ?? spacing ?? 0
  const resolvedData = useMemo(
    () => resolveGridData(data, itemCount),
    [data, itemCount]
  )

  const resolvedKeyExtractor = useMemo(() => {
    if (keyExtractor) return keyExtractor
    return (_: T, index: number) => `grid-${index}`
  }, [keyExtractor])

  const resolvedRenderer = useMemo(() => {
    if (renderItem) return renderItem
    if (itemBuilder)
      return ({ item, index }: { item: T; index: number }) =>
        itemBuilder({ item, index })
    return undefined
  }, [renderItem, itemBuilder])

  if (!resolvedRenderer) return null

  const renderGridItem = ({ item, index }: ListRenderItemInfo<T>) => {
    const element = resolvedRenderer({ item, index })
    if (element === null) return null

    const isLastColumn = (index + 1) % safeColumns === 0
    const totalItems = resolvedData.length
    const lastRowStart =
      totalItems === 0
        ? 0
        : totalItems - (totalItems % safeColumns || safeColumns)
    const isLastRow = index >= lastRowStart

    const wrapperStyle: StyleProp<ViewStyle> = [
      {
        flex: 1,
        marginRight: isLastColumn ? 0 : resolvedColumnSpacing,
        marginBottom: isLastRow ? 0 : resolvedRowSpacing,
      },
      itemStyle,
    ]

    return <View style={wrapperStyle}>{element}</View>
  }

  return (
    <FlatList
      data={resolvedData}
      renderItem={renderGridItem}
      keyExtractor={resolvedKeyExtractor}
      numColumns={safeColumns}
      scrollEnabled={scrollEnabled ?? listProps?.scrollEnabled}
      {...listProps}
      style={[style, listProps?.style]}
    />
  )
}

GridBuilder.displayName = 'GridBuilder'
