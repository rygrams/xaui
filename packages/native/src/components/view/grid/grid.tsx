import React from 'react'
import { View, type DimensionValue } from 'react-native'
import type { GridProps } from './grid.type'

const getSafeColumns = (columns?: number) => {
  if (!columns || columns <= 0) return 1
  return Math.floor(columns)
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
  const safeColumns = getSafeColumns(columns)
  const resolvedRowSpacing = rowSpacing ?? spacing ?? 0
  const resolvedColumnSpacing = columnSpacing ?? spacing ?? 0
  const itemWidth: DimensionValue = `${100 / safeColumns}%`

  const items = React.Children.toArray(children)

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: resolvedRowSpacing,
          columnGap: resolvedColumnSpacing,
        },
        style,
      ]}
    >
      {items.map((child, index) => {
        const key = React.isValidElement(child) && child.key ? child.key : `grid-${index}`

        return (
          <View
            key={key}
            style={[
              {
                flexBasis: itemWidth,
                maxWidth: itemWidth,
                flexGrow: 0,
                flexShrink: 0,
              },
              itemStyle,
            ]}
          >
            {child}
          </View>
        )
      })}
    </View>
  )
}
