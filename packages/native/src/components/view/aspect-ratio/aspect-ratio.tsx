import React from 'react'
import { View } from 'react-native'
import type { AspectRatioProps } from './aspect-ratio.type'
import { resolveAlignment } from '../container/container.utils'

export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  ratio,
  alignment,
  clip,
  style,
  testID,
}) => {
  const alignStyle = alignment ? resolveAlignment(alignment) : {}

  return (
    <View
      testID={testID}
      style={[
        {
          aspectRatio: ratio,
          overflow: clip ? 'hidden' : 'visible',
        },
        alignStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}

AspectRatio.displayName = 'AspectRatio'
