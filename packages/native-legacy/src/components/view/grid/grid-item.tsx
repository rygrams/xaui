import React from 'react'
import { View } from 'react-native'
import type { GridItemProps } from './grid-item.type'

export const GridItem: React.FC<GridItemProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>
}

GridItem.displayName = 'GridItem'
