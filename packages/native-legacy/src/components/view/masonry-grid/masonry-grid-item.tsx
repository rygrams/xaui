import React from 'react'
import { View } from 'react-native'
import type { MasonryGridItemProps } from './masonry-grid-item.type'

export const MasonryGridItem: React.FC<MasonryGridItemProps> = ({
  children,
  style,
}) => {
  return <View style={style}>{children}</View>
}

MasonryGridItem.displayName = 'MasonryGridItem'
