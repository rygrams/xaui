import React from 'react'
import { Text } from 'react-native'
import { TextSpanContext } from './text-span.context'
import type { TextSpanAlign, TextSpanProps } from './text-span.type'
import type { TextStyle } from 'react-native'

const alignToTextAlign: Record<TextSpanAlign, TextStyle['textAlign']> = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
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
    spacing,
  }

  return (
    <TextSpanContext.Provider value={inheritedTextStyle}>
      <Text
        style={[
          {
            ...(align ? { textAlign: alignToTextAlign[align] } : {}),
            ...(backgroundColor ? { backgroundColor } : {}),
          },
          style,
        ]}
      >
        {children}
      </Text>
    </TextSpanContext.Provider>
  )
}

TextSpan.displayName = 'TextSpan'
