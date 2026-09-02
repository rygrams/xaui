import React from 'react'
import { View } from 'react-native'
import type { MarginProps } from './margin.type'
import { resolveEdgeInsets } from '../container/container.utils'

export const Margin: React.FC<MarginProps> = ({ children, margin, style }) => (
  <View style={[resolveEdgeInsets(margin, 'margin'), style]}>{children}</View>
)

Margin.displayName = 'Margin'
