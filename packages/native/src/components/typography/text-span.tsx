import React from 'react'
import { View } from 'react-native'
import { TextSpanContext } from './text-span.context'
import type { TextSpanAlign, TextSpanProps } from './text-span.type'

const alignToJustifyContent: Record<
  TextSpanAlign,
  'center' | 'flex-end' | 'flex-start' | 'space-between'
> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  justify: 'space-between',
}

export const TextSpan: React.FC<TextSpanProps> = ({
  children,
  color,
  fontWeight,
  fontStyle,
  textTransform,
  spacing,
  align,
  backgroundColor,
  style,
}: TextSpanProps) => {
  const inheritedTextStyle = {
    color,
    fontWeight,
    fontStyle,
    textTransform,
    align,
  }

  return (
    <TextSpanContext.Provider value={inheritedTextStyle}>
      <View
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            ...(align ? { justifyContent: alignToJustifyContent[align] } : {}),
            ...(typeof spacing === 'number' ? { gap: spacing } : {}),
            ...(backgroundColor ? { backgroundColor } : {}),
          },
          style,
        ]}
      >
        {children}
      </View>
    </TextSpanContext.Provider>
  )
}

TextSpan.displayName = 'TextSpan'
