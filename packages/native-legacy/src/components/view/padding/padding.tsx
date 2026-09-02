import React from 'react'
import { View } from 'react-native'
import type { PaddingProps } from './padding.type'
import { resolveEdgeInsets } from '../container/container.utils'

export const Padding: React.FC<PaddingProps> = ({ children, padding, style }) => (
  <View style={[resolveEdgeInsets(padding, 'padding'), style]}>{children}</View>
)

Padding.displayName = 'Padding'
