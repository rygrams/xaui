import React from 'react'
import { View } from 'react-native'
import type { SizedBoxProps } from './sized-box.type'

export const SizedBox: React.FC<SizedBoxProps> = ({
  children,
  width,
  height,
  expand,
  shrink,
  style,
  testID,
}) => {
  if (shrink) {
    return (
      <View
        testID={testID}
        style={[{ width: 0, height: 0, overflow: 'hidden' }, style]}
      >
        {children}
      </View>
    )
  }

  if (expand) {
    return (
      <View testID={testID} style={[{ flex: 1, alignSelf: 'stretch' }, style]}>
        {children}
      </View>
    )
  }

  return (
    <View testID={testID} style={[{ width, height }, style]}>
      {children}
    </View>
  )
}

SizedBox.displayName = 'SizedBox'
