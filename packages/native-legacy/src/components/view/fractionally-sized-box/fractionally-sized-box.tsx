import React from 'react'
import { type ViewStyle, View } from 'react-native'
import type { FractionallySizedBoxProps } from './fractionally-sized-box.type'
import { resolveAlignment } from '../container/container.utils'

export const FractionallySizedBox: React.FC<FractionallySizedBoxProps> = ({
  children,
  widthFactor,
  heightFactor,
  alignment,
  style,
  testID,
}) => {
  const sizedStyle: ViewStyle = {}
  if (widthFactor !== undefined) sizedStyle.width = `${widthFactor * 100}%`
  if (heightFactor !== undefined) sizedStyle.height = `${heightFactor * 100}%`

  const alignStyle = alignment ? resolveAlignment(alignment) : {}

  return (
    <View testID={testID} style={[sizedStyle, alignStyle, style]}>
      {children}
    </View>
  )
}

FractionallySizedBox.displayName = 'FractionallySizedBox'
