import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { DividerProps } from './divider-types'

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  length = '100%',
  indent = 0,
  endIndent = 0,
  themeColor = 'default',
  color,
  style,
}) => {
  const theme = useXUITheme()
  const resolvedColor = color ?? theme.colors[themeColor].main
  const isHorizontal = orientation === 'horizontal'

  const dividerStyle = useMemo(() => {
    if (isHorizontal) {
      return {
        height: thickness,
        width: length,
        marginLeft: indent,
        marginRight: endIndent,
        backgroundColor: resolvedColor,
      }
    }

    return {
      width: thickness,
      height: length,
      marginTop: indent,
      marginBottom: endIndent,
      backgroundColor: resolvedColor,
    }
  }, [isHorizontal, thickness, length, indent, endIndent, resolvedColor])

  return <View style={[dividerStyle, style]} />
}
