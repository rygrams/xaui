import React, { useMemo, useRef, useState } from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'
import type { MasonryGridProps } from './masonry-grid.type'

type MasonryItem = {
  key: string
  element: React.ReactNode
}

const getSafeColumns = (columns?: number) => {
  if (!columns || columns <= 0) return 1
  return Math.floor(columns)
}

const getItemKey = (child: React.ReactNode, index: number) => {
  return React.isValidElement(child) && child.key
    ? String(child.key)
    : `masonry-${index}`
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 2,
  spacing,
  rowSpacing,
  columnSpacing,
  style,
  columnStyle,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>()
  const heightMapRef = useRef<Record<string, number>>({})
  const [layoutVersion, setLayoutVersion] = useState(0)

  const safeColumns = getSafeColumns(columns)
  const resolvedRowSpacing = rowSpacing ?? spacing ?? 0
  const resolvedColumnSpacing = columnSpacing ?? spacing ?? 0
  const totalColumnGap = resolvedColumnSpacing * (safeColumns - 1)

  const columnWidth = useMemo(() => {
    if (!containerWidth) return undefined
    return (containerWidth - totalColumnGap) / safeColumns
  }, [containerWidth, safeColumns, totalColumnGap])

  const items = useMemo<MasonryItem[]>(
    () =>
      React.Children.toArray(children).map((child, index) => ({
        key: getItemKey(child, index),
        element: child,
      })),
    [children]
  )

  const columnsItems = useMemo(() => {
    const buckets: MasonryItem[][] = Array.from({ length: safeColumns }, () => [])
    const heights = new Array(safeColumns).fill(0)

    items.forEach(item => {
      const height = heightMapRef.current[item.key]
      const targetIndex = heights.indexOf(Math.min(...heights))
      buckets[targetIndex].push(item)
      heights[targetIndex] += (height ?? 0) + resolvedRowSpacing
    })

    return buckets
  }, [items, layoutVersion, resolvedRowSpacing, safeColumns])

  return (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
      onLayout={event => {
        const nextWidth = event.nativeEvent.layout.width
        if (!nextWidth || nextWidth === containerWidth) return
        setContainerWidth(nextWidth)
      }}
    >
      {columnsItems.map((column, columnIndex) => {
        const isLastColumn = columnIndex === columnsItems.length - 1
        const columnStyles: StyleProp<ViewStyle> = [
          {
            width: columnWidth,
            marginRight: isLastColumn ? 0 : resolvedColumnSpacing,
          },
          columnStyle,
        ]

        return (
          <View key={`masonry-col-${columnIndex}`} style={columnStyles}>
            {column.map((item, index) => {
              const isLastRow = index === column.length - 1

              return (
                <View
                  key={item.key}
                  style={{ marginBottom: isLastRow ? 0 : resolvedRowSpacing }}
                  onLayout={event => {
                    const nextHeight = event.nativeEvent.layout.height
                    if (heightMapRef.current[item.key] === nextHeight) return
                    heightMapRef.current[item.key] = nextHeight
                    setLayoutVersion(value => value + 1)
                  }}
                >
                  {item.element}
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}
