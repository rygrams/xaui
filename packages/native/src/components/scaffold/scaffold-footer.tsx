import React from 'react'
import { View } from 'react-native'
import { styles } from './scaffold.style'
import type { ScaffoldFooterProps } from './scaffold.type'

export const ScaffoldFooter: React.FC<ScaffoldFooterProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
)
