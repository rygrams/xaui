import React from 'react'
import { View } from 'react-native'
import type { AspectRatioProps } from './aspect-ratio.type'

export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  ratio,
  style,
}) => {
  return <View style={[{ aspectRatio: ratio }, style]}>{children}</View>
}
