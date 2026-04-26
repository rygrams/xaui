import React from 'react'
import { View } from 'react-native'
import type { AlignProps } from './align.type'
import { resolveAlignment } from '../container/container.utils'

export const Align: React.FC<AlignProps> = ({ children, alignment, style }) => (
  <View style={[{ flex: 1 }, resolveAlignment(alignment), style]}>{children}</View>
)

Align.displayName = 'Align'
