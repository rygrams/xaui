import React, { useMemo, useState } from 'react'
import {
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import type { GridProps } from './grid.type'
import { GridItem } from './grid-item'
import type { GridItemProps } from './grid-item.type'

const getSafeColumns = (columns?: number) => {
  if (!columns || columns <= 0) return 1
  return Math.floor(columns)
}

const getSafeSpan = (span: number | undefined, columns: number) => {
  if (!span || span <= 0) return 1
  return Math.min(Math.floor(span), columns)
}

const isGridItemElement = (
  child: React.ReactNode
): child is React.ReactElement<GridItemProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type === GridItem) return true

  const displayName = (child.type as { displayName?: string }).displayName
  return displayName === 'GridItem'
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  spacing,
  rowSpacing,
  columnSpacing,
  style,
  itemStyle,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>()
  const safeColumns = getSafeColumns(columns)
  const resolvedRowSpacing = rowSpacing ?? spacing ?? 0
  const resolvedColumnSpacing = columnSpacing ?? spacing ?? 0
  const itemWidth: DimensionValue = `${100 / safeColumns}%`

  const items = React.Children.toArray(children)
  const totalColumnGap = resolvedColumnSpacing * (safeColumns - 1)
  const baseItemWidth = useMemo(() => {
    if (!containerWidth) return undefined
    return (containerWidth - totalColumnGap) / safeColumns
  }, [containerWidth, safeColumns, totalColumnGap])
  let currentColumn = 0

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: resolvedRowSpacing,
        },
        style,
      ]}
      onLayout={event => {
        const nextWidth = event.nativeEvent.layout.width
        if (!nextWidth || nextWidth === containerWidth) return
        setContainerWidth(nextWidth)
      }}
    >
      {items.map((child, index) => {
        const key =
          React.isValidElement(child) && child.key ? child.key : `grid-${index}`

        const span = isGridItemElement(child)
          ? getSafeSpan(child.props.span, safeColumns)
          : 1
        const spanWidth: DimensionValue =
          baseItemWidth === undefined
            ? `${(100 / safeColumns) * span}%`
            : baseItemWidth * span + resolvedColumnSpacing * (span - 1)
        if (currentColumn + span > safeColumns) {
          currentColumn = 0
        }
        const isEndOfRow = currentColumn + span >= safeColumns
        const marginRight = isEndOfRow ? 0 : resolvedColumnSpacing

        if (isGridItemElement(child)) {
          const mergedStyle: StyleProp<ViewStyle> = [
            {
              flexBasis: spanWidth,
              maxWidth: spanWidth,
              flexGrow: 0,
              flexShrink: 0,
              marginRight,
            },
            itemStyle,
            child.props.style,
          ]

          const element = React.cloneElement(child, {
            key,
            style: mergedStyle,
          })
          currentColumn = isEndOfRow ? 0 : currentColumn + span
          return element
        }

        const defaultItemWidth: DimensionValue =
          baseItemWidth === undefined ? itemWidth : baseItemWidth
        const element = (
          <View
            key={key}
            style={[
              {
                flexBasis: defaultItemWidth,
                maxWidth: defaultItemWidth,
                flexGrow: 0,
                flexShrink: 0,
                marginRight,
              },
              itemStyle,
            ]}
          >
            {child}
          </View>
        )
        currentColumn = isEndOfRow ? 0 : currentColumn + span
        return element
      })}
    </View>
  )
}
