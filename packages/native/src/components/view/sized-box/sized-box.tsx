import React from 'react'
import { View } from 'react-native'
import type { SizedBoxProps } from './sized-box.type'

export const SizedBox: React.FC<SizedBoxProps> = ({ children, width, height, expand, shrink }) => {
  if (shrink) {
    return <View style={{ width: 0, height: 0 }}>{children}</View>
  }

  if (expand) {
    return <View style={{ flex: 1, alignSelf: 'stretch' }}>{children}</View>
  }

  return <View style={{ width, height }}>{children}</View>
}

SizedBox.displayName = 'SizedBox'
